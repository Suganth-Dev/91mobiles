import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CompareView from './components/CompareView';
import ProductDetailView from './components/ProductDetailView';
import AIAssistant from './components/AIAssistant';
import { ViewMode, Phone } from './types';
import { MOCK_PHONES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>(ViewMode.HOME);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [comparisonList, setComparisonList] = useState<Phone[]>([]);

  // Lifted State for HomeView persistence
  const [allPhones, setAllPhones] = useState<Phone[]>(MOCK_PHONES);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState(150000);

  const handleViewDetails = (phone: Phone) => {
    setSelectedPhone(phone);
    setCurrentView(ViewMode.DETAILS);
    window.scrollTo(0, 0);
  };

  const handleCompare = (phone: Phone) => {
    // Add to comparison list if not present
    if (!comparisonList.find(p => p.id === phone.id)) {
      setComparisonList(prev => [...prev, phone]);
    }
    // If list is empty/small, maybe add the default one to compare against?
    if (comparisonList.length === 0) {
       const rival = MOCK_PHONES.find(p => p.id !== phone.id) || MOCK_PHONES[0];
       setComparisonList([phone, rival]);
    }

    setCurrentView(ViewMode.COMPARE);
    window.scrollTo(0, 0);
  };

  const handleCompareNow = (phones: Phone[]) => {
    setComparisonList(phones);
    setCurrentView(ViewMode.COMPARE);
    window.scrollTo(0, 0);
  }

  const renderView = () => {
    switch (currentView) {
      case ViewMode.COMPARE:
        return <CompareView initialPhones={comparisonList.length > 0 ? comparisonList : undefined} />;
      case ViewMode.DETAILS:
        return selectedPhone ? (
          <ProductDetailView 
            phone={selectedPhone} 
            onCompare={handleCompare} 
            onBack={() => {
              setCurrentView(ViewMode.HOME);
              // We do NOT reset allPhones/selectedBrand here, effectively preserving state
            }} 
          />
        ) : (
          <HomeView 
            onViewDetails={handleViewDetails} 
            onCompareNow={handleCompareNow}
            allPhones={allPhones}
            setAllPhones={setAllPhones}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        );
      case ViewMode.HOME:
      default:
        return (
          <HomeView 
            onViewDetails={handleViewDetails} 
            onCompareNow={handleCompareNow}
            allPhones={allPhones}
            setAllPhones={setAllPhones}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f9]">
      <Header onNavigate={(page) => {
        setCurrentView(page);
        window.scrollTo(0, 0);
      }} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default App;
