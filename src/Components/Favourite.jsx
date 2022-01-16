import { useContext, useEffect, useState } from "react"
import {  getDocs } from "firebase/firestore";
import { db,collection,} from "../firebase";
import { StateContext } from "../Context/StateProvider";
import { Navbar } from "./Navbar";
import styles from "../Styles/Favourite.module.css";

export const Favourite = () => {
    const { userData } = useContext(StateContext);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, userData.uid));
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
            <Navbar />
            <div className={styles.itemContainer}>
                {data.length > 0 && data.map((item) => {
                return <div className={styles.favouriteItem}>
                        <div>
                            {item.cryptoName}
                        </div>
                        <div>
                            &#x20B9; {item.price}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}