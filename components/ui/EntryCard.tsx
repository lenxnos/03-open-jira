import { FC, DragEvent, useContext } from 'react';
import { CardActionArea, Card, Typography, CardContent, CardActions } from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from '../../context/ui';


interface EntryCardProps {
  entry: Entry;
}

export const EntryCard: FC<EntryCardProps> = ({ entry }: EntryCardProps) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', entry._id);
    startDragging();
  }

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging();
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={ onDragEnd }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant="body2">
            Hace 30 minutos
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
};