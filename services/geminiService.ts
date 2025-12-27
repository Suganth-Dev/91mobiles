import { GoogleGenAI } from "@google/genai";
import { Phone } from "../types";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const getGeminiAdvice = async (query: string): Promise<string> => {
  if (!ai) {
    return "API Key not configured. Please set process.env.API_KEY to use the AI assistant.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert mobile phone reviewer for 91mobiles. Answer the user's question briefly and professionally about mobile phones. 
      
      User Question: ${query}
      
      Keep the answer under 50 words. Focus on value for money and specs.`,
    });
    return response.text || "I couldn't generate an answer at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the server.";
  }
};

// Helper to generate a standardized Phone object structure for the list view
const listPromptStructure = `
  Return a JSON ARRAY of objects. Each object must match:
  {
    "id": "string (kebab-case-model-name)",
    "name": "string (Full Model Name)",
    "price": number (Estimated Price in INR),
    "rating": number (80-99),
    "launchDate": "string (e.g., Jan 2024)",
    "specs": {
      "summary": {
        "title": "Summary",
        "specs": {
          "performance": { "label": "Performance", "value": "string (Chipset name)" },
          "display": { "label": "Display", "value": "string (Size & Type)" },
          "camera": { "label": "Camera", "value": "string (MP count)" },
          "battery": { "label": "Battery", "value": "string (mAh & Charging)" }
        }
      }
    }
  }
`;

export const fetchPhonesByBrand = async (brand: string): Promise<Phone[]> => {
  if (!ai) return [];

  try {
    const prompt = `
      List 12 of the latest and most popular smartphones from the brand "${brand}".
      ${listPromptStructure}
      Do NOT include placeholders. Use real data.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text;
    if (!text) return [];

    const rawData = JSON.parse(text);
    return rawData.map((item: any) => enrichPhoneData(item));
  } catch (error) {
    console.error(`Error fetching phones for ${brand}:`, error);
    return [];
  }
};

export const fetchMorePopularPhones = async (excludeNames: string[]): Promise<Phone[]> => {
  if (!ai) return [];

  try {
    const prompt = `
      List 12 popular smartphones released in 2023-2025 that are NOT in this list: ${excludeNames.slice(0, 20).join(', ')}.
      Include a mix of Flagship and Budget phones.
      ${listPromptStructure}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text;
    if (!text) return [];

    const rawData = JSON.parse(text);
    return rawData.map((item: any) => enrichPhoneData(item));
  } catch (error) {
    console.error("Error fetching popular phones:", error);
    return [];
  }
};

// Helper to fill in missing detailed structure for the card view & generate images
const enrichPhoneData = (item: any): Phone => {
  const fullSpecs = {
    summary: item.specs?.summary || { title: 'Summary', specs: { performance: { label: 'Performance', value: 'N/A' }, display: { label: 'Display', value: 'N/A' }, camera: { label: 'Camera', value: 'N/A' }, battery: { label: 'Battery', value: 'N/A' } } },
    // Fill other required sections with placeholders to satisfy Type check, 
    // real details can be fetched again on Detail View if needed.
    general: { title: 'General', specs: { launchDate: { label: 'Launch Date', value: item.launchDate || '-' }, os: { label: 'OS', value: 'Android' }, customUi: { label: 'UI', value: '-' } } },
    performance: { title: 'Performance', specs: { chipset: { label: 'Chipset', value: item.specs?.summary?.specs?.performance?.value || '-' }, ram: { label: 'RAM', value: '-' }, cpu: { label: 'CPU', value: '-' }, architecture: { label: 'Architecture', value: '-' }, fabrication: { label: 'Fab', value: '-' }, graphics: { label: 'GPU', value: '-' } } },
    display: { title: 'Display', specs: { size: { label: 'Size', value: item.specs?.summary?.specs?.display?.value || '-' }, type: { label: 'Type', value: '-' }, resolution: { label: 'Res', value: '-' }, aspectRatio: { label: 'Ratio', value: '-' }, pixelDensity: { label: 'PPI', value: '-' }, protection: { label: 'Protection', value: '-' }, refreshRate: { label: 'Hz', value: '-' } } },
    design: { title: 'Design', specs: { height: { label: 'H', value: '-' }, width: { label: 'W', value: '-' }, thickness: { label: 'T', value: '-' }, weight: { label: 'Wt', value: '-' }, build: { label: 'Build', value: '-' }, waterproof: { label: 'IP', value: '-' } } },
    camera: { title: 'Camera', specs: { main: { label: 'Main', value: item.specs?.summary?.specs?.camera?.value || '-' }, front: { label: 'Front', value: '-' }, flash: { label: 'Flash', value: '-' }, features: { label: 'Feat', value: '-' }, video: { label: 'Vid', value: '-' } } },
    battery: { title: 'Battery', specs: { capacity: { label: 'Cap', value: item.specs?.summary?.specs?.battery?.value || '-' }, type: { label: 'Type', value: '-' }, charging: { label: 'Chg', value: '-' }, wireless: { label: 'Wrls', value: '-' } } },
    storage: { title: 'Storage', specs: { internal: { label: 'Int', value: '-' }, expandable: { label: 'Ext', value: '-' } } },
    network: { title: 'Network', specs: { sim: { label: 'SIM', value: '-' }, network: { label: 'Net', value: '5G' }, volte: { label: 'VoLTE', value: '-' }, wifi: { label: 'Wifi', value: '-' }, bluetooth: { label: 'BT', value: '-' }, nfc: { label: 'NFC', value: '-' }, usb: { label: 'USB', value: '-' } } }
  };

  return {
    ...item,
    specs: fullSpecs,
    image: `https://tse2.mm.bing.net/th?q=${encodeURIComponent(item.name + ' smartphone front official render white background')}&w=300&h=400&c=7&rs=1&p=0`,
    amazonUrl: `https://www.amazon.in/s?k=${encodeURIComponent(item.name + ' smartphone')}`
  };
};

