import { Phone, NewsItem } from './types';

// Helper to generate a "real" looking image URL using Bing's proxy
const getRealImage = (query: string) => `https://tse2.mm.bing.net/th?q=${encodeURIComponent(query + ' smartphone front official render white background')}&w=300&h=400&c=7&rs=1&p=0`;

// Helper to create detailed specs (Compact version for generating mass data)
const createDetailedSpecs = (
  name: string,
  price: string,
  launch: string,
  chip: string, 
  ram: string,
  screenSize: string, 
  screenRes: string,
  mainCam: string, 
  frontCam: string,
  batCap: string, 
  charge: string
) => ({
  summary: {
    title: 'Summary',
    specs: {
      performance: { label: 'Performance', value: chip },
      display: { label: 'Display', value: screenSize },
      camera: { label: 'Camera', value: mainCam },
      battery: { label: 'Battery', value: batCap },
    }
  },
  general: {
    title: 'General',
    specs: {
      launchDate: { label: 'Launch Date', value: launch },
      os: { label: 'Operating System', value: 'Android / iOS' },
      customUi: { label: 'Custom UI', value: 'Official UI' },
    }
  },
  performance: {
    title: 'Performance',
    specs: {
      chipset: { label: 'Chipset', value: chip },
      cpu: { label: 'CPU', value: 'Octa/Hexa core' },
      architecture: { label: 'Architecture', value: '64 bit' },
      fabrication: { label: 'Fabrication', value: '4 nm / 5 nm' },
      graphics: { label: 'Graphics', value: 'Adreno / GPU' },
      ram: { label: 'RAM', value: ram },
    }
  },
  display: {
    title: 'Display',
    specs: {
      type: { label: 'Display Type', value: 'AMOLED/LCD' },
      size: { label: 'Screen Size', value: screenSize },
      resolution: { label: 'Resolution', value: screenRes },
      aspectRatio: { label: 'Aspect Ratio', value: '20:9' },
      pixelDensity: { label: 'Pixel Density', value: 'High' },
      protection: { label: 'Screen Protection', value: 'Corning Gorilla Glass' },
      refreshRate: { label: 'Refresh Rate', value: '120 Hz / 60 Hz' },
    }
  },
  design: {
    title: 'Design',
    specs: {
      height: { label: 'Height', value: '-' },
      width: { label: 'Width', value: '-' },
      thickness: { label: 'Thickness', value: '-' },
      weight: { label: 'Weight', value: '-' },
      build: { label: 'Build Material', value: 'Glass/Plastic' },
      waterproof: { label: 'Waterproof', value: 'Yes/No' },
    }
  },
  camera: {
    title: 'Camera',
    specs: {
      main: { label: 'Main Camera', value: mainCam },
      front: { label: 'Front Camera', value: frontCam },
      flash: { label: 'Flash', value: 'Yes, LED Flash' },
      features: { label: 'Features', value: 'Digital Zoom, Auto Flash' },
      video: { label: 'Video Recording', value: '4K / 1080p' },
    }
  },
  battery: {
    title: 'Battery',
    specs: {
      capacity: { label: 'Capacity', value: batCap },
      type: { label: 'Type', value: 'Li-Polymer' },
      charging: { label: 'Quick Charging', value: charge },
      wireless: { label: 'Wireless Charging', value: 'Yes/No' },
    }
  },
  storage: {
    title: 'Storage',
    specs: {
      internal: { label: 'Internal Memory', value: '128GB / 256GB' },
      expandable: { label: 'Expandable Memory', value: 'No' },
    }
  },
  network: {
    title: 'Network & Connectivity',
    specs: {
      sim: { label: 'SIM Slot(s)', value: 'Dual SIM' },
      network: { label: 'Network Support', value: '5G, 4G' },
      volte: { label: 'VoLTE', value: 'Yes' },
      wifi: { label: 'Wi-Fi', value: 'Yes' },
      bluetooth: { label: 'Bluetooth', value: 'Yes' },
      nfc: { label: 'NFC', value: 'Yes' },
      usb: { label: 'USB Connectivity', value: 'USB-C' },
    }
  }
});

// --- MASS DATA GENERATION ---
// We manually define key flagships, then programmatically add more to simulate "All Data"

