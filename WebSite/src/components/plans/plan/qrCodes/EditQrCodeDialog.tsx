import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Plan, QrCode } from '../../../../common/types';
import QrCodesApi from '../../../../api/QrCodesApi';
import Helper from '../../../../common/Helper';

export interface EditQrCodeDialogProps {
    plan: Plan
    qrCode: QrCode
    handleSave: (qrCode: QrCode) => void
    handleClose: () => void
}

export default function EditQrCodeDialog(props: EditQrCodeDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [qrCode, setQrCode] = React.useState(props.qrCode);

    const getUrl = (x: number, y: number, z: string | null) => Helper.getBlueDotUrl(props.plan.url, x, y, z)
    
    return (
        <Dialog
            id={props.qrCode?.id.toString()}
            fullScreen={fullScreen}
            open={props.qrCode != null}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {`Edit QR code ${props.qrCode?.name}`}
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
                    value={qrCode.name}
                    onChange={(event) => setQrCode({ ...qrCode, name: event.target.value })}
                />

                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={qrCode.description}
                    onChange={(event) => setQrCode({ ...qrCode, description: event.target.value })}
                />

                <TextField
                    required
                    margin="dense"
                    id="x"
                    name="x"
                    label="X"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={qrCode.x}
                    onChange={(event) => setQrCode({ ...qrCode, x: Number(event.target.value), url: getUrl(Number(event.target.value), qrCode.y, qrCode.z) })}
                />

                <TextField
                    required
                    margin="dense"
                    id="y"
                    name="y"
                    label="Y"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={qrCode.y}
                    onChange={(event) => setQrCode({ ...qrCode, y: Number(event.target.value), url: getUrl(qrCode.x, Number(event.target.value), qrCode.z) })}
                />

                <TextField
                    margin="dense"
                    id="z"
                    name="z"
                    label="Level"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={qrCode.z}
                    onChange={(event) => setQrCode({ ...qrCode, z: event.target.value, url: getUrl(qrCode.x, qrCode.y, event.target.value) })}
                />

                <TextField
                    required
                    margin="dense"
                    id="url"
                    name="url"
                    label="URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={qrCode.url}
                />

                <img style={{ alignSelf: "center", width: 200, height: 200, display: "flex", margin: "auto" }} src={"data:image/jpeg;base64," + QrCodesApi.imageBase64} />

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button onClick={() => props.handleSave(qrCode)} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
