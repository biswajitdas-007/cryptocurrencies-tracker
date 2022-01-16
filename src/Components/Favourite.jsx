import { useContext, useEffect, useState } from "react"
import {  getDocs } from "firebase/firestore";
import { db,collection,} from "../firebase";
import { StateContext } from "../Context/StateProvider";
import { Navbar } from "./Navbar";

export const Favourite = () => {
    const { userData } = useContext(StateContext);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, userData.uid));
        console.log(querySnapshot, userData.uid);
        let arr = [];
        querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            arr.push(doc.data());
        });
        setData(arr);
    }
    useEffect(() => {
        fetchData(); 
    },[])
    return (
        <div>
            <Navbar/>
            {data.length > 0 && data.map((item) => {
               return <div>
                    <div>
                        {item.cryptoName}
                    </div>
                    <div>
                        {item.price}
                    </div>
                </div>
            })}
        </div>
    )
}