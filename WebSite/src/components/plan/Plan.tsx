import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Place } from '@mui/icons-material';
import Container from '@mui/material/Container';
import PlansTable from '../PlansTable';
import { useEffect, useLayoutEffect } from 'react';
import { Beacons } from './beacons/Beacons';
import Dashboard from './dashboard/Dashboard';

export default function Plan() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon position tabs example"
                style={{ minHeight: 60, maxHeight: 62 }}
            >
                <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
                <Tab icon={<Place />} iconPosition="start" label="Beacons" />
                <Tab icon={<BarChartIcon />} iconPosition="start" label="Reports" />
                <Tab icon={<LayersIcon />} iconPosition="start" label="Integrations" />
            </Tabs>
            <Container maxWidth={false} style={{ paddingLeft: 18, overflow: "hidden" }} sx={{ mt: 1, mb: 1 }}>
                {(() => {
                    switch (value) {
                        case 0:
                            return <Dashboard />
                        case 1:
                            return <Beacons />
                        default:
                            return null
                    }
                })()}
            </Container>
        </>
    );
}