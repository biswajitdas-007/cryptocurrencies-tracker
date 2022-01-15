import { useContext, useState } from "react"
import axios from "axios";
import {LoginPage} from "../Components/LoginPage";
import { StateContext } from "../Context/StateProvider";
import { Navbar } from "./Navbar";
// import { db } from "../firebase";
export const SearchBar = () => {
    const { userData } = useContext(StateContext);
    const [data, setData] = useState([]);
    const [coinName, setCoinName] = useState();
    const handleChange = (event) => {
        const { value } = event.target;
        // fetch(`https://data.messari.io/api/v2/assets/${value}/profile`)
        //     .then( res => {
        //     return res.json()
        // }).then(res => console.log(res))
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${value}&vs_currencies=INR`)
            .then(response => {
                setCoinName(value)
                setData(response.data);
            });
    }
    // const handleFavourites = () =>{
    //      db.collection("users").doc(`${userData.uid}`).collection("favorites").add({
    //         cryptoName: coinName,
    //         price: data[coinName].inr
    //     })
    // }
    return (
        <div>
            {console.log(Object.keys(data).length,data, coinName)}

            <Navbar/>
            <input type="text" name="" id="" placeholder="Enter you currency name..." onChange={handleChange} />
            {Object.keys(data).length > 0 &&
                <div>
                    <div>{coinName}</div>
                    <div>{data[coinName].inr}</div>
                    <div>
                        <button>Add To Favourite</button>
                    </div>
                </div>
            }
        </div>
    )
}