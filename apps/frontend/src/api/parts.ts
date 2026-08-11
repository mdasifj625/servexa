import axios from 'axios';

export interface Part {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartDto {
  name: string;
  description?: string;
  price: number;
  stock?: number;
}

const API_URL = 'http://localhost:3000/parts';

export const getParts = async (): Promise<Part[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPart = async (id: string): Promise<Part> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPart = async (data: CreatePartDto): Promise<Part> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updatePart = async (id: string, data: Partial<CreatePartDto>): Promise<Part> => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deletePart = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
