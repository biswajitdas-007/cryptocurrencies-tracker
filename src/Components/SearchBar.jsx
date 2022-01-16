import { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router";
import axios from "axios";
import { getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { StateContext } from "../Context/StateProvider";
import { Navbar } from "./Navbar";
import { db, collection, addDoc } from "../firebase";
import styles from "../Styles/SearchBar.module.css";

export const SearchBar = () => {
    const { userData, isAuth } = useContext(StateContext);
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [favouriteData, setFavouriteData] = useState([]);
    const [coinName, setCoinName] = useState();
    const [itemIsPresent, setItemIsPresent] = useState(false);
    const handleChange = (event) => {
        const { value } = event.target;
        if (value == "") {
            setData([])
        }
        setCoinName(value.toLowerCase())
        const filteredData = allData.filter((item) => {
            return item.name.toLowerCase().includes(value.toLowerCase()) && item
        })
        setData(filteredData);
    }
    const handleFavourites = async (id, name, current_price, image) => {
        var present = false;
        favouriteData.map((item) => {
            if (item.id == id) {
                present = true;
            }
        })
        !present && await addDoc(collection(db, userData.uid), {
                id:id,
                name: name,
                price: current_price,
                image: image,
                favourite:true
         })
        await fetchData()
        setItemIsPresent(!itemIsPresent);
    }
    const handleRemove = async (id) => {
        //await deleteDoc(doc(db, userData.uid, "DC"));
        const querySnapshot = await getDocs(collection(db, userData.uid));
        let arr = [];
        let del;
        querySnapshot.forEach(async (doc) => {
            if (doc.data().id == id) {
                del = doc.id;
            }
        });
        await deleteDoc(doc(db, userData.uid, del));
        await fetchData();
        setItemIsPresent(!itemIsPresent);
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
    const populateData = () => {
            const updatedData = allData.map((item) => {
                item.favourite = false;
                return item
            })
            const finalData = updatedData.map((item) => {
                let temp = favouriteData.map((item1) => {
                    if (item1.id == item.id) {
                        item.favourite = true;
                    }
                })
                return item;
            })
            console.log("finalData: ", finalData)
        setAllData(finalData);
    }
    const getAllData = () => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(res=>setAllData(res.data))
    }
    useEffect(() => {
        populateData()
    }, [coinName, itemIsPresent])
    useEffect(() => {
        fetchData();
        getAllData();
    }, [])
     if(!isAuth){window.location.href="/"}
    return (
       
        <div>
            {console.log("data: ",data)}
            <Navbar />
                <div className={styles.container}>
                    <input type="text" name="" id="" placeholder="Enter you currency name..." onChange={handleChange} className={styles.searchBox} />
                    <div className={styles.cryptoDetailsContainer}>
                        {data.length > 0 &&
                        data.map((item) => {
                            return <div className={styles.cryptoDetails}>
                            <img src={item.image} alt="logo"/>
                            <div className={styles.itemName}>{item.name}</div>
                            <div className={styles.itemPrice}>&#x20B9; {item.current_price}</div>
                            <div>
                                {item.favourite ? <button onClick={()=>handleRemove(item.id)}>Remove</button> : <button onClick={()=> handleFavourites(item.id, item.name, item.current_price, item.image)}>Add To Favourite</button>}
                            </div>
                        </div>
                    })}
                    </div>
                </div>
            </div>
            
    ) 
}