import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Switch,
} from "@mui/material";
import { app } from "../../firebase";
// import Tables from "../table/Tables";

export default function SwitchTower() {
  const db = getFirestore(app);
  const [towers, setTowers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Towers"));

    const unSubscribeForTowers = onSnapshot(q, (snap) => {
      setTowers(
        snap.docs.map((item) => {
          return { ...item.data() };
        })
      );
    });

    return () => {
      unSubscribeForTowers();
    };
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Towers"), towers).then(() => {
        alert("Tower added");
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <TableContainer sx={styles.container}>
      <Table aria-label="simple table" sx={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Sl. No</TableCell>
            <TableCell>Area</TableCell>
            <TableCell align="right">IP Address</TableCell>
            <TableCell align="right">longitude</TableCell>
            <TableCell align="right">latitude</TableCell>
            <TableCell align="right">provider</TableCell>
            <TableCell align="right">active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={styles.table_body}>
          {/* {towers.map(((tower , idx) => <TableCell>{idx+1}</TableCell>))}
          {towers.map((tower => <TableCell>{tower.area}</TableCell>))} */}
          {towers.map((tower, idx) => (
            <TableRow sx={styles.table_row}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{tower.area}</TableCell>
              <TableCell>{tower.ip}</TableCell>
              <TableCell>{tower.longitude}</TableCell>
              <TableCell>{tower.latitude}</TableCell>
              <TableCell>{tower.provider}</TableCell>
              <TableCell>{tower.active === true ? "Yes" : "No"}</TableCell>
              <Switch checked="checked" />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