const FLAGSHIPS: Phone[] = [
  { id: 's24ultra', name: 'Samsung Galaxy S24 Ultra', price: 129999, rating: 98, image: getRealImage('Samsung Galaxy S24 Ultra Titanium'), launchDate: 'Jan 17, 2024', specs: createDetailedSpecs('Samsung Galaxy S24 Ultra', '129999', 'Jan 17, 2024', 'Snapdragon 8 Gen 3', '12 GB', '6.8 inches', '1440x3120 px', '200 MP + 50 MP', '12 MP', '5000 mAh', '45W') },
  { id: 'iphone15promax', name: 'Apple iPhone 15 Pro Max', price: 148900, rating: 97, image: getRealImage('iPhone 15 Pro Max Natural Titanium'), launchDate: 'Sep 22, 2023', specs: createDetailedSpecs('iPhone 15 Pro Max', '148900', 'Sep 22, 2023', 'Apple A17 Pro', '8 GB', '6.7 inches', '1290x2796 px', '48 MP + 12 MP', '12 MP', '4441 mAh', '20W') },
  { id: 'oneplus12', name: 'OnePlus 12', price: 64999, rating: 93, image: getRealImage('OnePlus 12 Flowy Emerald'), launchDate: 'Jan 23, 2024', specs: createDetailedSpecs('OnePlus 12', '64999', 'Jan 23, 2024', 'Snapdragon 8 Gen 3', '12 GB', '6.82 inches', '1440x3168 px', '50 MP + 64 MP', '32 MP', '5400 mAh', '100W') },
  { id: 'xiaomi14ultra', name: 'Xiaomi 14 Ultra', price: 99999, rating: 96, image: getRealImage('Xiaomi 14 Ultra'), launchDate: 'Apr 12, 2024', specs: createDetailedSpecs('Xiaomi 14 Ultra', '99999', 'Apr 12, 2024', 'Snapdragon 8 Gen 3', '16 GB', '6.73 inches', '1440x3200 px', '50 MP Quad', '32 MP', '5000 mAh', '90W') },
  { id: 'pixel8pro', name: 'Google Pixel 8 Pro', price: 98999, rating: 91, image: getRealImage('Google Pixel 8 Pro'), launchDate: 'Oct 04, 2023', specs: createDetailedSpecs('Google Pixel 8 Pro', '98999', 'Oct 04, 2023', 'Tensor G3', '12 GB', '6.7 inches', '1344x2992 px', '50 MP + 48 MP', '10.5 MP', '5050 mAh', '30W') },
  { id: 'iqoo12', name: 'iQOO 12', price: 52999, rating: 94, image: getRealImage('iQOO 12'), launchDate: 'Dec 12, 2023', specs: createDetailedSpecs('iQOO 12', '52999', 'Dec 12, 2023', 'Snapdragon 8 Gen 3', '12 GB', '6.78 inches', '1260x2800 px', '50 MP + 50 MP', '16 MP', '5000 mAh', '120W') },
  { id: 'motoedge50pro', name: 'Motorola Edge 50 Pro', price: 31999, rating: 88, image: getRealImage('Motorola Edge 50 Pro'), launchDate: 'Apr 03, 2024', specs: createDetailedSpecs('Motorola Edge 50 Pro', '31999', 'Apr 03, 2024', 'Snapdragon 7 Gen 3', '8 GB', '6.7 inches', '1220x2712 px', '50 MP + 13 MP', '50 MP', '4500 mAh', '125W') },
  { id: 'nothing2a', name: 'Nothing Phone (2a)', price: 23999, rating: 84, image: getRealImage('Nothing Phone 2a'), launchDate: 'Mar 05, 2024', specs: createDetailedSpecs('Nothing Phone 2a', '23999', 'Mar 05, 2024', 'Dimensity 7200 Pro', '8 GB', '6.7 inches', '1080x2412 px', '50 MP + 50 MP', '32 MP', '5000 mAh', '45W') },
  { id: 'vivo-x100', name: 'Vivo X100', price: 63999, rating: 92, image: getRealImage('Vivo X100'), launchDate: 'Jan 04, 2024', specs: createDetailedSpecs('Vivo X100', '63999', 'Jan 04, 2024', 'Dimensity 9300', '12 GB', '6.78 inches', '1260x2800 px', '50 MP Triple', '32 MP', '5000 mAh', '120W') },
  { id: 'realme-12-pro', name: 'Realme 12 Pro+', price: 29999, rating: 85, image: getRealImage('Realme 12 Pro Plus'), launchDate: 'Jan 29, 2024', specs: createDetailedSpecs('Realme 12 Pro+', '29999', 'Jan 29, 2024', 'Snapdragon 7s Gen 2', '8 GB', '6.7 inches', 'FHD+', '50 MP + 64 MP', '32 MP', '5000 mAh', '67W') },
];

