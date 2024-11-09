import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Route, Routes, useParams } from 'react-router-dom';
import { Settings as SettingsView } from './Settings';
import { MainToolbar } from './MainToolbar';
import { Logout } from '@mui/icons-material';
import Users from './users/Users';

const defaultTheme = createTheme();

export default function Main() {
  console.log("render Main")

  /*if (2 > 1) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%'
      }}>
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0 20px', height: '60px'
        }}>
          <div>
            <a>MAIN PAGE</a>
          </div>
          <Logout style={{ marginLeft: 'auto' }} />
        </div>
        <div style={{
          display: 'flex', flexDirection: 'row', flexGrow: 1, margin: '20px'
        }}>
        </div>
      </div>)
  }*/


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <MainToolbar />

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

              </Container>
            } />

            <Route path="/users" element={
              <Container maxWidth={false} sx={{ mt: 1, mb: 1, flexGrow: 1 }}>
                <Users />
              </Container>
            } />

            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}