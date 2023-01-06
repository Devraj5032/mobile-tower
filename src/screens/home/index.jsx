import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  InfoWindow,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { styles } from "./styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { app } from "../../firebase";

const markers = [
  {
    id: 1,
    name: "Location 1",
    position: {
      lat: 22.779973198187793,
      lng: 86.16881421555077,
    },
  },
  {
    id: 2,
    name: "Location 2",
    position: {
      lat: 22.779973198187783,
      lng: 87.16881421555007,
    },
  },
  {
    id: 3,
    name: "Location 3",
    position: {
      lat: 22.779973198187703,
      lng: 88.16881421555077,
    },
  },
  {
    id: 4,
    name: "Location 4",
    position: {
      lat: 22.779973198187783,
      lng: 89.16881421555077,
    },
  },
  {
    id: 5,
    name: "Location 5",
    position: {
      lat: 41.4055,
      lng: 90.1915,
    },
  },
];

const center = {
  lat: 22.779973198187783,
  lng: 86.16881421555077,
};

export default function Home(props) {
  let navigate = useNavigate();
  
  const db = getFirestore(app);
  const [towers, setTowers] = useState([]);
  const towerCollectionRef = collection(db, "Towers");
  const [area, setArea] = useState("Adityapur");
  const [activeMarker, setActiveMarker] = useState(null);
  
  const google = window.google;
  
  const handleChange = (event) => {
    setArea(event.target.value);
  };

  const mapStyles = {
    height: "70vh",
    width: "70%",
  };
  // }, []);

  useEffect(() => {
    const getTowers = onSnapshot(towerCollectionRef, (snap) => {
      setTowers(
        snap.docs.map((item) => {
          const id = item;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      getTowers();
    };
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };



  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <>
      <Button
        onClick={() => {
          navigate("/add");
        }}
        variant="text"
      >
        Add
      </Button>
      <Button
        onClick={() => {
          navigate("/switchTower");
        }}
        variant="text"
      >
        Switch
      </Button>
      <Container maxWidth="fullscreen" sx={styles.components}>
        <Box sx={{ minWidth: 120, my: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Area</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={area}
              label="Area"
              onChange={handleChange}
            >
              <MenuItem value={"Adityapur"}>Adityapur</MenuItem>
              <MenuItem value={"Bistupur"}>Bistupur</MenuItem>
              <MenuItem value={"Kadma"}>Kadma</MenuItem>
              <MenuItem value={"Sonari"}>Sonari</MenuItem>
              <MenuItem value={"Sakchi"}>Sakchi</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <LoadScript googleMapsApiKey="AIzaSyBXu3_xsd-bCytf8HPen5wW8dlw-Mvg-8U">
          <GoogleMap
            // onLoad={handleOnLoad}
            center={center}
            zoom={13}
            mapContainerStyle={{ width: "70%", height: "70vh" }}
          >
            {markers.map((item) => 
            <Marker
              onLoad={onLoad}
              key={item.name}
              position={item.position}
            ></Marker>
            )}
          </GoogleMap>
        </LoadScript>

        <TableContainer sx={{ my: 4 }}>
          <Table aria-label="simple table" sx={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Sl. No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Area</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>IP Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Longitude</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Latitude</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Provider</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
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
                  <TableCell>{tower.active ? "Active" : "Inactive"}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => {
                        props.setTower(tower);
                        navigate("/towerDetails");
                      }}
                    >
                      view
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
