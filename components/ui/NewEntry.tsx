import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTouch, setTouch] = useState(false);
  const { isAddingEntry, setIsAddingEntry }  = useContext(UIContext);
  const { addNewEntry } = useContext(EntriesContext);

  const handleAdd = () => {
    setIsAddingEntry(true);
  }

  const handleCancel = () => {
    setIsAddingEntry(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouch(false);
    setInputValue('');
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 2 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && isTouch && "Escribe aquí tu nueva entrada"}
            error={inputValue.length <= 0 && isTouch}
            value={inputValue}
            onChange={handleChange}
            onBlur={() => setTouch(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              onClick={handleCancel}
            >Cancelar</Button>

            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >Guardar</Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlinedIcon />}
          variant="outlined"
          fullWidth
          onClick={handleAdd}
        >
          Nueva entrada
        </Button>
      )}
    </Box>
  )
}
