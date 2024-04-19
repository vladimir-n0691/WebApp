import React, { useEffect, useLayoutEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import { Add, Bluetooth, Delete, Edit, PinDrop } from "@mui/icons-material";
import { selectCurrentPosition, setOnGetCoordsClickCallback } from "../../common/fp";
import DotRing from "../../common/DotRing";
import { Beacon } from "../../../common/types";
import BeaconsApi from "../../../api/BeaconsApi";
import EditBeaconDialog from "./EditBeaconDialog";
import Button from "@mui/material/Button";

export const Beacons = () => {
    const [showCursor, setShowCursor] = useState(false);
    const [beacons, setBeacons] = React.useState<Beacon[]>([]);
    const [editBeacon, setEditBeacon] = React.useState<Beacon | null>(null);

    useEffect(() => {
        BeaconsApi.getBeacons().then((p) => setBeacons(p))
    }, []);

    useLayoutEffect(() => {
        const script = document.createElement('script');
        const script1 = document.createElement('script');

        script1.src = "https://demo.expofp.com/packages/master/expofp.js"
        script1.crossOrigin = "anonymous"
        script1.async = false
        script1.onload = () => {
            script.async = false
            script.innerText = 'window.floorplan=new ExpoFP.FloorPlan({element: document.querySelector("#floorplan"),eventId: "demo",noOverlay: true});'
            document.body.appendChild(script);

        }
        document.body.appendChild(script1);

        return () => {
            document.body.removeChild(script)
            document.body.removeChild(script1)
        }

    }, []);

    function generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
            {editBeacon && <EditBeaconDialog beacon={editBeacon} handleSave={async b => {
                setEditBeacon(null);
                await BeaconsApi.editBeacon(b)
                await BeaconsApi.getBeacons().then((p) => setBeacons(p))
            }} handleClose={() => setEditBeacon(null)} />}
            {showCursor && <DotRing />}
            <div style={{ display: 'flex', height: "100%", width: 440, marginRight: -1, border: "1px solid rgba(0, 0, 0, 0.12)" }} >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    <Button variant="outlined" startIcon={<Add />} onClick={() => {
                                        setShowCursor(true);
                                        setOnGetCoordsClickCallback((e: any) => {
                                            setShowCursor(false);
                                            setOnGetCoordsClickCallback(null)
                                            selectCurrentPosition(e.x, e.y - 2, e.z)

                                            var uuid = generateGUID();
                                            var major = 1
                                            var minor = 1

                                            if (beacons.length > 0) {
                                                uuid = beacons[beacons.length - 1].uuid
                                                major = beacons[beacons.length - 1].major
                                                minor = beacons[beacons.length - 1].minor + 1
                                            }


                                            setEditBeacon({ id: -1, name: `Beacon_${beacons.length + 1}`, description: "", uuid: uuid, major: major, minor: minor, x: e.x, y: e.y - 2, z: e.z })
                                        })
                                    }}>
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
                                                <div style={{ display: 'flex', flexDirection: 'row' }} onClick={() => selectCurrentPosition(row.x, row.y)}>
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
                                                    onClick={() => {
                                                        setShowCursor(true);
                                                        setOnGetCoordsClickCallback((e: any) => {
                                                            setShowCursor(false);
                                                            setOnGetCoordsClickCallback(null)
                                                            selectCurrentPosition(e.x, e.y - 2, e.z)
                                                            setEditBeacon({ ...row, x: e.x, y: e.y - 2, z: e.z })
                                                        })
                                                    }}
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
                                                    onClick={async () => {
                                                        if (window.confirm(`Delete beacon ${row.name}?`)) {
                                                            await BeaconsApi.deleteBeacon(row.id)
                                                            await BeaconsApi.getBeacons().then((p) => setBeacons(p))
                                                        }
                                                    }}
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