const MID_RANGE_AND_BUDGET: Phone[] = [
    { id: 'redmi-note-13-pro', name: 'Redmi Note 13 Pro', price: 25999, rating: 85, image: getRealImage('Redmi Note 13 Pro'), launchDate: 'Jan 2024', specs: createDetailedSpecs('Redmi Note 13 Pro', '25999', 'Jan 2024', 'Snapdragon 7s Gen 2', '8 GB', '6.67 inch', '1.5K', '200MP', '16MP', '5100mAh', '67W') },
    { id: 'poco-x6-pro', name: 'POCO X6 Pro', price: 26999, rating: 88, image: getRealImage('POCO X6 Pro'), launchDate: 'Jan 2024', specs: createDetailedSpecs('POCO X6 Pro', '26999', 'Jan 2024', 'Dimensity 8300 Ultra', '8 GB', '6.67 inch', '1.5K', '64MP', '16MP', '5000mAh', '67W') },
    { id: 'nord-ce4', name: 'OnePlus Nord CE 4', price: 24999, rating: 84, image: getRealImage('OnePlus Nord CE 4'), launchDate: 'Apr 2024', specs: createDetailedSpecs('OnePlus Nord CE 4', '24999', 'Apr 2024', 'Snapdragon 7 Gen 3', '8 GB', '6.7 inch', 'FHD+', '50MP', '16MP', '5500mAh', '100W') },
    { id: 'galaxy-a55', name: 'Samsung Galaxy A55', price: 39999, rating: 82, image: getRealImage('Samsung Galaxy A55'), launchDate: 'Mar 2024', specs: createDetailedSpecs('Samsung Galaxy A55', '39999', 'Mar 2024', 'Exynos 1480', '8 GB', '6.6 inch', 'FHD+', '50MP', '32MP', '5000mAh', '25W') },
    { id: 'galaxy-a35', name: 'Samsung Galaxy A35', price: 30999, rating: 80, image: getRealImage('Samsung Galaxy A35'), launchDate: 'Mar 2024', specs: createDetailedSpecs('Samsung Galaxy A35', '30999', 'Mar 2024', 'Exynos 1380', '8 GB', '6.6 inch', 'FHD+', '50MP', '13MP', '5000mAh', '25W') },
    { id: 'iphone-14', name: 'Apple iPhone 14', price: 58999, rating: 88, image: getRealImage('iPhone 14'), launchDate: 'Sep 2022', specs: createDetailedSpecs('Apple iPhone 14', '58999', 'Sep 2022', 'A15 Bionic', '6 GB', '6.1 inch', 'Retina', '12MP', '12MP', '3279mAh', '20W') },
    { id: 'iphone-13', name: 'Apple iPhone 13', price: 49999, rating: 85, image: getRealImage('iPhone 13'), launchDate: 'Sep 2021', specs: createDetailedSpecs('Apple iPhone 13', '49999', 'Sep 2021', 'A15 Bionic', '4 GB', '6.1 inch', 'Retina', '12MP', '12MP', '3240mAh', '20W') },
    { id: 's23-ultra', name: 'Samsung Galaxy S23 Ultra', price: 89999, rating: 95, image: getRealImage('Samsung Galaxy S23 Ultra'), launchDate: 'Feb 2023', specs: createDetailedSpecs('S23 Ultra', '89999', 'Feb 2023', 'Snapdragon 8 Gen 2', '12 GB', '6.8 inch', 'QHD+', '200MP', '12MP', '5000mAh', '45W') },
    { id: 's23', name: 'Samsung Galaxy S23', price: 54999, rating: 90, image: getRealImage('Samsung Galaxy S23'), launchDate: 'Feb 2023', specs: createDetailedSpecs('S23', '54999', 'Feb 2023', 'Snapdragon 8 Gen 2', '8 GB', '6.1 inch', 'FHD+', '50MP', '12MP', '3900mAh', '25W') },
    { id: 'pixel-7a', name: 'Google Pixel 7a', price: 37999, rating: 83, image: getRealImage('Google Pixel 7a'), launchDate: 'May 2023', specs: createDetailedSpecs('Pixel 7a', '37999', 'May 2023', 'Tensor G2', '8 GB', '6.1 inch', 'FHD+', '64MP', '13MP', '4385mAh', '18W') },
    { id: 'pixel-7', name: 'Google Pixel 7', price: 44999, rating: 86, image: getRealImage('Google Pixel 7'), launchDate: 'Oct 2022', specs: createDetailedSpecs('Pixel 7', '44999', 'Oct 2022', 'Tensor G2', '8 GB', '6.3 inch', 'FHD+', '50MP', '10.8MP', '4355mAh', '20W') },
    { id: 'moto-g84', name: 'Motorola Moto G84', price: 18999, rating: 78, image: getRealImage('Moto G84'), launchDate: 'Sep 2023', specs: createDetailedSpecs('Moto G84', '18999', 'Sep 2023', 'Snapdragon 695', '12 GB', '6.55 inch', 'FHD+', '50MP', '16MP', '5000mAh', '30W') },
    { id: 'realme-12x', name: 'Realme 12x 5G', price: 11999, rating: 72, image: getRealImage('Realme 12x'), launchDate: 'Apr 2024', specs: createDetailedSpecs('Realme 12x', '11999', 'Apr 2024', 'Dimensity 6100+', '4 GB', '6.72 inch', 'FHD+', '50MP', '8MP', '5000mAh', '45W') },
    { id: 'vivo-t3', name: 'Vivo T3', price: 19999, rating: 80, image: getRealImage('Vivo T3'), launchDate: 'Mar 2024', specs: createDetailedSpecs('Vivo T3', '19999', 'Mar 2024', 'Dimensity 7200', '8 GB', '6.67 inch', 'FHD+', '50MP', '16MP', '5000mAh', '44W') },
    { id: 'iqoo-z9', name: 'iQOO Z9', price: 19999, rating: 81, image: getRealImage('iQOO Z9'), launchDate: 'Mar 2024', specs: createDetailedSpecs('iQOO Z9', '19999', 'Mar 2024', 'Dimensity 7200', '8 GB', '6.67 inch', 'FHD+', '50MP', '16MP', '5000mAh', '44W') },
    { id: 'oppo-f25-pro', name: 'Oppo F25 Pro', price: 23999, rating: 82, image: getRealImage('Oppo F25 Pro'), launchDate: 'Feb 2024', specs: createDetailedSpecs('Oppo F25 Pro', '23999', 'Feb 2024', 'Dimensity 7050', '8 GB', '6.7 inch', 'FHD+', '64MP', '32MP', '5000mAh', '67W') },
    { id: 'narzo-70-pro', name: 'Realme Narzo 70 Pro', price: 19999, rating: 81, image: getRealImage('Narzo 70 Pro'), launchDate: 'Mar 2024', specs: createDetailedSpecs('Narzo 70 Pro', '19999', 'Mar 2024', 'Dimensity 7050', '8 GB', '6.67 inch', 'FHD+', '50MP', '16MP', '5000mAh', '67W') },
    { id: 'tecno-pova-6', name: 'Tecno Pova 6 Pro', price: 19999, rating: 76, image: getRealImage('Tecno Pova 6 Pro'), launchDate: 'Mar 2024', specs: createDetailedSpecs('Tecno Pova 6 Pro', '19999', 'Mar 2024', 'Dimensity 6080', '8 GB', '6.78 inch', 'FHD+', '108MP', '32MP', '6000mAh', '70W') },
    { id: 'lava-blaze-curve', name: 'Lava Blaze Curve', price: 17999, rating: 78, image: getRealImage('Lava Blaze Curve'), launchDate: 'Mar 2024', specs: createDetailedSpecs('Lava Blaze Curve', '17999', 'Mar 2024', 'Dimensity 7050', '8 GB', '6.67 inch', 'FHD+', '64MP', '32MP', '5000mAh', '33W') },
    { id: 'honor-x9b', name: 'Honor X9b', price: 25999, rating: 80, image: getRealImage('Honor X9b'), launchDate: 'Feb 2024', specs: createDetailedSpecs('Honor X9b', '25999', 'Feb 2024', 'Snapdragon 6 Gen 1', '8 GB', '6.78 inch', '1.5K', '108MP', '16MP', '5800mAh', '35W') },
];

