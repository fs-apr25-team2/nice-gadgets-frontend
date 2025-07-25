export type FormData = {
  name: string;
  email: string;
  password: string;
};

export enum CatalogCategory {
  phones = 'Mobile phones',
  Tablets = 'Tablets',
  Accessories = 'Accessories',
}

export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export type CartProduct = Product & { quantity: number };

export type ProductCategory = 'phones' | 'tablets' | 'accessories';

type Description = {
  title: string;
  text: string[];
};

export type ProductDetails = {
  id: string;
  category: ProductCategory;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export type ProductOptions = {
  color?: string;
  capacity?: string;
};

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo: string;
  description: string;
  github: string;
  linkedin: string;
  telegram: string;
  email: string;
}

export enum Language {
  EN = 'en',
  UA = 'ua',
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
