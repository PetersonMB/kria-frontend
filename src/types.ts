
export interface Repositorio {
  id: number;
  nome: string;
  descricao: string;
  linguagem: string;
  ultimaAtualizacao: string; 
  donoDoRepositorio: string;
  favorito: boolean;
  contribuidores: string[]; 
  gitUrl: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number; 
  pageNumber: number; 
  pageSize: number; 
  totalPages: number; 
}