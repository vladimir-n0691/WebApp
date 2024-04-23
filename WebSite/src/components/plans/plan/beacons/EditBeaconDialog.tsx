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
import { Beacon } from '../../../../common/types';

export interface EditBeaconDialogProps {
    beacon: Beacon
    handleSave: (beacon: Beacon) => void
    handleClose: () => void
}

export default function EditBeaconDialog(props: EditBeaconDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [beacon, setBeacon] = React.useState(props.beacon);

    return (
        <Dialog
            id={props.beacon?.id.toString()}
            fullScreen={fullScreen}
            open={props.beacon != null}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {`Edit beacon ${props.beacon?.name}`}
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
                    value={beacon.name}
                    onChange={(event) => setBeacon({ ...beacon, name: event.target.value })}
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
                    value={beacon.description}
                    onChange={(event) => setBeacon({ ...beacon, description: event.target.value })}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="uuid"
                    name="uuid"
                    label="UUID"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={beacon.uuid}
                    onChange={(event) => setBeacon({ ...beacon, uuid: event.target.value })}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="major"
                    name="major"
                    label="Major"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={beacon.major}
                    onChange={(event) => setBeacon({ ...beacon, major: Number(event.target.value) })}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="minor"
                    name="minor"
                    label="Minor"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={beacon.minor}
                    onChange={(event) => setBeacon({ ...beacon, minor: Number(event.target.value) })}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="x"
                    name="x"
                    label="X"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={beacon.x}
                    onChange={(event) => setBeacon({ ...beacon, x: Number(event.target.value) })}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="y"
                    name="y"
                    label="Y"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={beacon.y}
                    onChange={(event) => setBeacon({ ...beacon, y: Number(event.target.value) })}
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="z"
                    name="z"
                    label="Level"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={beacon.z}
                    onChange={(event) => setBeacon({ ...beacon, z: event.target.value })}
                />

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button onClick={() => props.handleSave(beacon)} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
