import React, { useState, useEffect } from 'react';
import { ChevronRight, Tablet, Smartphone, Laptop, Tv, Search, Loader, X, Zap, Layers, ChevronDown } from 'lucide-react';
import { MOCK_NEWS, BRANDS } from '../constants';
import PhoneCard from './PhoneCard';
import { fetchPhoneDetails, fetchPhonesByBrand, fetchMorePopularPhones } from '../services/geminiService';
import { Phone } from '../types';

interface HomeViewProps {
  onViewDetails: (phone: Phone) => void;
  onCompareNow: (phones: Phone[]) => void;
  // Lifted Props
  allPhones: Phone[];
  setAllPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
}

const ITEMS_PER_PAGE = 12;

const HomeView: React.FC<HomeViewProps> = ({ 
  onViewDetails, 
  onCompareNow,
  allPhones,
  setAllPhones,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isGoingLive, setIsGoingLive] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Data State
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>(allPhones);
  const [visiblePhones, setVisiblePhones] = useState<Phone[]>([]);
  
  // Pagination State
  const [page, setPage] = useState(1);

  // Comparison State
  const [compareList, setCompareList] = useState<Phone[]>([]);

  // Filter Logic
  useEffect(() => {
    let result = allPhones;
    result = result.filter(p => p.price <= priceRange);
    
    // Brand Filtering (Local + Fetched)
    if (selectedBrand) {
      result = result.filter(p => p.name.toLowerCase().includes(selectedBrand.toLowerCase()));
    }
    
    setFilteredPhones(result);
  }, [priceRange, selectedBrand, allPhones]);

  // Pagination Logic
  useEffect(() => {
    const end = page * ITEMS_PER_PAGE;
    // We only slice up to 'end' if we have enough local data.
    // If filteredPhones is huge, this acts as pagination.
    setVisiblePhones(filteredPhones.slice(0, end));
  }, [page, filteredPhones]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);
    
    const existing = allPhones.find(p => p.name.toLowerCase().includes(query.toLowerCase()));
    
    if (existing) {
       setSelectedBrand(null);
       setPriceRange(150000); 
       // Move to top
       const others = allPhones.filter(p => p.id !== existing.id);
       setAllPhones([existing, ...others]);
    } else {
       const result = await fetchPhoneDetails(query);
       if (result) {
         setAllPhones(prev => [result, ...prev]);
         setSelectedBrand(null);
         setPriceRange(150000);
         setSearchQuery('');
       } else {
         // Fallback: If exact detail fails, try "Popular" fetch with query context (re-using fetchPhonesByBrand logic creatively)
         // For now, simple alert
         alert("Could not find that exact mobile. Trying to fetch related popular phones...");
         const related = await fetchPhonesByBrand(query); // Fallback to treat query as brand/keyword
         if (related.length > 0) {
            setAllPhones(prev => [...related, ...prev]);
            setSelectedBrand(null);
         }
       }
    }
    setIsSearching(false);
  };

  const handleSearch = () => performSearch(searchQuery);

  const handleCategoryClick = (category: string) => {
    setSelectedBrand(null);
    setPriceRange(150000); // Reset price
    
    let query = "";
    switch(category) {
        case 'latest':
            query = "Latest flagship smartphones 2024 2025";
            break;
        case 'upcoming':
            query = "Upcoming smartphones launching soon";
            break;
        case '5g':
            query = "Best 5G smartphones under 30000";
            break;
        case 'camera':
            query = "Best camera phones 200MP";
            break;
        default:
            return;
    }
    
    setIsSearching(true);
    // Use the list fetcher for categories to get multiple results
    fetchPhonesByBrand(query).then(res => {
        if(res.length > 0) {
            setAllPhones(prev => [...res, ...prev]);
            // Scroll to list
            document.getElementById('mobile-list')?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsSearching(false);
    });
  };

  const handleGoLive = async () => {
    setIsGoingLive(true);
    const topPhones = visiblePhones.slice(0, 4);
    const promises = topPhones.map(p => fetchPhoneDetails(p.name));
    
    try {
      const results = await Promise.all(promises);
      const newPhones = [...allPhones];
      
      results.forEach((res, index) => {
        if (res) {
          const originalId = topPhones[index].id;
          const idx = newPhones.findIndex(p => p.id === originalId);
          if (idx !== -1) {
            newPhones[idx] = res;
          }
        }
      });
      setAllPhones(newPhones);
      alert("Updated top phones with latest live data!");
    } catch (e) {
      console.error(e);
      alert("Failed to fetch live data.");
    }
    setIsGoingLive(false);
  };

  const toggleBrand = async (brandName: string) => {
    if (selectedBrand === brandName) {
      setSelectedBrand(null);
      setPage(1);
      return;
    }

    setSelectedBrand(brandName);
    setPage(1);

    // Check if we already have enough phones for this brand
    const brandCount = allPhones.filter(p => p.name.toLowerCase().includes(brandName.toLowerCase())).length;
    
    // If less than 8, fetch more from AI!
    if (brandCount < 8) {
      setIsSearching(true); // Reuse search loader for simplicity
      const newPhones = await fetchPhonesByBrand(brandName);
      if (newPhones.length > 0) {
        // Avoid duplicates
        const uniqueNew = newPhones.filter(np => !allPhones.some(op => op.id === np.id));
        setAllPhones(prev => [...uniqueNew, ...prev]); // Prepend new brand phones
      }
      setIsSearching(false);
    }
  };

  const toggleCompare = (phone: Phone) => {
    if (compareList.find(p => p.id === phone.id)) {
      setCompareList(compareList.filter(p => p.id !== phone.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 mobiles only.");
        return;
      }
      setCompareList([...compareList, phone]);
    }
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    
    // If we have hidden local items, just show them first
    if (visiblePhones.length < filteredPhones.length) {
       setPage(prev => prev + 1);
       setIsLoadingMore(false);
       return;
    }

    // If we exhausted local items, Fetch generic popular ones from AI
    const currentNames = allPhones.map(p => p.name);
    const morePhones = await fetchMorePopularPhones(currentNames);
    
    if (morePhones.length > 0) {
      const uniqueNew = morePhones.filter(np => !allPhones.some(op => op.id === np.id));
      setAllPhones(prev => [...prev, ...uniqueNew]);
      setPage(prev => prev + 1); // This triggers the useEffect to update visiblePhones
    } else {
       alert("No more phones found.");
    }
    
    setIsLoadingMore(false);
  };

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Search & Hero Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-8">
           {/* Main Search Bar Big */}
           <div className="max-w-3xl mx-auto mb-8 relative">
              <div className="flex shadow-md rounded-md overflow-hidden border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Search ANY mobile (e.g. 'iPhone 4S', 'Nokia 6600', 'S24') - We will fetch it for you!" 
                  className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="bg-[#f26522] text-white px-6 font-bold hover:bg-[#d65215] flex items-center gap-2"
                  disabled={isSearching}
                >
                   {isSearching ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
                   Search
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">Access to database of 10,000+ Mobiles via AI Search</p>
           </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f9f9f9] p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4">Phone Finder</h2>
              <div className="mb-6">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>Price Range</span>
                  <span className="text-[#f26522]">Under ₹{priceRange.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="5000"
                  value={priceRange} 
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#84c225]"
                />
              </div>
              <button 
                onClick={() => {
                   const element = document.getElementById('mobile-list');
                   element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#f26522] text-white font-bold py-3 rounded shadow hover:bg-[#d65215] transition"
              >
                View {filteredPhones.length} Matching Mobiles
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Browse Categories</h2>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => handleCategoryClick('latest')}
                  className="flex items-center gap-3 p-4 border rounded hover:shadow-md cursor-pointer transition hover:bg-gray-50"
                >
                  <Smartphone className="text-[#f26522]" />
                  <span className="font-bold">Latest Phones</span>
                  <ChevronRight className="ml-auto text-gray-400 w-4" />
                </div>
                <div 
                  onClick={() => handleCategoryClick('upcoming')}
                  className="flex items-center gap-3 p-4 border rounded hover:shadow-md cursor-pointer transition hover:bg-gray-50"
                >
                  <Zap className="text-purple-600" />
                  <span className="font-bold">Upcoming</span>
                  <ChevronRight className="ml-auto text-gray-400 w-4" />
                </div>
                <div 
                  onClick={() => handleCategoryClick('5g')}
                  className="flex items-center gap-3 p-4 border rounded hover:shadow-md cursor-pointer transition hover:bg-gray-50"
                >
                  <Laptop className="text-blue-600" />
                  <span className="font-bold">5G Mobiles</span>
                  <ChevronRight className="ml-auto text-gray-400 w-4" />
                </div>
                <div 
                  onClick={() => handleCategoryClick('camera')}
                  className="flex items-center gap-3 p-4 border rounded hover:shadow-md cursor-pointer transition hover:bg-gray-50"
                >
                  <Tablet className="text-green-600" />
                  <span className="font-bold">Best Camera</span>
                  <ChevronRight className="ml-auto text-gray-400 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Brands</h2>
          {selectedBrand && (
            <button onClick={() => setSelectedBrand(null)} className="text-red-500 text-xs flex items-center gap-1 font-bold border border-red-200 px-2 py-1 rounded bg-red-50">
              Clear Filter <X size={12} />
            </button>
          )}
        </div>
        <div className="flex justify-between gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {BRANDS.map((brand, idx) => (
            <div 
              key={idx} 
              onClick={() => toggleBrand(brand.name)}
              className={`flex flex-col items-center min-w-[80px] cursor-pointer group ${selectedBrand === brand.name ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            >
              <div className={`w-16 h-16 rounded-full bg-white shadow-sm border flex items-center justify-center mb-2 transition-all p-2 ${selectedBrand === brand.name ? 'border-[#f26522] ring-2 ring-orange-100' : 'border-gray-100 group-hover:border-[#f26522]'}`}>
                <img src={brand.img} alt={brand.name} className="w-full h-full object-contain" />
              </div>
              <span className={`text-xs font-medium ${selectedBrand === brand.name ? 'text-[#f26522] font-bold' : 'text-gray-600'}`}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="container mx-auto px-4" id="mobile-list">
        <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedBrand ? `${selectedBrand} Mobiles` : 'All Mobile Phones'} 
            <span className="text-sm font-normal text-gray-500 ml-2">({filteredPhones.length} loaded)</span>
          </h2>
          <button 
            onClick={handleGoLive}
            disabled={isGoingLive}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded shadow hover:shadow-lg transition-all font-bold text-sm"
          >
            {isGoingLive ? <Loader className="animate-spin" size={16} /> : <Zap size={16} fill="white" />}
            {isGoingLive ? 'Live Update' : '⚡ Live Update'}
          </button>
        </div>
        
        {isSearching && !visiblePhones.length ? (
           <div className="py-20 flex flex-col items-center justify-center text-gray-500">
              <Loader className="animate-spin mb-4" size={40} />
              <p>Fetching latest {selectedBrand || ''} mobiles from global database...</p>
           </div>
        ) : visiblePhones.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
             <p className="text-lg">No mobiles found in this price range.</p>
             <button onClick={() => setPriceRange(200000)} className="text-[#f26522] font-bold mt-2">Reset Filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {visiblePhones.map((phone, idx) => (
                <PhoneCard 
                  key={phone.id + idx} 
                  phone={phone} 
                  onViewDetails={onViewDetails} 
                  isSelectedForCompare={!!compareList.find(p => p.id === phone.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-8 text-center pb-8">
              <button 
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:text-[#f26522] hover:border-[#f26522] transition-colors flex items-center gap-2 mx-auto shadow-sm disabled:opacity-50"
              >
                {isLoadingMore ? <Loader className="animate-spin" size={18} /> : <ChevronDown size={18} />}
                {isLoadingMore ? 'Fetching more from Database...' : 'Load More Mobiles'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 z-40 p-4 animate-slide-up">
           <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4 overflow-x-auto">
                 {compareList.map(phone => (
                   <div key={phone.id} className="relative flex items-center gap-2 bg-gray-50 border p-2 rounded min-w-[150px]">
                      <img src={phone.image} className="w-8 h-8 object-contain" alt="" />
                      <span className="text-xs font-bold line-clamp-1">{phone.name}</span>
                      <button 
                        onClick={() => toggleCompare(phone)}
                        className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full p-0.5 hover:bg-red-500"
                      >
                        <X size={12} />
                      </button>
                   </div>
                 ))}
                 {compareList.length < 3 && (
                   <div className="text-xs text-gray-400 italic">Add {3 - compareList.length} more to compare</div>
                 )}
              </div>
              <button 
                onClick={() => onCompareNow(compareList)}
                disabled={compareList.length < 2}
                className="bg-[#f26522] text-white px-8 py-3 rounded font-bold hover:bg-[#d65215] disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Layers size={18} />
                Compare Now
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default HomeView;
