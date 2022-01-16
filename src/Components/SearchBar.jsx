import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { StateContext } from "../Context/StateProvider";
import { Navbar } from "./Navbar";
import { db, collection, addDoc } from "../firebase";
import styles from "../Styles/SearchBar.module.css";

export const SearchBar = () => {
    const { userData } = useContext(StateContext);
    const [data, setData] = useState([]);
    const [favouriteData, setFavouriteData] = useState([]);
    const [coinName, setCoinName] = useState();
    const [itemIsPresent, setItemIsPresent] = useState(false);
    const handleChange = (event) => {
        const { value } = event.target;
        if (value == "") {
            setData([])
        }
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${value}&vs_currencies=INR`)
            .then(response => {
                let present = false;
                favouriteData.map((item) => {
                    if (item.cryptoName == value.toLowerCase()) {
                     console.log(item.cryptoName, value)
                        present = true;
                }   
                })
                if (present) {
                    setItemIsPresent(true)
                } else {
                    setItemIsPresent(false);
                }
                setCoinName(value.toLowerCase())
                setData(response.data);
            }).catch(err => setData([]));
    }
    const handleFavourites = async () => {
        fetchData().then(async () => {
            let isAvailable = false;
            favouriteData.filter((item) => {
                 if (item.cryptoName == coinName) {
                    isAvailable = true
                }   
            })
            !isAvailable && await addDoc(collection(db,userData.uid), {
                cryptoName: coinName,
                price: data[coinName].inr
            });
            !isAvailable && setItemIsPresent(true)
        })
    }
    const handleRemove = async () => {
        //await deleteDoc(doc(db, userData.uid, "DC"));
        const querySnapshot = await getDocs(collection(db, userData.uid));
        let arr = [];
        let id;
        querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            if (doc.data().cryptoName == coinName) {
                id = doc.id;
            }
        });
        await deleteDoc(doc(db, userData.uid, id));
        setItemIsPresent(false);
    }
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, userData.uid));
        let arr = [];
        querySnapshot.forEach(async (doc) => {
            // console.log(doc.id, " => ", doc.data());
            arr.push(doc.data());
        });
        setFavouriteData(arr);
    }
    useEffect(() => {
        fetchData();
    },[itemIsPresent])
    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <input type="text" name="" id="" placeholder="Enter you currency name..." onChange={handleChange} className={styles.searchBox} />
                <div className={styles.cryptoDetailsContainer}>
                    {Object.keys(data).length > 0 &&
                        Object.keys(data) == coinName &&
                        <div className={styles.cryptoDetails}>
                            <div>{coinName}</div>
                            <div>&#x20B9; {data[coinName].inr}</div>
                            <div>
                                {itemIsPresent ? <button onClick={handleRemove}>Remove</button>:<button onClick={handleFavourites}>Add To Favourite</button>}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}