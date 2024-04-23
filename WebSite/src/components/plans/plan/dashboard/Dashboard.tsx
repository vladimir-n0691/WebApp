import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DashboardChart from './DashboardChart';
import DashboardTotal from './DashboardTotal';
import DashboardChart1 from './DashboardChart1';
import DashboardTotal1 from './DashboardTotal1';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Dashboard() {
    return (
        <Container maxWidth={false} sx={{ mt: 1, mb: 1, flexGrow: 1, overflow: 'hidden' }}>
            <Grid container spacing={3}>

                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <DashboardChart />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <DashboardTotal />
                    </Paper>
                </Grid>

                <Grid item xs={12}  md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',  height: 240, }}>
                        <DashboardChart1 />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <DashboardTotal1 />
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>

    );
}