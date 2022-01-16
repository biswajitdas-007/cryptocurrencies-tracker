import { useContext, useEffect, useState } from "react"
import { getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db,collection,} from "../firebase";
import { StateContext } from "../Context/StateProvider";
import { Navbar } from "./Navbar";
import styles from "../Styles/Favourite.module.css";

export const Favourite = () => {
    const { userData, isAuth } = useContext(StateContext);
    const [itemIsPresent, setItemIsPresent] = useState(true);
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, userData.uid));
        let arr = [];
        querySnapshot.forEach(async (doc) => {
            arr.push(doc.data());
        });
        setData(arr);
    }
    const handleRemove = async (id) => {
        //await deleteDoc(doc(db, userData.uid, "DC"));
        const querySnapshot = await getDocs(collection(db, userData.uid));
        let arr = [];
        let del;
        querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            if (doc.data().id == id) {
                del = doc.id;
            }
        });
        await deleteDoc(doc(db, userData.uid, del));
    }
    useEffect(() => {
        fetchData(); 
    }, [data])
        useEffect(() => {
        fetchData(); 
    },[])
    if(!isAuth){window.location.href="/"}
    return (
        <div>
            <Navbar />
            <div className={styles.itemContainer}>
                {data.length > 0 && data.map((item) => {
                    return <div className={styles.favouriteItem}>
                        <div>
                            <img src={item.image} alt="" />
                        </div>
                        <div className={styles.itemName}>
                            {item.name}
                        </div>
                        <div className={styles.itemPrice}>
                            &#x20B9; {item.price}
                        </div>
                        <div>
                            <button onClick={()=>handleRemove(item.id)}>Remove</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}