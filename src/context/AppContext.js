import { createContext } from 'react';

export const AppContext = createContext();

export const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/api'
    : 'https://spread-m5ja.onrender.com/api';
