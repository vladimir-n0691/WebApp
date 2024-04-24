import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Booth, Plan, QrCode } from '../../../../common/types';
import QrCodesApi from '../../../../api/QrCodesApi';
import Helper from '../../../../common/Helper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import QRCode from 'qrcode.react';
import { Download } from '@mui/icons-material';
import { downloadQrCode } from '../../../common/functions';

export interface BoothQrCodeDialogProps {
    plan: Plan
    booth: Booth
    handleClose: () => void
}

export default function BoothQrCodeDialog(props: BoothQrCodeDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const url = `${props.plan.url}?${props.booth.name}`

    //const [qrCode, setQrCode] = React.useState(props.qrCode);
    //const getUrl = (x: number, y: number, z: string | null) => Helper.getBlueDotUrl(props.plan.url, x, y, z)

    return (
        <Dialog
            id={props.booth.id.toString()}
            fullScreen={fullScreen}
            open
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {`QR code for booth: ${props.booth.name}`}
            </DialogTitle>
            <DialogContent>
                {/*<img style={{ alignSelf: "center", width: 300, height: 300, display: "flex", margin: "auto" }} src={"data:image/jpeg;base64," + QrCodesApi.imageBase64} />*/}

                <QRCode id={`DialogBoothQrCode_${props.booth.id}`} style={{ alignSelf: "center", display: "flex", margin: "auto" }} value={url} level='M' />
            </DialogContent>
            <DialogActions>
                <Button startIcon={<Download />} onClick={() => downloadQrCode(`DialogBoothQrCode_${props.booth.id}`, props.booth.name)}>
                    Download
                </Button>
                <Button style={{ marginLeft: 'auto' }} onClick={props.handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
