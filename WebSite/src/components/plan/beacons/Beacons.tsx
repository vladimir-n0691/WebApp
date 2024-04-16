import React, { useEffect, useLayoutEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import { Bluetooth, Delete, Edit, PinDrop } from "@mui/icons-material";
import { selectCurrentPosition, setOnGetCoordsClickCallback } from "../../common/fp";
import DotRing from "../../common/DotRing";
import { Beacon } from "../../../common/types";
import BeaconsApi from "../../../api/BeaconsApi";

export const Beacons = () => {
    const [showCursor, setShowCursor] = useState(false);
    const [beacons, setBeacons]= React.useState<Beacon[]>([]);
  
    useEffect(() => {
        BeaconsApi.getPlans().then((p)=> setBeacons(p))
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


    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: "100%" }}>
            { showCursor && <DotRing /> }
            <div style={{ display: 'flex', height: "100%", width: 440, marginRight: -1, border: "1px solid rgba(0, 0, 0, 0.12)" }} >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
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
                                                        setOnGetCoordsClickCallback((e:any) => {
                                                            setShowCursor(false); 
                                                            setOnGetCoordsClickCallback(null)
                                                            selectCurrentPosition(e.x, e.y-2, e.z)
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
