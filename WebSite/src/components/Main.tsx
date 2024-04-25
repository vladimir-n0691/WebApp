import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import PlansTable from './plans/PlansTable';
import { Route, Routes, useParams } from 'react-router-dom';
import { Settings as SettingsView } from './Settings';
import Plan from './plans/plan/Plan';
import { useEffect } from 'react';
import PlansApi from '../api/PlansApi';
import { Plan as PlanType } from '../common/types';
import { MainToolbar } from './MainToolbar';

const defaultTheme = createTheme();

export default function Main() {
  const [currentPlan, setCurrentPlan] = React.useState<PlanType | null>(null);

  const RenderPlan = () => {
    const { id } = useParams();
    const [plan, setPlan] = React.useState<PlanType | null>(null)

    useEffect(() => {
      const fetchPlan = async () => {
        let pln = await PlansApi.getPlanById(Number(id))
        setPlan(pln)
        setCurrentPlan(pln)
      }
      fetchPlan()
    }, [id]);

    return (plan ? <Plan plan={plan} /> : <></>)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <MainToolbar plan={currentPlan} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',

            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Toolbar />

          <Routes>
            <Route path="/" element={
              <Container maxWidth={false} sx={{ mt: 1, mb: 1, flexGrow: 1 }}>
                <PlansTable />
              </Container>
            } />
            <Route path="/plans/:id" element={<RenderPlan />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}