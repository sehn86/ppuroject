export type UUID = string;

export interface TaskDTO {
  id: UUID;
  title: string;
  description?: string;
  projectId?: UUID;
  dueDate?: string;
  completed: boolean;
}

export interface ProjectDTO {
  id: UUID;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
