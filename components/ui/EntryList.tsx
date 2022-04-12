import { FC, useContext, useMemo, DragEvent } from 'react';
import { Paper, List } from "@mui/material";
import { EntryCard } from './';
import { EntriesStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface EntryListProps {
  status: EntriesStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {

 const { entries, updateEntry } =  useContext(EntriesContext);
 const { isDragging, endDragging } = useContext(UIContext);

 const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

 const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
 }

 const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const entryId = e.dataTransfer.getData('text/plain');
    const entry = entries.find(entry => entry._id === entryId)!;
    updateEntry({ ...entry, status });
    endDragging();
 }

  return (
    // TODO: Aqui haremos drop
    <div onDragOver={ allowDrop } onDrop={onDropEntry} className={isDragging ? styles.dragging : ''}>
      <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 3px' }}>
        {/* TODO: cambiara dependiendo si esto haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.5 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  );
}
