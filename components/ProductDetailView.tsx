import React from 'react';
import { Phone } from '../types';
import { ChevronRight, Star, Share2, Heart, Scale } from 'lucide-react';

interface ProductDetailViewProps {
  phone: Phone;
  onCompare: (phone: Phone) => void;
  onBack: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ phone, onCompare, onBack }) => {
  const sections = Object.keys(phone.specs).filter(k => k !== 'summary');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 flex items-center gap-2 mb-6 cursor-pointer" onClick={onBack}>
        <span>Home</span> <ChevronRight size={12} /> <span>Mobiles</span> <ChevronRight size={12} /> <span className="text-gray-800 font-bold">{phone.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Image & Actions */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center sticky top-24">
            <div className="flex justify-end gap-3 mb-4 text-gray-400">
              <Share2 size={20} className="cursor-pointer hover:text-[#f26522]" />
              <Heart size={20} className="cursor-pointer hover:text-red-500" />
            </div>
            
            <img src={phone.image} alt={phone.name} className="w-full h-auto max-h-[400px] object-contain mx-auto mb-6" />
            
            <div className="flex gap-2 justify-center mb-6">
               <button 
                 onClick={() => onCompare(phone)}
                 className="flex-1 flex items-center justify-center gap-2 border border-blue-500 text-blue-500 py-2 rounded font-bold hover:bg-blue-50"
               >
                 <Scale size={18} /> Compare
               </button>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-gray-500 text-sm mb-2">Available at</p>
              <button 
                onClick={() => window.open(phone.amazonUrl || `https://www.amazon.in/s?k=${encodeURIComponent(phone.name)}`, '_blank')}
                className="w-full bg-[#ff9900] hover:bg-[#e68a00] text-white py-2 rounded font-bold shadow-sm"
              >
                Go to Store
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Specs & Info */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
             <h1 className="text-2xl font-bold text-gray-800 mb-2">{phone.name}</h1>
             
             <div className="flex items-center gap-4 mb-4">
               <div className="flex items-center gap-1">
                 <span className="text-[#f26522] font-bold text-xl">{phone.rating}%</span>
                 <span className="text-xs text-gray-500">Spec Score</span>
               </div>
               <div className="h-8 w-[1px] bg-gray-300"></div>
               <div>
                 <span className="text-2xl font-bold">₹{phone.price.toLocaleString()}</span>
                 <span className="text-xs text-gray-500 block">Market Price</span>
               </div>
             </div>

             <div className="bg-gray-50 p-4 rounded-md">
               <h3 className="font-bold text-sm mb-3 text-gray-700">KEY SPECS</h3>
               <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  {Object.values(phone.specs.summary.specs).map((spec, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-200 pb-1">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-medium text-right text-gray-800">{spec.value}</span>
                    </div>
                  ))}
               </div>
             </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Full Specifications</h2>
            
            {sections.map(key => {
              const section = phone.specs[key];
              return (
                <div key={key} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 font-bold text-gray-700 uppercase text-sm">
                    {section.title}
                  </div>
                  <div className="p-4 space-y-3">
                    {Object.values(section.specs).map((spec, idx) => (
                      <div key={idx} className="grid grid-cols-3 text-sm border-b border-gray-100 last:border-0 pb-2">
                        <div className="col-span-1 text-gray-500 font-medium">{spec.label}</div>
                        <div className="col-span-2 text-gray-800">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
