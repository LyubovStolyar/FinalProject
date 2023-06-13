import { BiStore } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";

const role = localStorage.userRole

function Header() {
  return (
    <>
      
      <div className="headerWrapper">
        <div className="linkContainer">
          <i className="icon"><BiStore/></i>

          <Link to="/homepage" className="link">Home</Link>
          <NavLink to="/about" className="link">About</NavLink>
          <NavLink to="/favorites" className="link">Favorites</NavLink>
          <div className={role === "admin"? "visible":"hidden"}> 
          <NavLink to="/addItem" className="link">Add Item</NavLink>
          </div>

</div>
        </div>

    
    </>
  );
}

export default Header;