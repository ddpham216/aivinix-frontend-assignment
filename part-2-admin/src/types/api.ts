export interface PaginatedMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiValidationError {
  message: string;
  errors?: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}
