import { useState } from "react";
import { ItemType } from "../Homepage/Homepage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./Item.css";


interface Props {
    item: ItemType;
    addToFav: Function;
    role: string;
    onEditClick?: Function;
    onDeleteClicked?: Function;
    toModelView?: Function; 
  };

 const role = localStorage.userRole


function Item (props:Props) {
  const [photoURL, setphotoURL] = useState('');
  const navigate = useNavigate();
 
 function editItem() {
  if(props.onEditClick) {
    props.onEditClick(props.item);
    navigate("/addItem");
  }
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
            <div className="itemCont"
            onClick={(e) => {e.stopPropagation(); if(props.toModelView) props.toModelView(props.item)}}>
              <h1 className="photoTitle">{ props.item.title }</h1>
                <div className="editDeleteHeartCont">  
                    <div className={role === "admin"? "visible":"hidden"}> 
                      {props.onEditClick && <button onClick={(e) => {e.stopPropagation(); if (props.onEditClick) editItem()}} className="editButton"><FontAwesomeIcon icon={faPenToSquare} /></button>}
                      {props.onDeleteClicked && <button onClick={(e) => {e.stopPropagation(); if(props.onDeleteClicked) props.onDeleteClicked(props.item.itemID)}} className="deleteButton"><FontAwesomeIcon icon={faTrashCan} /></button>}
                    </div>
                    
                    <div className="buttonCont">
                      <button className="heartButtonIcon" onClick={(e) => {e.stopPropagation(); props.addToFav(props.item.itemID);}} >
                      <FontAwesomeIcon icon={faHeart} className="heartButtonItem"/>
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

