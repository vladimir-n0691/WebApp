import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN_KEY } from "../common/constants";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UsersApi from "../api/UsersApi";
import Button from "@mui/material/Button";
import { Save } from "@mui/icons-material";

export const Settings = () => {
  console.log("Rendering Settings")

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!!token) {
      UsersApi.getUser(token).then(u => {
        if (u != null) {
          setFirstName(u.firstName)
          setlastName(u.lastName)
          setCompany(u.company)
          setEmail(u.email)
          setPass(u.password)
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<Save />} onClick={() => {

            }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
