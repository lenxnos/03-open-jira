import { useState, ChangeEvent, useMemo, useContext } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';  
import { Layout } from '../../components/layouts';
import { capitalize, Button, Card, CardActions, CardHeader, FormControl, FormLabel, FormControlLabel, IconButton, Radio, Grid, CardContent, TextField, RadioGroup } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EntriesStatus, Entry } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils'

const validStatus: EntriesStatus[] = ['pending', 'in-progress', 'finished'];

interface EntryPageProps {
  entry: Entry;
}

const EntryPage: NextPage<EntryPageProps> = ({ entry }) => {
  const router = useRouter();
  const { updateEntry, deleteEntry } =  useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntriesStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatus(value as EntriesStatus);
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    updateEntry({ ...entry, description: inputValue, status }, true);
    router.push('/');
  }

  const onDelete = () => {
    try {
      deleteEntry(entry);
      router.push('/');
    } catch (error) {
      console.log('Error deleting entry', { error });
    }
  }

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada ${inputValue}`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={handleChange}
                helperText={isNotValid && "Escribe aquí tu nueva entrada"}
                error={isNotValid}
              />

              {/* Radio */}
              <FormControl>
                <FormLabel>
                  Estado
                </FormLabel>
                <RadioGroup row onChange={onStatusChange} value={status}>
                  {validStatus.map(status => (
                    <FormControlLabel
                      control={<Radio />}
                      key={status}
                      value={status}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton onClick={onDelete} sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };
  const entry = await dbEntries.getEntriesById(id);
  
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry,
    }
  }
}

export default EntryPage;