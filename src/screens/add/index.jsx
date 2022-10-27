import React,{useState, useEffect} from 'react'
import { styles } from './styles'
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore"
import { app } from '../../firebase'

import {Container,TextField,Button,Typography} from '@mui/material';

export default function Add() {

  const db = getFirestore(app)
  const [tower,setTower]=useState({area:"",ip:"",longitude:"",latitude:"",active:true,provider:""});

  const [loading,setLoading]=useState(false)
  
  const handleChange = (key) => {
    key.preventDefault();
    setTower({ ...tower, [key.target.id]: key.target.value });
  };

  console.log(tower)

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
        await addDoc(collection(db,"Towers"),tower).then(()=>{
          alert("Tower added") 
            setLoading(false)})   
    } catch (error) {
        alert(error)
    }
}

  return (
    <>
       <Container maxWidth="lg" sx={styles.container}>
       <Typography variant="h4" sx={{mb:"20px"}}>Add Tower</Typography>
       <TextField
                size="small"
                id="area"
                type="text"
                label="Area"
                placeholder="Area"
                value={tower.area || ""}
                onChange={handleChange}
                sx={styles.inputField}
              />
              <TextField
                size="small"
                id="ip"
                type="number"
                label="IP Address"              
                placeholder="IP Address"
                value={tower.ip || ""}
                onChange={handleChange}
                sx={styles.inputField}
              />
              <TextField
                size="small"
                id="longitude"
                type="number"
                label="Longitude"
                placeholder="Longitude"
                value={tower.longitude || ""}
                onChange={handleChange}
                sx={styles.inputField}
              />
              <TextField
                size="small"
                id="latitude"
                type="number"
                label="Latitude"
                placeholder="Latitude"
                value={tower.latitude || ""}
                onChange={handleChange}
                sx={styles.inputField}
              />
              <TextField
                size="small"
                id="provider"
                type="text"
                label="Provider"
                placeholder="Provider"
                value={tower.provider || ""}
                onChange={handleChange} sx={styles.inputField}
                sx={styles.inputField}
              />
              <Button disabled={loading} variant="contained" sx={styles.inputField} onClick={submitHandler}>add</Button>

       </Container>
    </>
  )
}
