import React, { useEffect, useLayoutEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import { Add, Bluetooth, Delete, Download, Edit, PinDrop } from "@mui/icons-material";
import DotRing from "../../../common/DotRing";
import { destroyFloorplan, selectCurrentPosition, setOnBoothClickCallback, setOnFpConfiguredCallback, setOnGetCoordsClickCallback } from "../../../common/fp";
import { Booth, Plan, QrCode } from "../../../../common/types";
import QrCodesApi from "../../../../api/QrCodesApi";
import Helper from "../../../../common/Helper";
import Button from "@mui/material/Button";
import EditQrCodeDialog from "./EditQrCodeDialog";
import BoothQrCodeDialog from "./BoothQrCodeDialog";
import QRCode from "qrcode.react";
import Typography from "@mui/material/Typography";
import { downloadQrCode } from "../../../common/functions";

export interface QrCodesProps {
    plan: Plan
}

export const QrCodes = (props: QrCodesProps) => {
    console.log("Rendering QrCodes");

    const [showCursor, setShowCursor] = useState(false);
    const [qrCodes, setQrCodes] = React.useState<QrCode[]>([]);
    const [editQrCode, setEditQrCode] = useState<QrCode | null>(null);
    const [showBooth, setShowBooth] = useState<Booth | null>(null);

    const callShowBooth = (event: any) => event && event.target && setShowBooth({ id: event.target.id, name: event.target.name, externalId: event.target.externalId })

    useEffect(() => {
        QrCodesApi.getQrCodes(props.plan.id).then((p) => setQrCodes(p))
    }, []);


    useLayoutEffect(() => {

        let planUrl = props.plan.url
        let eventId = Helper.getSubDomain(planUrl)
        if (eventId == null) {
            return
        }

        console.log("eventId: " + eventId)

        let script = document.createElement('script');
        let expoFpScript = document.createElement('script');

        expoFpScript.src = planUrl.endsWith('/') ? `${planUrl}packages/master/expofp.js` : `${planUrl}/packages/master/expofp.js`

        expoFpScript.crossOrigin = "anonymous"
        expoFpScript.async = false
        expoFpScript.onload = () => {
            script.async = false
            script.innerText = `function init() { 
                window.floorplan=new ExpoFP.FloorPlan({element: document.querySelector("#floorplan"),eventId: "${eventId}",noOverlay: true});
            }
            init();  
            `
            document.body.appendChild(script);

            setOnBoothClickCallback(callShowBooth)
        }
        document.body.appendChild(expoFpScript);

        return () => {

            destroyFloorplan();

            document.body.removeChild(script)
            document.body.removeChild(expoFpScript)

            let floorplan = document.getElementById("floorplan")
            if (floorplan != null) {
                floorplan.innerHTML = ""
            }
        }

    }, []);

    const handleAddQrCode = () => {
        setOnBoothClickCallback(null)
        setShowCursor(true);
        setOnGetCoordsClickCallback((e: any) => {
            setShowCursor(false);
            setOnGetCoordsClickCallback(null)
            selectCurrentPosition(e.x, e.y - 2, e.z)

            let url = Helper.getBlueDotUrl(props.plan.url, e.x, e.y - 2, e.z)
            setEditQrCode({ id: -1, name: `QR_${qrCodes.length + 1}`, description: "", url: url, imageBase64: "", x: e.x, y: e.y - 2, z: e.z })
        })
    }

    const handleDeleteQrCode = async (b: QrCode) => {
        if (window.confirm(`Delete QR code ${b.name}?`)) {
            await QrCodesApi.deleteQrCode(b.id)
            setQrCodes(await QrCodesApi.getQrCodes(props.plan.id))
        }
    }

    const handleSave = async (qr: QrCode) => {
        setEditQrCode(null);
        await QrCodesApi.editQrCode(qr)
        setQrCodes(await QrCodesApi.getQrCodes(props.plan.id))
        setOnBoothClickCallback(callShowBooth)
    }

    const handleClose = () => {
        setEditQrCode(null);
        setOnBoothClickCallback(callShowBooth)
    }

    

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
            {editQrCode && <EditQrCodeDialog plan={props.plan} qrCode={editQrCode} handleSave={handleSave} handleClose={handleClose} />}
            {showBooth && <BoothQrCodeDialog plan={props.plan} booth={showBooth} handleClose={() => setShowBooth(null)} />}
            {showCursor && <DotRing />}
            <div style={{ display: 'flex', height: "100%", width: 440, marginRight: -1, border: "1px solid rgba(0, 0, 0, 0.12)" }} >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} >
                                    <Button variant="outlined" startIcon={<Add />} onClick={handleAddQrCode}>
                                        Create QR
                                    </Button>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {qrCodes
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="left">
                                                <div style={{ display: 'flex', flexDirection: 'row' }} onClick={() => selectCurrentPosition(row.x, row.y)}>
                                                    {/*<img style={{ alignSelf: "center", width: 60, height: 60 }} src={"data:image/jpeg;base64," + row.imageBase64} />*/}
                                                    <QRCode id={`QRCode_${row.id}`} style={{ alignSelf: "center", display: "flex", margin: "auto", width: 100, height: 100 }} value={row.url} level='M' />
                                                    <Typography style= {{ alignSelf: "center", display: "flex", marginLeft: 10}} variant="h6" color="text.secondary" align="center">
                                                        {row.name}
                                                    </Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => downloadQrCode(`QRCode_${row.id}`, row.name)}
                                                >
                                                    <Download />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => setEditQrCode(row)}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => handleDeleteQrCode(row)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div id="floorplan" style={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}>Loading...</div>
        </div>
    );
};
