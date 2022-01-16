import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Favourite } from "../Components/Favourite";
import { LoginPage } from "../Components/LoginPage";
import { Navbar } from "../Components/Navbar";
import { SearchBar } from "../Components/SearchBar";
import { StateContext } from "../Context/StateProvider";
export const AllRoutes = () => {
    const { isAuth } = useContext(StateContext);
    return (
        <Routes>
            <Route exact path="/" element={isAuth ? <Navbar /> : <LoginPage />}></Route>
            <Route exact path={isAuth ? "/search" : "/"} element={ <SearchBar />}></Route>
            <Route exact path={isAuth ? "/favorites" : "/"} element={<Favourite />}></Route>
            
            
        </Routes>
    )
}