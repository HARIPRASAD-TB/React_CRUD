// lib/types.ts
export interface ObjectData {
    id?: string; // optional for new objects
    name: string;
    data: any; // Allow data to be null if it is not available
  }
  