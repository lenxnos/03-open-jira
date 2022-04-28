import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import { CardActionArea, Card, Typography, CardContent, CardActions } from "@mui/material";
import { Entry } from "../../interfaces";
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';
interface EntryCardProps {
  entry: Entry;
}

export const EntryCard: FC<EntryCardProps> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', entry._id);
    startDragging();
  }

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging();
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onClick={onClick}
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
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
};