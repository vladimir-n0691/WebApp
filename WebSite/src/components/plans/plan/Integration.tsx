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
import PlansApi from "../../../api/PlansApi";

export interface IntegrationProps {
    plan: Plan
}

export const Integration = (props: IntegrationProps) => {
    console.log("Rendering Integration")

    const activePlan = useSelector((state: AppState) => state.common.activePlan);
    const [plan, setPlan] = React.useState(activePlan);

    useEffect(() => {
        console.log("activePlan was changed: ")
        console.log(activePlan)
    }, [activePlan]);


    const update = async () => {
        if (plan != null) {
            await PlansApi.updatePlan(plan)
        }
    }

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

                <Grid container spacing={2}>


                    <Grid item xs={12}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <TextField
                                autoComplete="given-name"
                                name="apiKey"
                                required
                                fullWidth
                                id="apiKey"
                                label="Api key"
                                value={plan?.apiToken}
                                autoFocus
                            />

                            <Button style={{ alignSelf: "center", marginLeft: 10 }} startIcon={<ContentCopy />} onClick={() => {
                                plan?.apiToken && navigator.clipboard.writeText(plan?.apiToken)
                            }}>
                            </Button>

                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="scaleX"
                            required
                            fullWidth
                            id="scaleX"
                            label="Scale X"
                            type="number"
                            value={plan?.scaleX}
                            onChange={(event) => plan && setPlan({ ...plan, scaleX: Number(event.target.value) })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="scaleY"
                            label="Scale Y"
                            name="scaleY"
                            type="number"
                            value={plan?.scaleY}
                            onChange={(event) => plan && setPlan({ ...plan, scaleY: Number(event.target.value) })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="scaleZ"
                            label="Scale Z"
                            name="scaleZ"
                            type="number"
                            value={plan?.scaleZ}
                            onChange={(event) => plan && setPlan({ ...plan, scaleZ: Number(event.target.value) })}
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
