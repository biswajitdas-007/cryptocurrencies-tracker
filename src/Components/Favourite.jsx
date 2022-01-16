import { useContext, useEffect, useState } from "react"
import {  getDocs } from "firebase/firestore";
import { db, doc, setDoc, collection, addDoc, query, where, onSnapshot } from "../firebase";
import { StateContext } from "../Context/StateProvider";

export const Favourite = () => {
    const { userData } = useContext(StateContext);
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, userData.uid));
        console.log(querySnapshot, userData.uid);
        querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc)
            const data = await getDocs(collection(db, "favourites"));
            data.forEach((doc) => {
                console.log("doc: ", doc);
            })
        console.log(doc.id, " => ", doc.data());
        });

        // const sfRef = db.collection('users').doc(`${userData.uid}`);
        // const collections = await sfRef.listCollections();
        // console.log("sfref: ", collections);
        // collections.forEach(collection => {
        // console.log('Found subcollection with id:', collection.id);
        // });

    }
    useEffect(() => {
        fetchData(); 
    },[])
    return (
        <div>

        </div>
    )
}