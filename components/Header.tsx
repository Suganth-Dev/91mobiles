import React, { useState } from 'react';
import { Search, Menu, ChevronDown, Smartphone, Laptop, Tv, Headphones, Watch } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuEnter = (menu: string) => setActiveMenu(menu);
  const handleMenuLeave = () => setActiveMenu(null);

  // Mock Data for Mobiles Dropdown
  const mobileMenu = {
    col1: [
      {
        title: 'Mobiles',
        isLink: true,
        items: ['Phone Finder', 'Best Mobiles', 'Latest Mobiles', 'Upcoming Mobiles', 'Smartphone Benchmarks']
      },
      {
        title: 'Feature',
        isLink: false,
        items: ['5G Mobiles', 'Best Camera Phones', 'Best Gaming Phones', 'Keypad Mobiles']
      }
    ],
    col2: [
      {
        title: 'Brands',
        isLink: false,
        items: ['Samsung Mobiles', 'Moto Mobiles', 'Realme Mobiles', 'Vivo Mobiles', 'OnePlus Mobiles', 'OPPO Mobiles', 'Xiaomi Mobiles', 'iQOO Mobiles', 'POCO Mobiles', 'Apple Mobiles', 'Tecno Mobiles']
      }
    ],
    col3: [
      {
        title: 'Price Range',
        isLink: false,
        items: ['Rs. 8,000 - Rs. 12,000', 'Rs. 12,000 - Rs. 25,000', 'Above Rs. 25,000']
      },
      {
        title: 'Tablets',
        isLink: true,
        items: ['Tablet Finder', 'Samsung Tablets', 'Apple Tablets', 'Lenovo Tablets', 'Best Tablets Under 10,000', 'Best Tablets Under 15,000']
      }
    ]
  };

  // Mock Data for Electronics Dropdown
  const electronicsMenu = [
    {
      group: 'Laptops',
      icon: <Laptop size={16} />,
      sections: [
        { title: 'Laptops', isLink: true, items: ['Laptop Finder'] },
        { title: 'Brands', isLink: false, items: ['HP Laptops', 'Dell Laptops', 'Acer Laptops', 'Apple Laptops', 'Lenovo Laptops'] },
        { title: 'Feature', isLink: false, items: ['i7 Laptops', 'i5 Laptops', 'Gaming Laptops'] },
        { title: 'Price', isLink: false, items: ['Best Laptops Under 20,000', 'Best Laptops Under 30,000', 'Best Laptops Under 40,000', 'Best Laptops Under 50,000'] },
      ]
    },
    {
      group: 'TVs',
      icon: <Tv size={16} />,
      sections: [
        { title: 'TVs', isLink: true, items: ['TV Finder', 'LED TV Price', 'Smart TV', 'OLED TV'] },
        { title: 'Brands', isLink: false, items: ['MI LED TV', 'Sony LED TV', 'Samsung LED TV', 'LG LED TV'] },
        { title: 'Screen Sizes', isLink: false, items: ['24 inch LED TV', '32 inch LED TV', '42 inch LED TV', '55 inch LED TV'] },
        { title: 'Price', isLink: false, items: ['TV Under 10,000'] },
      ]
    },
    {
      group: 'Audio',
      icon: <Headphones size={16} />,
      sections: [
        { title: 'Audio', isLink: true, items: ['Headphones', 'Earphones', 'Earbuds', 'Boat Headphones', 'Boat Earphones', 'Bluetooth Headphones', 'Bluetooth Earphones', 'True Wireless Earbuds', 'Best Earphones Under 500', 'Best Headphones Under 2,000', 'Best Earbuds Under 1,000'] }
      ]
    },
    {
      group: 'Wearables',
      icon: <Watch size={16} />,
      sections: [
        { title: 'Wearables', isLink: true, items: ['Smartwatch Finder', 'Fitness Band Finder'] }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans">
      {/* Top thin bar */}
      <div className="bg-[#212121] text-xs text-gray-400 py-1 px-4 hidden md:flex justify-between">
        <div className="flex gap-4">
          <span>Largest Gadget Discovery Site in India</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[#f26522] cursor-pointer font-bold">LATEST MOBILES:</span>
          <span className="hover:text-white cursor-pointer transition-colors">OnePlus 15R</span>
          <span className="hover:text-white cursor-pointer transition-colors">Motorola Edge 70</span>
          <span className="hover:text-white cursor-pointer transition-colors">Oppo Reno 15</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#212121] text-white py-3 px-4 md:px-8 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-6">
          <div 
            className="text-2xl font-bold text-[#f26522] cursor-pointer tracking-tighter"
            onClick={() => onNavigate('HOME')}
          >
            91mobiles
          </div>
          
          <div className="hidden lg:flex relative group">
            <input 
              type="text" 
              placeholder="Search for products or brands" 
              className="w-[400px] h-9 pl-4 pr-10 rounded-sm text-black focus:outline-none placeholder-gray-500 text-sm"
            />
            <Search className="absolute right-2 top-2 text-[#f26522] w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <button className="hidden md:block hover:text-[#f26522] transition-colors">Login/Signup</button>
          <Menu className="md:hidden w-6 h-6" />
        </div>
      </div>

      {/* Sub Navbar with Dropdowns */}
      <div className="bg-white border-b border-gray-200 hidden md:flex items-center justify-center gap-8 text-sm text-gray-700 font-medium relative">
        
        {/* Mobiles & Tablets Menu Item */}
        <div 
          className="relative py-3"
          onMouseEnter={() => handleMenuEnter('mobiles')}
          onMouseLeave={handleMenuLeave}
        >
          <div className={`flex items-center gap-1 cursor-pointer ${activeMenu === 'mobiles' ? 'text-[#f26522]' : 'hover:text-[#f26522]'}`}>
            Mobiles & Tablets <ChevronDown size={14} className={`transition-transform ${activeMenu === 'mobiles' ? 'rotate-180' : ''}`} />
          </div>

          {/* Mega Menu Dropdown */}
          {activeMenu === 'mobiles' && (
            <div className="absolute top-full left-[-100px] w-[800px] bg-white shadow-xl border-t border-[#f26522] z-50 flex rounded-b-md animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Column 1 */}
              <div className="w-1/3 p-5 border-r border-gray-100">
                {mobileMenu.col1.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h4 className={`font-bold mb-3 ${section.isLink ? 'text-[#f26522] flex items-center gap-1 cursor-pointer' : 'text-black'}`}>
                      {section.title} {section.isLink && <ChevronDown size={12} className="-rotate-90" />}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-gray-500 hover:text-[#f26522] cursor-pointer text-sm transition-colors">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="w-1/3 p-5 border-r border-gray-100">
                 {mobileMenu.col2.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h4 className="font-bold mb-3 text-black">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-gray-500 hover:text-[#f26522] cursor-pointer text-sm transition-colors">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Column 3 */}
              <div className="w-1/3 p-5 bg-gray-50">
                {mobileMenu.col3.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h4 className={`font-bold mb-3 ${section.isLink ? 'text-[#f26522] flex items-center gap-1 cursor-pointer' : 'text-black'}`}>
                      {section.title} {section.isLink && <ChevronDown size={12} className="-rotate-90" />}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-gray-500 hover:text-[#f26522] cursor-pointer text-sm transition-colors">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top 10 */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#f26522] py-3">Top 10 <ChevronDown size={14} /></div>
        
        {/* Compare */}
        <div 
          className="flex items-center gap-1 cursor-pointer hover:text-[#f26522] py-3"
          onClick={() => onNavigate('COMPARE')}
        >
          Compare <ChevronDown size={14} />
        </div>
        
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#f26522] py-3">Upcoming Mobiles</div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#f26522] py-3">News & Reviews <ChevronDown size={14} /></div>
        
        {/* Electronics Menu Item */}
        <div 
          className="relative py-3"
          onMouseEnter={() => handleMenuEnter('electronics')}
          onMouseLeave={handleMenuLeave}
        >
          <div className={`flex items-center gap-1 cursor-pointer ${activeMenu === 'electronics' ? 'text-[#f26522]' : 'hover:text-[#f26522]'}`}>
            Electronics <ChevronDown size={14} className={`transition-transform ${activeMenu === 'electronics' ? 'rotate-180' : ''}`} />
          </div>

          {/* Mega Menu Dropdown */}
           {activeMenu === 'electronics' && (
            <div className="absolute top-full left-[-200px] w-[1000px] bg-white shadow-xl border-t border-[#f26522] z-50 flex rounded-b-md animate-in fade-in slide-in-from-top-2 duration-200">
               {electronicsMenu.map((group, idx) => (
                 <div key={idx} className={`w-1/4 p-5 ${idx !== electronicsMenu.length -1 ? 'border-r border-gray-100' : ''}`}>
                    <div className="flex items-center gap-2 mb-4 text-gray-800 border-b pb-2">
                      {group.icon}
                      <span className="font-bold uppercase text-sm">{group.group}</span>
                    </div>
                    {group.sections.map((section, sIdx) => (
                      <div key={sIdx} className="mb-4">
                        <h5 className={`text-xs font-bold mb-2 uppercase ${section.isLink ? 'text-[#f26522] cursor-pointer' : 'text-gray-700'}`}>
                          {section.title}
                        </h5>
                        <ul className="space-y-1.5">
                          {section.items.map((item, i) => (
                            <li key={i} className="text-gray-500 hover:text-[#f26522] cursor-pointer text-xs transition-colors">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                 </div>
               ))}
            </div>
           )}
        </div>
      </div>
    </header>
  );
};

export default Header;
