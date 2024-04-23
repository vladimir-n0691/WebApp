import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function DashboardTotal() {
  return (
    <React.Fragment>
      <Title>15 March, 2019</Title>

      <Typography component="p" variant="subtitle1" style={{ marginTop: 10, marginLeft: 6 }}>
        Android: 1000 sessions
      </Typography>

      <Typography component="p" variant="subtitle1" style={{ marginTop: 10, marginLeft: 6 }}>
        iOS: 1250 sessions
      </Typography>

      <Typography component="p" variant="h5" style={{ marginTop: "auto", marginLeft: 6 }}>
        Total: 2250 sessions
      </Typography>
    </React.Fragment>
  );
}