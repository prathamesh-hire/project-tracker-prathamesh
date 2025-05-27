// src/types/project.ts
export interface Project {
  id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  description: string | null;   
  notes: string | null;         
  due_date: string | null;
  created_at: string;
}
