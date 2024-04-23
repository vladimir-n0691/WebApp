import React, { useEffect, useLayoutEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import { Add, Bluetooth, Delete, Edit, PinDrop } from "@mui/icons-material";
import DotRing from "../../../common/DotRing";
import { destroyFloorplan, selectCurrentPosition, setOnGetCoordsClickCallback } from "../../../common/fp";
import { Plan, QrCode } from "../../../../common/types";
import QrCodesApi from "../../../../api/QrCodesApi";
import Helper from "../../../../common/Helper";
import Button from "@mui/material/Button";
import EditQrCodeDialog from "./EditQrCodeDialog";

export interface QrCodesProps {
    plan: Plan
}

export const QrCodes = (props: QrCodesProps) => {
    console.log("Rendering QrCodes");

    const [showCursor, setShowCursor] = useState(false);
    const [qrCodes, setQrCodes] = React.useState<QrCode[]>([]);
    const [editQrCode, setEditQrCode] = useState<QrCode | null>(null);

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
                console.log("window.__efpBaseUrl: " + window.__efpBaseUrl);
            }
            init();  
            `
            document.body.appendChild(script);

        }
        document.body.appendChild(expoFpScript);

        return () => {

            destroyFloorplan();

            document.body.removeChild(script)
            document.body.removeChild(expoFpScript)

            let floorplan = document.getElementById("floorplan")
            if (floorplan != null) {
                floorplan.innerHTML = ""
                console.log("Rendering Beacons -------------------------------------------------------------");
            }
        }

    }, []);

    const handleAddQrCode = () => {
        setShowCursor(true);
        setOnGetCoordsClickCallback((e: any) => {
            setShowCursor(false);
            setOnGetCoordsClickCallback(null)
            selectCurrentPosition(e.x, e.y - 2, e.z)

            let url = Helper.getBlueDotUrl(props.plan.url, e.x, e.y - 2, e.z)
            setEditQrCode({ id: -1, name: `QR_${qrCodes.length + 1}`, description: "", url: url, imageBase64: "", x: e.x, y: e.y - 2, z: e.z })
        })
    }

    const handleSave = async (qr: QrCode) => {
        setEditQrCode(null);
        //await BeaconsApi.editBeacon(b)
        //await BeaconsApi.getBeacons(props.plan.id).then((p) => setBeacons(p))
    }

    const handleClose = () => setEditQrCode(null)

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
            {editQrCode && <EditQrCodeDialog plan={props.plan} qrCode={editQrCode} handleSave={handleSave} handleClose={handleClose} />}
            {showCursor && <DotRing />}
            <div style={{ display: 'flex', height: "100%", width: 440, marginRight: -1, border: "1px solid rgba(0, 0, 0, 0.12)" }} >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    <Button variant="outlined" startIcon={<Add />} onClick={handleAddQrCode}>
                                        Create QR
                                    </Button>
                                </TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {qrCodes
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="left">
                                                <div style={{ display: 'flex', flexDirection: 'row' }} onClick={() => selectCurrentPosition(row.x, row.y)}>
                                                    <img style={{ alignSelf: "center", width: 60, height: 60 }} src={"data:image/jpeg;base64," + row.imageBase64} />
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignSelf: "center" }}>
                                                        <div>{row.name}</div>
                                                        <div>{`x: ${row.x}, y: ${row.y}, z: ${row.z}`}</div>
                                                    </div>

                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                //onClick={() => navigate( `/plans/${row.id}`)}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                //onClick={() => navigate( `/plans/${row.id}`)}
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
