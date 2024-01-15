//paginated-response.model.ts Inhalt: 

export interface PaginatedResponse<T> {
    totalResults: number;
    pageSize: number;
    currentPage: number;
    content: T[];
}
//---------------------------------------------------