const OLDER_CLASSICS: Phone[] = [
    { id: 'oneplus-7t', name: 'OnePlus 7T', price: 14999, rating: 75, image: getRealImage('OnePlus 7T'), launchDate: 'Sep 2019', specs: createDetailedSpecs('OnePlus 7T', '14999', 'Sep 2019', 'Snapdragon 855+', '8 GB', '6.55 inch', 'FHD+', '48MP', '16MP', '3800mAh', '30W') },
    { id: 'iphone-xr', name: 'Apple iPhone XR', price: 22999, rating: 72, image: getRealImage('iPhone XR'), launchDate: 'Oct 2018', specs: createDetailedSpecs('iPhone XR', '22999', 'Oct 2018', 'A12 Bionic', '3 GB', '6.1 inch', 'HD+', '12MP', '7MP', '2942mAh', '15W') },
    { id: 'redmi-note-10-pro', name: 'Redmi Note 10 Pro', price: 12999, rating: 76, image: getRealImage('Redmi Note 10 Pro'), launchDate: 'Mar 2021', specs: createDetailedSpecs('Redmi Note 10 Pro', '12999', 'Mar 2021', 'Snapdragon 732G', '6 GB', '6.67 inch', 'FHD+', '64MP', '16MP', '5020mAh', '33W') },
    { id: 's20-fe', name: 'Samsung Galaxy S20 FE 5G', price: 24999, rating: 82, image: getRealImage('Samsung S20 FE'), launchDate: 'Oct 2020', specs: createDetailedSpecs('S20 FE', '24999', 'Oct 2020', 'Snapdragon 865', '8 GB', '6.5 inch', 'FHD+', '12MP', '32MP', '4500mAh', '25W') },
    // Expanded List
    { id: 'realme-gt-6t', name: 'Realme GT 6T', price: 30999, rating: 89, image: getRealImage('Realme GT 6T'), launchDate: 'May 2024', specs: createDetailedSpecs('Realme GT 6T', '30999', 'May 2024', 'Snapdragon 7+ Gen 3', '8 GB', '6.78 inch', '1.5K', '50MP', '32MP', '5500mAh', '120W') },
    { id: 'poco-f6', name: 'POCO F6', price: 29999, rating: 88, image: getRealImage('POCO F6'), launchDate: 'May 2024', specs: createDetailedSpecs('POCO F6', '29999', 'May 2024', 'Snapdragon 8s Gen 3', '8 GB', '6.67 inch', '1.5K', '50MP', '20MP', '5000mAh', '90W') },
    { id: 'moto-edge-50-fusion', name: 'Motorola Edge 50 Fusion', price: 22999, rating: 85, image: getRealImage('Motorola Edge 50 Fusion'), launchDate: 'May 2024', specs: createDetailedSpecs('Moto Edge 50 Fusion', '22999', 'May 2024', 'Snapdragon 7s Gen 2', '8 GB', '6.7 inch', 'FHD+', '50MP', '32MP', '5000mAh', '68W') },
    { id: 'vivo-v30', name: 'Vivo V30', price: 33999, rating: 84, image: getRealImage('Vivo V30'), launchDate: 'Mar 2024', specs: createDetailedSpecs('Vivo V30', '33999', 'Mar 2024', 'Snapdragon 7 Gen 3', '8 GB', '6.78 inch', '1.5K', '50MP', '50MP', '5000mAh', '80W') },
    { id: 'oneplus-nord-3', name: 'OnePlus Nord 3', price: 29999, rating: 83, image: getRealImage('OnePlus Nord 3'), launchDate: 'Jul 2023', specs: createDetailedSpecs('OnePlus Nord 3', '29999', 'Jul 2023', 'Dimensity 9000', '8 GB', '6.74 inch', '1.5K', '50MP', '16MP', '5000mAh', '80W') },
    { id: 'redmi-13c', name: 'Redmi 13C', price: 8999, rating: 70, image: getRealImage('Redmi 13C'), launchDate: 'Dec 2023', specs: createDetailedSpecs('Redmi 13C', '8999', 'Dec 2023', 'Helio G85', '4 GB', '6.74 inch', 'HD+', '50MP', '8MP', '5000mAh', '18W') },
    { id: 'samsung-m34', name: 'Samsung Galaxy M34', price: 15999, rating: 79, image: getRealImage('Samsung Galaxy M34'), launchDate: 'Jul 2023', specs: createDetailedSpecs('Samsung M34', '15999', 'Jul 2023', 'Exynos 1280', '6 GB', '6.5 inch', 'FHD+', '50MP', '13MP', '6000mAh', '25W') },
    { id: 'iphone-12', name: 'Apple iPhone 12', price: 39999, rating: 80, image: getRealImage('iPhone 12'), launchDate: 'Oct 2020', specs: createDetailedSpecs('iPhone 12', '39999', 'Oct 2020', 'A14 Bionic', '4 GB', '6.1 inch', 'Retina', '12MP', '12MP', '2815mAh', '20W') },
    { id: 'pixel-6a', name: 'Google Pixel 6a', price: 24999, rating: 78, image: getRealImage('Google Pixel 6a'), launchDate: 'May 2022', specs: createDetailedSpecs('Pixel 6a', '24999', 'May 2022', 'Tensor', '6 GB', '6.1 inch', 'FHD+', '12.2MP', '8MP', '4410mAh', '18W') },
    { id: 'cmf-phone-1', name: 'CMF Phone 1', price: 15999, rating: 82, image: getRealImage('CMF Phone 1'), launchDate: 'Jul 2024', specs: createDetailedSpecs('CMF Phone 1', '15999', 'Jul 2024', 'Dimensity 7300', '6 GB', '6.67 inch', 'FHD+', '50MP', '16MP', '5000mAh', '33W') },
];

