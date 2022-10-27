import React,{useState, useEffect} from 'react'
import { styles } from './styles'
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore"
import { app } from '../../firebase'

export default function Home() {

    const db = getFirestore(app)

  return (
    <div>
      
    </div>
  )
}
