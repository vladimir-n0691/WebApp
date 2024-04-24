import React, { useEffect, useLayoutEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import { Add, Bluetooth, Delete, Edit, PinDrop } from "@mui/icons-material";
import { destroyFloorplan, selectCurrentPosition, setOnGetCoordsClickCallback } from "../../../common/fp";
import DotRing from "../../../common/DotRing";
import { Beacon, Plan } from "../../../../common/types";
import BeaconsApi from "../../../../api/BeaconsApi";
import EditBeaconDialog from "./EditBeaconDialog";
import Button from "@mui/material/Button";
import Helper from "../../../../common/Helper";

export interface BeaconsProps {
    plan: Plan
}

export const Beacons = (props: BeaconsProps) => {
    console.log("Rendering Beacons");
    console.log(props.plan);

    const [showCursor, setShowCursor] = useState(false);
    const [beacons, setBeacons] = useState<Beacon[]>([]);
    const [editBeacon, setEditBeacon] = useState<Beacon | null>(null);

    useEffect(() => {
        BeaconsApi.getBeacons(props.plan.id).then((p) => setBeacons(p))
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
            }
        }

    }, []);

    const handleAddBeacon = () => {
        setShowCursor(true);
        setOnGetCoordsClickCallback((e: any) => {
            setShowCursor(false);
            setOnGetCoordsClickCallback(null)
            selectCurrentPosition(e.x, e.y - 2, e.z)

            var uuid = Helper.generateGUID();
            var major = 1
            var minor = 1

            if (beacons.length > 0) {
                uuid = beacons[beacons.length - 1].uuid
                major = beacons[beacons.length - 1].major
                minor = beacons[beacons.length - 1].minor + 1
            }

            setEditBeacon({ id: -1, name: `Beacon_${beacons.length + 1}`, description: "", uuid: uuid, major: major, minor: minor, x: e.x, y: e.y - 2, z: e.z })
        })
    }

    const handleDeleteBeacon = async (b: Beacon) => {
        if (window.confirm(`Delete beacon ${b.name}?`)) {
            await BeaconsApi.deleteBeacon(b.id)
            setBeacons(await BeaconsApi.getBeacons(props.plan.id))
        }
    }

    const handleEditBeaconLocation = (b: Beacon) => {
        setShowCursor(true);
        setOnGetCoordsClickCallback((e: any) => {
            setShowCursor(false);
            setOnGetCoordsClickCallback(null)
            selectCurrentPosition(e.x, e.y - 2, e.z)
            setEditBeacon({ ...b, x: e.x, y: e.y - 2, z: e.z })
        })
    }

    const handleSelectBeacon = (b: Beacon) => selectCurrentPosition(b.x, b.y)

    const handleSave = async (b: Beacon) => {
        setEditBeacon(null);
        await BeaconsApi.editBeacon(b)
        setBeacons(await BeaconsApi.getBeacons(props.plan.id))
    }

    const handleClose = () => setEditBeacon(null)

    return (
        <div id="beacons-container" style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
            {editBeacon && <EditBeaconDialog beacon={editBeacon} handleSave={handleSave} handleClose={handleClose} />}
            {showCursor && <DotRing />}
            <div style={{ display: 'flex', height: "100%", width: 440, marginRight: -1, border: "1px solid rgba(0, 0, 0, 0.12)" }} >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    <Button variant="outlined" startIcon={<Add />} onClick={handleAddBeacon}>
                                        Add beacon
                                    </Button>
                                </TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {beacons
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="left">
                                                <div style={{ display: 'flex', flexDirection: 'row' }} onClick={() => handleSelectBeacon(row)}>
                                                    <Bluetooth style={{ alignSelf: "center", borderRadius: "50%", width: 54, height: 54, padding: 8, backgroundColor: "rgba(0, 0, 0, 0.04)" }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 12 }}>
                                                        <div>{row.name}</div>
                                                        <div style={{ whiteSpace: "nowrap", maxWidth: "140px", overflow: 'hidden' }}>{`UUID: ${row.uuid}`}</div>
                                                        <div>{`Major: ${row.major} Minor: ${row.minor}`}</div>
                                                    </div>

                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => handleEditBeaconLocation(row)}
                                                >
                                                    <PinDrop />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => setEditBeacon(row)}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => handleDeleteBeacon(row)}
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
