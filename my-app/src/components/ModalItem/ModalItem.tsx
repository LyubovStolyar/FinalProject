import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ModalItem.css';
import { ItemType } from "../Homepage/Homepage";
import { useState } from "react";

interface ModalProps{
    itemToView : ItemType,
    onClose: Function
}


function ModalItem(props: ModalProps) {
  const [photoURL, setphotoURL] = useState('');
  if(!photoURL) {
    let enc = new TextDecoder("utf-8");
    let arr : Uint8Array = new Uint8Array(props.itemToView.photo.data);
    fetch(enc.decode(arr)).then(res => res.blob()).then(res => setphotoURL(URL.createObjectURL(res)));
  }
  
  return (
    <>
    <main className="mainContModal" onClick={()=> props.onClose()}>
      <FontAwesomeIcon icon={faXmark} className="modalCloseIcon"/>
      
      <div className="containerModal" onClick={(e)=> e.stopPropagation()}>
        
          <div className="modalPhotoCont">
              <img src={photoURL} alt="" className="photoModalView"/>
          </div>

          <div className="modalContTitleDesc">
              <h1 className="modalTitle">{ props.itemToView.title }</h1>
              <p className="discriptionModal">{ props.itemToView.description }</p>
          </div>

          <div>
             
          </div>

      </div>

      
      </main>
    </>
  );
}

export default ModalItem;
