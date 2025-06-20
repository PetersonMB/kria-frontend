import axios from 'axios';
import type { Repositorio, PagedResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', 
  },  
});
/**
 * @param _pageNumber O número da página desejada (padrão: 1).
 * @param _pageSize O número de itens por página (padrão: 10).
 * @returns Um Promise que resolve para um PagedResult contendo os Repositorios.
 */
export const getAllPublicRepositorios = async (_pageNumber: number = 1, _pageSize: number = 10): Promise<PagedResult<Repositorio>> => {
  try {   
    const response = await api.get<PagedResult<Repositorio>>(`/repositorio?pageNumber=<span class="math-inline">\{pageNumber\}&pageSize\=</span>{pageSize}`);
    return response.data;
  } catch (error) {
    console.error("API Error: Erro ao buscar repositórios públicos", error);
    throw error; 
  }
};

/** 
 * @param owner 
 * @returns 
 */
export const getMyRepositorios = async (owner: string): Promise<Repositorio[]> => {
  try {
    const response = await api.get<Repositorio[]>(`/repositorio/myrepos/${owner}`);
    return response.data;
  } catch (error) {
    console.error(`API Error: Erro ao buscar repositórios para o proprietário ${owner}`, error);
    throw error;
  }
};

/** 
 * @param searchTerm 
 * @returns 
 */
export const searchRepositorios = async (searchTerm: string): Promise<Repositorio[]> => {
  try {   
    const response = await api.get<Repositorio[]>(`/repositorio/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error(`API Error: Erro ao buscar repositórios com o termo "${searchTerm}"`, error);
    throw error;
  }
};

/**
 * @param id 
 * @returns 
 */
export const getRepositorioById = async (id: number): Promise<Repositorio> => {
  try {
    const response = await api.get<Repositorio>(`/repositorio/${id}`);
    return response.data;
  } catch (error) {
    console.error(`API Error: Erro ao buscar detalhes do repositório com ID ${id}`, error);
    throw error;
  }
};

/** 
 * @param id 
 * @returns 
 */
export const toggleFavorite = async (id: number): Promise<Repositorio> => {
  try {    
    const response = await api.put<Repositorio>(`/repositorio/togglefavorite/${id}`);
    return response.data;
  } catch (error) {
    console.error(`API Error: Erro ao alternar favorito para o repositório com ID ${id}`, error);
    throw error;
  }
};

/**
 * @returns 
 */
export const getFavoriteRepositorios = async (): Promise<Repositorio[]> => {
  try {
    const response = await api.get<Repositorio[]>(`/repositorio/favorites`);
    return response.data;
  } catch (error) {
    console.error("API Error: Erro ao buscar repositórios favoritos", error);
    throw error;
  }
};