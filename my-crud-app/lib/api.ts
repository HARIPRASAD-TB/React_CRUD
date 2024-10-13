import axios from 'axios';
import { ObjectData } from './types';

const API_URL = 'https://api.restful-api.dev/objects';


// lib/api.ts
export async function getObjects(): Promise<ObjectData[]> {
    const response = await fetch('https://api.restful-api.dev/objects');
  
    if (!response.ok) {
      throw new Error('Failed to fetch objects');
    }
  
    const data = await response.json();
  
    // Ensure each object is a plain object
    return data.map((item: any) => ({
      id: item.id, // Assuming 'id' is a key in the returned data
      name: item.name, // Assuming 'name' is also a key in the returned data
    }));
  }
  


  export const addObject = async (newObject: ObjectData): Promise<ObjectData> => {
  const response = await fetch('https://api.restful-api.dev/objects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObject),
  });

  // Check if the response is OK (status in the range 200-299)
  if (!response.ok) {
    const errorText = await response.text(); // Capture error details if provided
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  // Assuming the API returns an ObjectData object
  const data: ObjectData = await response.json();

  // Validate the response structure (optional, but good for safety)
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data structure returned from the API');
  }

  return data;
};

export const updateObject = async (id: string, updatedObject: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedObject);
  return response.data;
};

export const deleteObject = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
