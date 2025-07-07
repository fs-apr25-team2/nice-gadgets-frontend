import { Product, ProductDetails } from '../types/types';

const BASE_URL = '/api';

async function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  try {
    const response = await fetch(fullURL);

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} (${response.statusText})`,
      );
    }

    const data = await response.json();

    return data as T;
  } catch (error) {
    console.error(`Failed to fetch ${fullURL}`, error);
    throw error;
  }
}

export const getProducts = () => get<Product[]>('/products');
export const getPhones = () => get<ProductDetails[]>('/phones');
export const getTablets = () => get<ProductDetails[]>('/tablets');
export const getAccessories = () => get<ProductDetails[]>('/accessories');
