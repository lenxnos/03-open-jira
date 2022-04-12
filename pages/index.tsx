import type { NextPage } from 'next';
import { Card, CardHeader, CardContent, Grid } from '@mui/material';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
              <NewEntry />
              {/* Agregar una nueva entrada */}
              {/* Listar las entradas */}
            <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            <EntryList status="in-progress"/>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage;
