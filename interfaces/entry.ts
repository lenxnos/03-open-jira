export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntriesStatus;
} 

export type EntriesStatus = 'pending' | 'in-progress' | 'finished';