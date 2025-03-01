'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          // Refresh the session if it exists
          await supabase.auth.refreshSession();
          router.push('/chatbot');
          router.refresh();
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (data?.session) {
        router.push('/chatbot');
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/chatbot`,
        }
      });

      if (signUpError) throw signUpError;
      alert('Check your email for the confirmation link!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#faf6f1] flex items-center justify-center">
      <div className="text-[#2d5438]">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#faf6f1] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <Image
              src="/ayurveda-logo.png"
              alt="Ayurveda Insights"
              width={80}
              height={80}
              className="rounded-full border-2 border-[#2d5438]"
            />
          </div>
          <h2 className="text-3xl font-bold text-[#2d5438]">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to continue to Ayurveda AI</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2d5438] focus:border-[#2d5438]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2d5438] focus:border-[#2d5438]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2d5438] hover:bg-[#1a3222] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d5438] disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Sign in'}
            </button>

            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-[#2d5438] rounded-md shadow-sm text-sm font-medium text-[#2d5438] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d5438] disabled:opacity-50"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 