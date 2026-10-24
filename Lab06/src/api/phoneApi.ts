
import { PHONES } from '../data/phones';
import type { Phone } from '../types';

export const API_URL =
  'https://6adc9c64fa5e73d4ab2d8dc0.mockapi.io';

export const USING_API = true;


export async function fetchPhone(id: string): Promise<Phone> {
    const url = `${API_URL}/phones/${id}`;
  
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(
          `API lỗi ${res.status}: ${detail || res.statusText}`
        );
      }
  
      return (await res.json()) as Phone;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
  
      throw new Error('Không thể kết nối đến MockAPI');
    }
  }
  
