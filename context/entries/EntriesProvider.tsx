import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
  entries: Entry[];
};

const EntriesInitialState: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pendientes: Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'In-progress: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, corporis!',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: 'Finished: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium beatae assumenda itaque blanditiis ut. Dolores!',
      status: 'finished',
      createdAt: Date.now() - 100000,
    }
  ],
};



export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, EntriesInitialState);


  const addNewEntry = (description: string) => {

    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      status: 'pending',
      createdAt: Date.now(),
    }

    dispatch({
      type: '[Entry] Add-Entry',
      payload: newEntry,
    });
  }

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: '[Entry] Update-Entry',
      payload: entry,
    });
  }

  return (

    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry,
    }}>
      {children}
    </EntriesContext.Provider>
  );

};
