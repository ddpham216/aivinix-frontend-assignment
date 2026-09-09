export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  createdAt: string;
}

export type ProductPayload = {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
};

export interface ProductFilterParams {
  search?: string;
  category?: string;
  status?: ProductStatus | '';
  sortBy?: 'name' | 'category' | 'price' | 'stock' | 'status' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