export const fetchPhoneDetails = async (phoneName: string): Promise<Phone | null> => {
  if (!ai) {
    console.error("No API Key");
    return null;
  }

  try {
    // We need a VERY detailed prompt structure to match the new constant.ts structure
    const prompt = `
      Generate a JSON object for the smartphone "${phoneName}".
      It must match this EXACT TypeScript structure. Use "Yes/No" or detailed string values.
      
      Interface:
      {
        id: string (kebab-case name),
        name: string,
        price: number (in INR),
        rating: number (80-100),
        image: string (leave empty),
        launchDate: string,
        specs: {
          summary: { title: "Summary", specs: { performance: {label: "Performance", value: string}, display: {label: "Display", value: string}, camera: {label: "Camera", value: string}, battery: {label: "Battery", value: string} } },
          general: { title: "General", specs: { launchDate: {label: "Launch Date", value: string}, os: {label: "Operating System", value: string}, customUi: {label: "Custom UI", value: string} } },
          performance: { title: "Performance", specs: { chipset: {label: "Chipset", value: string}, cpu: {label: "CPU", value: string}, architecture: {label: "Architecture", value: string}, fabrication: {label: "Fabrication", value: string}, graphics: {label: "Graphics", value: string}, ram: {label: "RAM", value: string} } },
          display: { title: "Display", specs: { type: {label: "Display Type", value: string}, size: {label: "Screen Size", value: string}, resolution: {label: "Resolution", value: string}, aspectRatio: {label: "Aspect Ratio", value: string}, pixelDensity: {label: "Pixel Density", value: string}, protection: {label: "Screen Protection", value: string}, refreshRate: {label: "Refresh Rate", value: string} } },
          design: { title: "Design", specs: { height: {label: "Height", value: string}, width: {label: "Width", value: string}, thickness: {label: "Thickness", value: string}, weight: {label: "Weight", value: string}, build: {label: "Build Material", value: string}, waterproof: {label: "Waterproof", value: string} } },
          camera: { title: "Camera", specs: { main: {label: "Main Camera", value: string}, front: {label: "Front Camera", value: string}, flash: {label: "Flash", value: string}, features: {label: "Features", value: string}, video: {label: "Video Recording", value: string} } },
          battery: { title: "Battery", specs: { capacity: {label: "Capacity", value: string}, type: {label: "Type", value: string}, charging: {label: "Quick Charging", value: string}, wireless: {label: "Wireless Charging", value: string} } },
          storage: { title: "Storage", specs: { internal: {label: "Internal Memory", value: string}, expandable: {label: "Expandable Memory", value: string} } },
          network: { title: "Network & Connectivity", specs: { sim: {label: "SIM Slot(s)", value: string}, network: {label: "Network Support", value: string}, volte: {label: "VoLTE", value: string}, wifi: {label: "Wi-Fi", value: string}, bluetooth: {label: "Bluetooth", value: string}, nfc: {label: "NFC", value: string}, usb: {label: "USB Connectivity", value: string} } }
        }
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text);
    
    // Enrich with client-side generate fields
    data.image = `https://tse2.mm.bing.net/th?q=${encodeURIComponent(data.name + ' smartphone front official render')}&w=300&h=400&c=7&rs=1&p=0`;
    data.amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(data.name)}`;

    return data as Phone;

  } catch (error) {
    console.error("Error fetching phone details from Gemini:", error);
    return null;
  }
}
