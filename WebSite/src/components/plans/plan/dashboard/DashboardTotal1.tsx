import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function DashboardTotal1() {
  return (
    <React.Fragment>
      <Title>All time</Title>

      <Typography component="p" variant="subtitle1" style={{ marginTop: 10, marginLeft: 6 }}>
        Android: 10000 sessions
      </Typography>

      <Typography component="p" variant="subtitle1" style={{ marginTop: 10, marginLeft: 6 }}>
        iOS: 12500 sessions
      </Typography>

      <Typography component="p" variant="h5" style={{ marginTop: "auto", marginLeft: 6 }}>
        Total: 22500 sessions
      </Typography>
    </React.Fragment>
  );
}