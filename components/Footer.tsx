import React from 'react';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-[#f26522]">ABOUT US</h3>
            <ul className="space-y-2 text-gray-400">
              <li>About 91mobiles</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-[#f26522]">SERVICES</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Compare Mobiles</li>
              <li>Phone Finder</li>
              <li>Recharge Plans</li>
              <li>Electronics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-[#f26522]">OUR PARTNERS</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Amazon</li>
              <li>Flipkart</li>
              <li>Samsung</li>
              <li>OnePlus</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-[#f26522]">CONNECT WITH US</h3>
            <div className="flex gap-4">
              <Facebook className="cursor-pointer hover:text-[#f26522]" />
              <Twitter className="cursor-pointer hover:text-[#f26522]" />
              <Youtube className="cursor-pointer hover:text-[#f26522]" />
              <Instagram className="cursor-pointer hover:text-[#f26522]" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-xs">
          © 2025 91mobiles.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
