'use client';

import { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const defaultCenter = {
  lat: 20.5937, // Default to center of India
  lng: 78.9629
};

export default function HospitalFinder() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hospitals, setHospitals] = useState<google.maps.places.PlaceResult[]>([]);
  const [userLocation, setUserLocation] = useState(defaultCenter);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const searchNearbyHospitals = useCallback(() => {
    if (!map) return;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: userLocation,
      radius: 5000, // 5km radius
      type: 'hospital'
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setHospitals(results);
      }
    });
  }, [map, userLocation]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          map?.panTo(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4">Find Nearby Hospitals</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={getUserLocation}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Use My Location
          </button>
          <button
            onClick={searchNearbyHospitals}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Search Nearby Hospitals
          </button>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* User location marker */}
        <Marker
          position={userLocation}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />

        {/* Hospital markers */}
        {hospitals.map((hospital, index) => (
          hospital.geometry?.location && (
            <Marker
              key={index}
              position={{
                lat: hospital.geometry.location.lat(),
                lng: hospital.geometry.location.lng()
              }}
              title={hospital.name}
            />
          )
        ))}
      </GoogleMap>
    </div>
  );
} 