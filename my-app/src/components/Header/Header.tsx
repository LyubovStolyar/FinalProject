import { BiStore } from "react-icons/bi";
import { NavLink } from "react-router-dom";

import "./Header.css";

const role = localStorage.userRole

function Header() {
  return (
    <>
      
      <div className="headerWrapper">
        <div className="linkContainer">

          <i className="iconHeader"><BiStore/></i>

          <NavLink to="/" className="link">Home</NavLink>
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