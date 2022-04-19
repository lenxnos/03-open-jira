import { FC, useReducer, useEffect, useCallback } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface EntriesState {
  entries: Entry[];
};

const EntriesInitialState: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, EntriesInitialState);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({
      type: '[Entry] Add-Entry',
      payload: data,
    });
  }
 
  const updateEntry = async ({ _id, status, description }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
      dispatch({
        type: '[Entry] Update-Entry',
        payload: data,
      });
    } catch (error) {
      console.log('Error updating entry', { error });
    }
  }

  const refreshEntries = useCallback(async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Refresh-Data', payload: data });
  }, []);

  useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);

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
