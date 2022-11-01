import React, { useState, useEffect } from "react";
import { styles } from "./styles";

import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography  ,
  Box
} from "@mui/material";


export default function TowerDetails(props) {
   

  return (
    <>
    <Box sx={styles.box}>
    <Typography variant="h6">{props.tower.area}</Typography>
    <Typography variant="h6">{props.tower.ip}</Typography>
    <Typography variant="h6">{props.tower.provider}</Typography>
    <Typography variant="h6">{props.tower.active? "Active" : "Inactive"}</Typography>
    </Box>
  
    <TableContainer sx={styles.container}>
      <Table aria-label="simple table" sx={styles.table}>
        <TableHead >
          <TableRow >
            <TableCell sx={{fontWeight:"bold"}}>Sl. No</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>DownTime</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>upTime</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={styles.table_body}>
          {props.tower.inActive.map((tower, idx) => (
            <TableRow sx={styles.table_row} key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{tower.DownTime}</TableCell>
              <TableCell>{tower.upTime}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}
