import React, { useState, useEffect } from 'react';
import { MOCK_PHONES } from '../constants';
import { ChevronDown, ChevronUp, Plus, X, Search } from 'lucide-react';
import { Phone, SpecSection } from '../types';
import { fetchPhoneDetails } from '../services/geminiService';

interface CompareViewProps {
  initialPhones?: Phone[];
}

const CompareView: React.FC<CompareViewProps> = ({ initialPhones }) => {
  const [phones, setPhones] = useState<Phone[]>(initialPhones || MOCK_PHONES.slice(0, 3));
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialPhones && initialPhones.length > 0) {
      setPhones(initialPhones);
    }
  }, [initialPhones]);

  const toggleSection = (section: string) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const removePhone = (id: string) => {
    if (phones.length > 1) {
      setPhones(phones.filter(p => p.id !== id));
    }
  };

  const handleAddPhone = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    const existing = MOCK_PHONES.find(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (existing && !phones.find(p => p.id === existing.id)) {
      setPhones([...phones, existing]);
      setShowAddModal(false);
      setSearchQuery('');
    } else {
      const newPhone = await fetchPhoneDetails(searchQuery);
      if (newPhone) {
        setPhones([...phones, newPhone]);
        setShowAddModal(false);
        setSearchQuery('');
      } else {
        alert("Could not find mobile details. Try a different name.");
      }
    }
    setIsLoading(false);
  };

  // Define the order of sections for the table
  const sectionKeys = [
    'summary', 'general', 'performance', 'display', 'design', 
    'camera', 'battery', 'storage', 'network'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Compare Mobiles</h1>
        {phones.length < 4 && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#f26522] text-white px-4 py-2 rounded-md font-bold hover:bg-[#d65215]"
          >
            <Plus size={18} /> Add Mobile
          </button>
        )}
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        
        {/* Sticky Header for Phones */}
        <div className={`grid grid-cols-${phones.length + 1} sticky top-[108px] bg-white z-40 border-b border-gray-200 shadow-sm`}>
          <div className="p-4 flex items-center font-bold text-gray-400 text-sm bg-gray-50 min-w-[150px]">
            Compare Prices
          </div>
          {phones.map(phone => (
            <div key={phone.id} className="p-4 flex flex-col items-center border-l border-gray-100 relative group min-w-[180px]">
              <button 
                onClick={() => removePhone(phone.id)}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 hidden group-hover:block"
              >
                <X size={16} />
              </button>
              <img src={phone.image} className="h-32 object-contain mb-2" alt={phone.name} />
              <h3 className="font-bold text-sm text-center mb-1 h-10 flex items-center justify-center line-clamp-2">{phone.name}</h3>
              <p className="font-bold text-lg text-[#f26522]">₹{phone.price.toLocaleString()}</p>
              <a 
                href={phone.amazonUrl || `https://www.amazon.in/s?k=${encodeURIComponent(phone.name)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 bg-[#ff9900] text-white text-xs px-4 py-1.5 font-bold rounded hover:bg-[#e68a00]"
              >
                Go to Store
              </a>
            </div>
          ))}
        </div>

        {/* Specs Table */}
        <div className="divide-y divide-gray-200 overflow-x-auto">
          {sectionKeys.map(key => {
            // Get the section details from the first phone to determine structure
            // If the first phone is missing the section, try others
            const referencePhone = phones.find(p => p.specs[key]);
            if (!referencePhone) return null;

            const sectionData = referencePhone.specs[key];
            const isCollapsed = collapsed[key];
            const specKeys = Object.keys(sectionData.specs);

            return (
              <div key={key} className="border-t-4 border-gray-100">
                <div 
                  className="bg-gray-100 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200"
                  onClick={() => toggleSection(key)}
                >
                  <h3 className="font-bold text-gray-800 uppercase text-sm">{sectionData.title}</h3>
                  {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                </div>

                {!isCollapsed && (
                  <div className="divide-y divide-gray-100">
                    {specKeys.map(specKey => (
                      <div key={specKey} className={`grid grid-cols-${phones.length + 1} group hover:bg-gray-50`}>
                        <div className="p-3 text-sm font-medium text-gray-600 bg-gray-50/50 flex items-center border-r border-gray-100 min-w-[150px]">
                          {sectionData.specs[specKey].label}
                        </div>
                        {phones.map(phone => {
                          const val = phone.specs[key]?.specs[specKey]?.value;
                          return (
                            <div key={phone.id} className="p-3 text-sm text-center text-gray-700 flex flex-col justify-center border-l border-gray-100 min-w-[180px]">
                              <span>{val || '-'}</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Mobile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add Mobile to Compare</h2>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder="Type mobile name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddPhone()}
              />
              <button 
                onClick={handleAddPhone}
                disabled={isLoading}
                className="bg-[#f26522] text-white px-4 py-2 rounded font-bold disabled:bg-gray-300"
              >
                {isLoading ? '...' : <Search size={20} />}
              </button>
            </div>
            <button 
              onClick={() => setShowAddModal(false)}
              className="text-sm text-gray-500 hover:text-gray-800 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareView;
