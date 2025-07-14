/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Product,
  ProductCategory,
  ProductDetails,
  TeamMember,
} from '../types/types';

const BASE_URL = '/api';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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
export const getTeamMembersEN = () => get<TeamMember[]>('/teamEN');
export const getTeamMembersUA = () => get<TeamMember[]>('/teamUA');

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<ProductDetails[]> {
  let data: ProductDetails[] = [];

  if (category === 'phones') {
    data = await getPhones();
  } else if (category === 'tablets') {
    data = await getTablets();
  } else if (category === 'accessories') {
    data = await getAccessories();
  }

  return data;
}
