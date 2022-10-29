import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import {
  getFirestore,
  collection,
  updateDoc,
  doc,
  getDocs,
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

export default function SwitchTower() {
  const db = getFirestore(app);
  const [towers, setTowers] = useState([]);
  const towerCollectionRef = collection(db, "Towers");
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const getTowers = async () => {
      const data = await getDocs(towerCollectionRef);
      setTowers(data.docs.map((doc) => ({ ...doc.data(), id: doc })));
      // console.log(data);
    };

    getTowers();
  }, []);

  const towerSwitch = async (id, active) => {
    const towerDoc = doc(db, "Towers", id);
    const newFields = { active: active === true ? false : true };
    // setChecked(active === true ? false : true);
    await updateDoc(towerDoc, newFields);
  };

  return (
    <TableContainer sx={styles.container}>
      <Table aria-label="simple table" sx={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Sl. No</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>IP Address</TableCell>
            <TableCell>longitude</TableCell>
            <TableCell>latitude</TableCell>
            <TableCell>provider</TableCell>
            <TableCell>active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={styles.table_body}>
          {towers.map((tower, idx) => (
            <TableRow sx={styles.table_row}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{tower.area}</TableCell>
              <TableCell>{tower.ip}</TableCell>
              <TableCell>{tower.longitude}</TableCell>
              <TableCell>{tower.latitude}</TableCell>
              <TableCell>{tower.provider}</TableCell>
              <TableCell>{tower.active === true ? "Yes" : "No"}</TableCell>
              <Switch
                checked={checked}
                onClick={() => {
                  towerSwitch(tower.id.id, tower.active);
                }}
              />
              {/* {console.log(tower.id.id)} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
