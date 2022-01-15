import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <Link to="/search"><a href="#">Search</a></Link>
             <Link to="/favorites"><a href="#">Favourites</a></Link>
       </nav>
    )
}