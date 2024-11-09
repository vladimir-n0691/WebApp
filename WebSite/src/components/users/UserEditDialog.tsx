import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { User } from '../../common/types';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export interface UserEditDialogProps {
  user: User
  handleSave: (user: User) => void
  handleClose: () => void
}

export default function UserEditDialog(props: UserEditDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [editUser, setEditUser] = React.useState<User>({...props.user});

  return (
    <Dialog
      id={props.user?.id.toString()}
      fullScreen={fullScreen}
      open={props.user != null}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {`Edit plan ${props.user?.login}`}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={editUser.firstName}
              onChange={(event) => setEditUser({...editUser, firstName: event.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"

              value={editUser.lastName}
              onChange={(event) => setEditUser({...editUser, lastName: event.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"

              value={editUser.email}
              onChange={(event) => setEditUser({...editUser, email: event.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="company"
              label="Company"
              name="company"
              autoComplete="company"

              value={editUser.company}
              onChange={(event) => setEditUser({...editUser, company: event.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"

              value={editUser.login}
              onChange={(event) => setEditUser({...editUser, login: event.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"

              value={editUser.password}
              onChange={(event) => setEditUser({...editUser, password: event.target.value})}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
          Cancel
        </Button>
        <Button onClick={() => props.handleSave(editUser)} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>)
}