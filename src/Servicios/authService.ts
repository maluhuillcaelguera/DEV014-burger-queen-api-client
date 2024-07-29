import axios from 'axios';

const API_URL = 'https://burger-queen-api-mock-production-2cd9.up.railway.app/login'; // URL corregida

export interface User {
  email: string;
  name: string;
  
  role: 'waiter' | 'chef'; 

}

export interface LoginResponse {
    accessToken: string;
  user: User; 
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(API_URL, { email, password });
  return response.data;
};

const PRODUCTS_API_URL = 'https://burger-queen-api-mock-production-2cd9.up.railway.app/products';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  const response = await axios.get(PRODUCTS_API_URL, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  });

  return response.data;
};


export interface OrderItem {
  id: number;
  qty: number;
}

export interface Order {
  id?: number;
  userId: number;
  client: string;
  products: OrderItem[];
  status: 'pending' | 'delivering' | 'delivered';
  dateEntry: string;
  dateProcessed?: string;
}

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }
  return { Authorization: `Bearer ${token}` };
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createOrder = async (order: Omit<Order, 'id' | 'dateEntry'>): Promise<Order> => {
  const response = await axios.post(`${API_URL}/orders`, order, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateOrder = async (id: number, order: Partial<Order>): Promise<Order> => {
  const response = await axios.patch(`${API_URL}/orders/${id}`, order, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/orders/${id}`, {
    headers: getAuthHeader(),
  });
};