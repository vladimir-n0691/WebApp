import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Add, Home, Logout, Settings } from '@mui/icons-material';
import PlansTable from './plans/PlansTable';
import Button from '@mui/material/Button';
import { Route, Routes, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Settings as SettingsView } from './Settings';
import { ACCESS_TOKEN_KEY } from '../common/constants';
import Plan from './plans/plan/Plan';
import { AppState } from '../store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import PlansApi from '../api/PlansApi';
import { Plan as PlanType } from '../common/types';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Main() {
  const navigate = useNavigate();

  /*const plan = useSelector((state: AppState) => state.common.plan);
  useEffect(() => {}, [plan])*/

  const [currentPlan, setCurrentPlan] = React.useState<PlanType | null>(null);
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => setOpen(!open)

  const handleLogoutClick = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    navigate("/signin")
  }
  const handleHomeClick = () => navigate("/")
  const handleSettingsClick = () => navigate("/settings")

  const mainListItems = (
    <React.Fragment>
      <ListItemButton onClick={handleHomeClick}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={handleSettingsClick}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </React.Fragment>
  );

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
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Routes>
              <Route path="/" element={<Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Plans
              </Typography>} />
              <Route path="/plans/:number" element={<Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {currentPlan?.name}
              </Typography>} />
              <Route path="/settings" element={<Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Settings
              </Typography>} />
            </Routes>
            <IconButton color="inherit" onClick={handleLogoutClick}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
          </List>
        </Drawer>
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