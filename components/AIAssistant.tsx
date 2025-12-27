import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { getGeminiAdvice } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    const result = await getGeminiAdvice(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#f26522] text-white p-4 rounded-full shadow-lg hover:bg-[#d65215] transition-transform hover:scale-110 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="font-bold hidden md:inline">Ask AI Helper</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 md:w-96 border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-[#212121] text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
               <span className="bg-[#f26522] p-1 rounded text-xs">AI</span> Smart Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            <div className="bg-white p-3 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-sm border text-sm text-gray-700 self-start max-w-[90%]">
              Hi! I'm your 91mobiles AI assistant. Ask me anything about phone specs or comparisons!
            </div>
            
            {response && (
               <div className="bg-[#e8f5e9] p-3 rounded-lg shadow-sm border border-green-100 text-sm text-gray-800 self-start">
                 {response}
               </div>
            )}
            
            {loading && (
              <div className="self-center text-gray-400 text-xs animate-pulse">Thinking...</div>
            )}
          </div>

          <div className="p-3 border-t bg-white flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Is OnePlus 15R better than Nord?"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#f26522]"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
              onClick={handleAsk}
              disabled={loading}
              className="bg-[#f26522] text-white p-2 rounded hover:bg-[#d65215] disabled:bg-gray-300"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
