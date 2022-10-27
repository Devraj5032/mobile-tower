import React,{useState, useEffect} from 'react'
import { styles } from './styles'
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy,updateDoc} from "firebase/firestore"
import { app } from '../../firebase'

export default function Switch() {

    const db = getFirestore(app)
    const[towers,setTowers]=useState([])

    useEffect(() => {

      const q = query(collection(db,"Towers"))

    const unSubscribeForTowers= onSnapshot (q,(snap)=>{
      setTowers(snap.docs.map((item)=>{
          return { ...item.data()}
      }))
    })

    return () => {
      unSubscribeForTowers()
    }

  },[])

  const updateHandler = async (e) => {
    e.preventDefault()
    try {

        await addDoc(collection(db,"Towers"),tower).then(()=>{
          alert("Tower added") 
      })   
    } catch (error) {
        alert(error)
    }
}



  console.log(towers)

  return (
    <div>
      
    </div>
  )
}
