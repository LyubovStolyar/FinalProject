import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/Signup/Signup";
import Login from "./components/auth/Login/Login";
import LogOut from "./components/auth/LogOut/Logout";
import PrivateRouter from "./components/auth/PrivatRoute";
import Homepage, { ItemType } from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";
import UserName from "./components/UserNameStatus/UserName";
import Favorites from "./components/Favorites/Favorites";
import AddItem from "./components/AddItem/AddItem";
import About from "./components/About/About";
import photo from "./photo/IMG_4874.jpg";


function App(){

let itemToEdit : ItemType = new ItemType();

  return (
    <>
      <div className="appGeneral">
        <Header/>
        <UserName/>
        <Link to="/login" className="link">Login</Link>
        <Link to="/signup" className="link">Sign up</Link>
        <LogOut />
        
      </div>
      <img src={photo} alt="calm view header"  className="mainPhoto" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/homepage" element={<Homepage onEditClick={(item : ItemType) => itemToEdit = item}/>} />
        <Route path="/addItem" element={<AddItem getItem = {() => itemToEdit} removeItem={() => itemToEdit = new ItemType() }/>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<About />} />
           <Route
          path="/" element={
            <PrivateRouter>
           
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
}
export default App;