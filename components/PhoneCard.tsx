import React from 'react';
import { Phone as PhoneType } from '../types';
import { Plus, Check } from 'lucide-react';

interface PhoneCardProps {
  phone: PhoneType;
  onViewDetails?: (phone: PhoneType) => void;
  isSelectedForCompare?: boolean;
  onToggleCompare?: (phone: PhoneType) => void;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone, onViewDetails, isSelectedForCompare, onToggleCompare }) => {
  
  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phone.amazonUrl) {
      window.open(phone.amazonUrl, '_blank');
    } else {
       window.open(`https://www.amazon.in/s?k=${encodeURIComponent(phone.name)}`, '_blank');
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(phone);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare(phone);
    }
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border flex flex-col items-center text-center group cursor-pointer relative h-full ${isSelectedForCompare ? 'border-[#f26522] ring-1 ring-[#f26522]' : 'border-gray-100'}`}
      onClick={handleDetailsClick}
    >
      <div className="absolute top-2 left-2 bg-[#84c225] text-white text-[10px] font-bold px-1 py-0.5 rounded z-10">
        {phone.rating}% Spec Score
      </div>

      {/* Compare Checkbox */}
      <div 
        className="absolute top-2 right-2 z-10 flex flex-col items-center"
        onClick={handleCompareClick}
      >
         <div className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center transition-colors ${isSelectedForCompare ? 'bg-[#f26522] border-[#f26522]' : 'bg-white hover:border-[#f26522]'}`}>
            {isSelectedForCompare ? <Check size={14} className="text-white" /> : <Plus size={14} className="text-gray-400" />}
         </div>
         <span className="text-[10px] text-gray-500 font-medium mt-0.5">Compare</span>
      </div>
      
      <div className="w-full h-40 mb-4 flex items-center justify-center overflow-hidden">
        <img src={phone.image} alt={phone.name} className="h-full object-contain group-hover:scale-105 transition-transform" />
      </div>

      <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 min-h-[40px]">{phone.name}</h3>
      <p className="text-[#f26522] font-bold mb-2">₹{phone.price.toLocaleString()}</p>
      
      <div className="text-xs text-gray-500 w-full text-left mt-2 space-y-1 border-t pt-2 border-gray-100 flex-grow">
        <p className="truncate">• {phone.specs.summary.specs.performance.value}</p>
        <p className="truncate">• {phone.specs.summary.specs.camera.value}</p>
        <p className="truncate">• {phone.specs.summary.specs.battery.value}</p>
      </div>

      <div className="mt-4 w-full flex flex-col gap-2">
        <button 
          onClick={handleDetailsClick}
          className="w-full border border-[#f26522] text-[#f26522] hover:bg-orange-50 text-xs font-bold py-1.5 rounded transition-colors"
        >
          View Details
        </button>
        <button 
          onClick={handleStoreClick}
          className="w-full bg-[#ff9900] hover:bg-[#e68a00] text-white text-xs font-bold py-1.5 rounded transition-colors flex items-center justify-center gap-1"
        >
          Go to Store
        </button>
      </div>
    </div>
  );
};

export default PhoneCard;
