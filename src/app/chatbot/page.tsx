'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const suggestedQuestions = [
  {
    text: "Any Ayurvedic solutions to keep my blood sugar...",
    href: "#"
  },
  {
    text: "Do you have any recommendations for anxiety relief?",
    href: "#"
  },
  {
    text: "What are some Ayurvedic remedies for colds?",
    href: "#"
  },
  {
    text: "Explain the concept of Doshas in Ayurveda.",
    href: "#"
  }
];

interface ChatMessage {
  id: number;
  message: string;
  response: string;
  user_id: string;
  created_at?: string;
}

export default function AyurvedaPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const initializeData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        router.push('/signin');
        return;
      }

      // Refresh the session
      await supabase.auth.refreshSession();
      setUser(session.user);
      await fetchChatHistory(session.user.id);
      setLoading(false);
    };

    initializeData();
  }, []);

  const fetchChatHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chatbot')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChatHistory(data || []);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleQuestionClick = (questionText: string) => {
    setMessage(questionText);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;

    try {
      // Here you would typically make an API call to get the AI response
      const aiResponse = "This is a placeholder AI response. Replace with actual AI integration.";

      const { data, error } = await supabase
        .from('chatbot')
        .insert([
          {
            message: message.trim(),
            response: aiResponse,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setChatHistory(prev => [data, ...prev]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#faf6f1]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-[#2d5438] rounded-full"></div>
            <span className="text-lg font-semibold text-[#2d5438]">Ayurveda AI</span>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#faf6f1] text-[#2d5438] transition-colors">
              Explore Insights
            </button>
            
            <div className="pt-4">
              <div className="text-sm text-gray-500 mb-2">Recent Chats</div>
              <div className="space-y-2">
                {chatHistory.slice(0, 5).map((chat) => (
                  <button 
                    key={chat.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#faf6f1] text-sm text-[#2d5438] transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {chat.message}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-[#2d5438]">Ayurveda Intelligence</h1>
            </div>
            <button 
              onClick={handleSignOut}
              className="text-sm text-[#2d5438] hover:underline"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto pb-24">
          <div className="max-w-3xl mx-auto py-8 px-4">
            {chatHistory.length === 0 ? (
              <>
                {/* Profile Section */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <Image
                      src="/ayurveda-logo.png"
                      alt="Ayurveda Insights"
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-[#2d5438]"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-[#2d5438]">Ayurveda Intelligence</h2>
                  <p className="text-gray-600 mb-2">Your Personal Ayurvedic Guide</p>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    Get personalized Ayurvedic wellness advice, product recommendations, and insights tailored to your unique constitution and needs.
                  </p>
                </div>

                {/* Suggested Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question.text)}
                      className="p-4 rounded-xl border border-[#2d5438]/20 hover:border-[#2d5438] transition-colors text-left bg-white hover:shadow-lg"
                    >
                      <p className="text-gray-700">{question.text}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#2d5438]/10 flex items-center justify-center">
                        U
                      </div>
                      <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                        {chat.message}
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#2d5438] flex items-center justify-center text-white">
                        AI
                      </div>
                      <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                        {chat.response}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Message Input */}
        <div className="fixed bottom-0 left-64 right-0 bg-[#faf6f1] p-4 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white rounded-xl border border-[#2d5438]/20 shadow-lg">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about Ayurvedic wellness..."
                className="w-full p-4 pr-20 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5438]/20 text-gray-700"
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#2d5438] text-white rounded-full hover:bg-[#1a3222] transition-colors text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}