import React, { useEffect, useLayoutEffect, useState } from "react";
import { API_URL } from "../../../common/Constants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import { ArrowForward, Bluetooth, Edit, PinDrop } from "@mui/icons-material";
import { selectCurrentPosition, setOnGetCoordsClickCallback } from "./fp";
import DotRing from "./DotRing";

interface Beacon {
    id: number;
    name: string;
    description: string;
    uuid: string,
    major: number,
    minor: number,

    x: number,
    y: number
}

export const Beacons = () => {

    const [showCursor, setShowCursor] = useState(false);

    const beacons: Beacon[] = [
        { id: 1, name: "Beacon_1", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44252, y: 11000 },
        { id: 2, name: "Beacon_2", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 46852, y: 12852 },
        { id: 3, name: "Beacon_3", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 45052, y: 14352 },
        { id: 4, name: "Beacon_4", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44552, y: 11600 },
        { id: 5, name: "Beacon_5", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 43152, y: 12352 },
        { id: 6, name: "Beacon_6", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 42252, y: 12652 },
        { id: 7, name: "Beacon_7", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 43000, y: 13652 },
        { id: 8, name: "Beacon_8", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 43252, y: 12652 },
        { id: 9, name: "Beacon_9", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44052, y: 13652 },
        { id: 10, name: "Beacon_10", description: "1", uuid: "e6f3421a-5179-4f8b-b317-343ab537713b", major: 1, minor: 101, x: 44652, y: 14722 },
    ]

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
                                                    <Bluetooth style={{ alignSelf: "center" }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
