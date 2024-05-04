import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ContentCopy, Save } from "@mui/icons-material";
import { Plan } from "../../../common/types";

export interface IntegrationProps {
    plan: Plan
}

export const Integration = (props: IntegrationProps) => {
    console.log("Rendering Integration")

    const [apiKey, setApiKey] = React.useState("");
    const [token, setToken] = React.useState("");

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
                    Integration settings
                </Typography>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                        autoComplete="given-name"
                        name="apiKey"
                        required
                        fullWidth
                        id="apiKey"
                        label="Api key"
                        value={apiKey}
                        autoFocus
                    />

                    <Button style={{alignSelf: "center", margin: 20}} startIcon={<ContentCopy />} onClick={() => {}}>
                    </Button>

                </div>



            </Paper>
        </Container>
    );
};
