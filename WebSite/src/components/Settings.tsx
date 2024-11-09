import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from "../common/constants";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UsersApi from "../api/UsersApi";
import Button from "@mui/material/Button";
import { Save } from "@mui/icons-material";
import { User } from "../common/types";

export const Settings = () => {
  console.log("Rendering Settings")

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");

  const [editUser, setEditUser] = React.useState<User | null>(null);

  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  const userId = localStorage.getItem(USER_ID_KEY)

  const update = () => {
    if (userId != null && editUser  != null) {
      let updateUser = {
        id: Number(userId),
        userRole: editUser.userRole,
        firstName: firstName,
        lastName: lastName,
        company: company,
        email: email,
        login: login,
        password: pass
      }

      UsersApi.update(updateUser).then(result => {
        if (result) {
        }
        else {
          window.alert("ERROR")
        }
      })
    }
  }

  useEffect(() => {
    if (userId != null) {
      UsersApi.getById(Number(userId)).then(u => {
        if (u != null) {
          setFirstName(u.firstName)
          setlastName(u.lastName)
          setCompany(u.company)
          setEmail(u.email)
          setLogin(u.login)
          setPass(u.password)
          setEditUser(u)
        }
      })
    }

  }, []);

  console.log(localStorage.getItem(ACCESS_TOKEN_KEY))

  return (
    <Container maxWidth={false} sx={{ mt: 1, mb: 1, flexGrow: 1 }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          width: "600px"
        }}
      >
        <Typography component="p" variant="h5" style={{ marginBottom: "30px" }}>
          User settings
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={firstName}
              autoFocus
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setlastName(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={company}
              onChange={(event) => setCompany(event.target.value)}
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
              value={login}
              onChange={(event) => setLogin(event.target.value)}
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
              onChange={(event) => setPass(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<Save />} onClick={update}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
