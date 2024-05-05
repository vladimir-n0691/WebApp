import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ContentCopy, Save } from "@mui/icons-material";
import { Plan } from "../../../common/types";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";

export interface IntegrationProps {
    plan: Plan
}

export const Integration = (props: IntegrationProps) => {
    console.log("Rendering Integration")

    const activePlan = useSelector((state: AppState) => state.common.activePlan);
    useEffect(() => {
        console.log("activePlan was changed: ")
        console.log(activePlan)
    }, [activePlan]);

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
                        value={activePlan?.apiToken}
                        autoFocus
                    />

                    <Button style={{alignSelf: "center", marginLeft: 10}} startIcon={<ContentCopy />} onClick={() => {
                        activePlan?.apiToken && navigator.clipboard.writeText(activePlan?.apiToken)
                    }}>
                    </Button>

                </div>



            </Paper>
        </Container>
    );
};