// Concatenate all lists to simulate a larger database
export const MOCK_PHONES: Phone[] = [
  ...FLAGSHIPS,
  ...MID_RANGE_AND_BUDGET,
  ...OLDER_CLASSICS
].map(p => ({
  ...p,
  amazonUrl: `https://www.amazon.in/s?k=${encodeURIComponent(p.name + ' smartphone')}`
}));


export const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: 'Samsung Galaxy S25 Ultra renders leak showing flat display', time: '2 hours ago', image: getRealImage('Samsung Galaxy S25 Ultra Leak') },
  { id: '2', title: 'iPhone 16 Pro Max battery capacity tipped to increase', time: '5 hours ago', image: getRealImage('iPhone 16 Pro Max Concept') },
  { id: '3', title: 'Nothing Phone 3 teased with new transparent design', time: '1 Day ago', image: getRealImage('Nothing Phone 3') },
];

export const BRANDS = [
  { name: 'Samsung', img: getRealImage('Samsung Logo') },
  { name: 'Apple', img: getRealImage('Apple Logo') },
  { name: 'Xiaomi', img: getRealImage('Xiaomi Logo') },
  { name: 'OnePlus', img: getRealImage('OnePlus Logo') },
  { name: 'Realme', img: getRealImage('Realme Logo') },
  { name: 'Vivo', img: getRealImage('Vivo Logo') },
  { name: 'OPPO', img: getRealImage('OPPO Logo') },
  { name: 'Motorola', img: getRealImage('Motorola Logo') },
  { name: 'Google', img: getRealImage('Google Logo') },
  { name: 'POCO', img: getRealImage('POCO Logo') },
  { name: 'iQOO', img: getRealImage('iQOO Logo') },
  { name: 'Honor', img: getRealImage('Honor Logo') },
  { name: 'Tecno', img: getRealImage('Tecno Logo') },
  { name: 'Lava', img: getRealImage('Lava Logo') },
];
