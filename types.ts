export interface SpecItem {
  label: string;
  value: string | number;
  highlight?: boolean;
  score?: number; // 0-10 scale for bars
}

export interface SpecSection {
  title: string;
  specs: Record<string, SpecItem>; // Keyed by spec ID
}

export interface Phone {
  id: string;
  name: string;
  price: number;
  rating: number; // 0-100
  image: string;
  specs: Record<string, SpecSection>; // Keyed by section ID
  tags?: string[];
  launchDate?: string;
  amazonUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  time: string;
  image: string;
}

export enum ViewMode {
  HOME = 'HOME',
  COMPARE = 'COMPARE',
  DETAILS = 'DETAILS'
}
