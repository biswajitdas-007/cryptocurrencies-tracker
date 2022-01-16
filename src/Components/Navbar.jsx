import { useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../Context/StateProvider";
import styles from "../Styles/Navbar.module.css";
export const Navbar = () => {
    const { toggleAuth, userData } = useContext(StateContext);
    return (
        <nav className={styles.navBar}>
            <Link to="/search" className={styles.navLinks}><a href="#" className={styles.navLinks}>Search</a></Link>
            <Link to="/favorites" className={styles.navLinks}><a href="#" className={styles.navLinks}>Favourites</a></Link>
            <a href="" onClick={toggleAuth} className={styles.navLinks}>LogOut</a>
            <a href="" className={styles.navbarImg}><img src={userData.profilePic} alt="" /></a>
       </nav>
    )
}