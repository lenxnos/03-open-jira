
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
 entries: [
  {
    description: 'Pendientes: Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    status: 'pending',
    createdAt: Date.now(),
  },
  {
    description: 'In-progress: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, corporis!',
    status: 'in-progress',
    createdAt: Date.now() - 1000000,
  },
  {
    description: 'Finished: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium beatae assumenda itaque blanditiis ut. Dolores!',
    status: 'finished',
    createdAt: Date.now() - 100000,
  }
 ] 
}