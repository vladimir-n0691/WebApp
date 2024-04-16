import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Plan } from '../../common/types';

export interface EditPlanDialogProps {
    plan: Plan | undefined | null
    handleSave: (plan: Plan) => void
    handleClose: () => void
}

export default function EditPlanDialog(props: EditPlanDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [name, setName] = React.useState(props.plan ? props.plan.name : "NaN");
    const [url, setUrl] = React.useState(props.plan ? props.plan.url : "");
    const [description, setDescription] = React.useState(props.plan ? props.plan.description : "");

    return (
        <Dialog
            id={props.plan?.id.toString()}
            fullScreen={fullScreen}
            open={props.plan != null}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {`Edit plan ${props.plan?.name}`}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="url"
                    name="url"
                    label="URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button onClick={() => props.handleSave({...props.plan!, name: name!, url: url!, description: description!})} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
