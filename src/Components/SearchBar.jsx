import { useContext, useEffect, useState } from "react"
import axios from "axios";
import {  getDocs } from "firebase/firestore";
import { StateContext } from "../Context/StateProvider";
import { Navbar } from "./Navbar";
import { db,collection,addDoc } from "../firebase";
export const SearchBar = () => {
    const { userData } = useContext(StateContext);
    const [data, setData] = useState([]);
    const [favouriteData, setFavouriteData] = useState([]);
    const [coinName, setCoinName] = useState();
    const handleChange = (event) => {
        const { value } = event.target;
        if (value == "") {
            setData([])
        }
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${value}&vs_currencies=INR`)
            .then(response => {
                setCoinName(value)
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
        })
    }
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, userData.uid));
        console.log(querySnapshot, userData.uid);
        let arr = [];
        querySnapshot.forEach(async (doc) => {
            // console.log(doc.id, " => ", doc.data());
            arr.push(doc.data());
        });
        setFavouriteData(arr);
    }
    useEffect(() => {
        fetchData();
    },[])
    return (
        <div>
            {console.log(Object.keys(data).length,data, coinName)}

            <Navbar/>
            <input type="text" name="" id="" placeholder="Enter you currency name..." onChange={handleChange} />
            {Object.keys(data).length > 0 &&
                Object.keys(data) == coinName && <div>
                    <div>{coinName}</div>
                    <div>{data[coinName].inr}</div>
                    <div>
                        <button onClick={handleFavourites}>Add To Favourite</button>
                    </div>
                </div>
            }
        </div>
    )
}