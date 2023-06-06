import { useState } from "react";
import { ItemType } from "../Homepage/Homepage";
import "./Item.css";
import { useNavigate } from "react-router-dom";


interface Props {
    item: ItemType;
    addToFav: Function;
    role: string;
    onEditClick: Function
  };

 const role = localStorage.userRole


function Item (props:Props) {
  const [photoURL, setphotoURL] = useState('');
  const navigate = useNavigate();
 
 function editItem() {
  props.onEditClick(props.item);
  navigate("/addItem");
  }
  // fetch(props.item.photo).then(res =>res.blob()).then(res => { 
  //  let img = document.getElementById(`photo-${props.item.itemID}`) as HTMLImageElement;
  //  if(img) {img.src = URL.createObjectURL(res)}});
        // if (!photoURL) { setphotoURL(URL.createObjectURL(props.item.photo))}
if(!photoURL) {
  let enc = new TextDecoder("utf-8");
  let arr : Uint8Array = new Uint8Array(props.item.photo.data);
  fetch(enc.decode(arr)).then(res => res.blob()).then(res => setphotoURL(URL.createObjectURL(res)));
}

    return ( 

        <div className="itemBody">
            <div className="itemCont">
              <h1 className="photoTitle">{ props.item.title }</h1>
                <div className="editDeleteHeartCont">  
                    <div className={role === "admin"? "visible":"hidden"}> 
                      <button onClick={editItem}>Edit</button>
                      <button>Delete</button>
                    </div>

                    <div className="buttonCont">
                      <button onClick={() => {props.addToFav(localStorage.id, props.item.itemID)}}>
                      <i>Heart</i>
                      </button>
                    </div> 
                </div>

              <div className="photoCont">
                <img src={photoURL} alt="cardPhoto" className='photoStyle'/>
              </div>

              <p className="descriptionField">{ props.item.description }</p>
          
            </div>
        </div>
           
     
     );
}

export default Item;

