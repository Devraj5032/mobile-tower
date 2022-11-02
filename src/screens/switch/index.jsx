import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import {
  getFirestore,
  collection,
  updateDoc,
  doc,
  getDocs,
  Timestamp
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

  const getTowers = async () => {
    const data = await getDocs(towerCollectionRef);
    setTowers(data.docs.map((doc) => ({ ...doc.data(), id: doc })));
    
  };


  const downTime = async (id,arr,isActive) => {
    const towerDoc = doc(db, "Towers", id);
    // const inActive = [{ DownTime:serverTimestamp(), upTime:"2"}].concat(arr);
    var inActive;
    if(isActive){
      inActive = [{ DownTime:Timestamp.now(), upTime:""}].concat(arr);
    }
    else{
      const dt = arr[0].DownTime;
      var inActive = arr;
      inActive[0]={ DownTime:dt?dt:"", upTime:Timestamp.now()}
    }
    await updateDoc(towerDoc, {inActive}).then(getTowers);
  };


  const towerSwitch = async (id, active,arr) => {
    const towerDoc = doc(db, "Towers", id);
    const newFields = { active: active ? false : true };
    await updateDoc(towerDoc, newFields).then(getTowers);
    downTime(id,arr,active)
  };



  useEffect(() => {
    getTowers();
  }, []); 

 
  // function ping(ip) {
  //   var ws = new WebSocket("ws://" + ip);
  //   console.log(ws)
  //   ws.onerror = function(e){
  //     console.log("yes")
  //     ws = null;
  //   };
  //   setTimeout(function() { 
  //     if(ws != null) {
  //       ws.close();
  //       ws = null;
  //       console.log("No")
  //     }
  //   },2000);
  // }

  // ping("170.187.231.66")

  return (
    <>
    <TableContainer sx={styles.container}>
      <Table aria-label="simple table" sx={styles.table}>
        <TableHead >
          <TableRow >
            <TableCell sx={{fontWeight:"bold"}}>Sl. No</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Area</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>IP Address</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Longitude</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Latitude</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Provider</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Status</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={styles.table_body}>
          {towers.map((tower, idx) => (
            <TableRow sx={styles.table_row} key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{tower.area}</TableCell>
              <TableCell>{tower.ip}</TableCell>
              <TableCell>{tower.longitude}</TableCell>
              <TableCell>{tower.latitude}</TableCell>
              <TableCell>{tower.provider}</TableCell>
              <TableCell>{tower.active? "Active" : "Inactive"}</TableCell>
              <TableCell>
              <Switch
                checked={tower.active}
                onChange={() => {
                  towerSwitch(tower.id.id, tower.active,tower.inActive?tower.inActive:[]);
                }}
              />
              {/* <button onClick={()=>downTime(tower.id.id,tower.inActive?tower.inActive:[])}>iabc</button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
}
