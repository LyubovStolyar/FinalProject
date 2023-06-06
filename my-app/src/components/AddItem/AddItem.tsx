// import react from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../Message/Message";
import "./AddItem.css";
import { ItemType } from "../Homepage/Homepage";

// export interface Iitem {
//   title: string;
//   description: string;
//   photo: ArrayBuffer | null;
// }

// let item: Iitem = {
//   title: "",
//   description: "",
//   photo: null,
// };

interface AddItemProps {
  getItem: Function,
  removeItem : Function
}

function AddItem(props : AddItemProps) {
  const [photoURL, setphotoURL] = useState("");
  const navigate = useNavigate();
  let item : ItemType = props.getItem();
  if(item.photo && !photoURL){
    viewPhotoFromString(item.photo)
  }
  const fileHandler = (file: File) => {
    if (file != null) {
      let reader: FileReader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          item.photo = reader.result as ArrayBuffer;
          viewPhotoFromString(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

function viewPhotoFromString(photo : any) : void {
  if(typeof(photo) != "string"){
    photo = new TextDecoder("utf-8").decode(new Uint8Array(photo.data));
  }
  
  fetch(photo)
  .then((res) => res.blob())
  .then((res) => {
    setphotoURL(URL.createObjectURL(res));
  });
}

  function submit() {
    //    console.log(JSON.stringify(item));

    fetch("http://localhost:3000/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => res.json());
    // .then(json => {
    // localStorage.setItem('token', json.token);

    props.removeItem();
    window.open("/homepage", "_self");
    //  }
    //  )
  }

  return (
    <>

      <div className="addItemCont" 
    //   onClick={}
      >
       
        <Input
          type="text"
          className="addItemInput"
          value={item.title}
          onChange={(e: any) => item.title = e.target.value}
          placeholder="Item name"
        />

        <Input
          type="text"
          className="addItemInput"
          value={item.description}
          onChange={(e: any) => {console.log(item.description); item.description = e.target.value; console.log(item.description);}}
          placeholder="Description"
        />
        <div>
          <img src={photoURL} className="photoLoadedPreview" />
        </div>
        <Input
          type="file"
          className="addPhotoInput"
          value=""
          placeholder=""
          onChange={(event: any) => {
            if (event.target.files) {
              fileHandler(event.target.files[0]);
            }
          }}
        />

        <button onClick={submit} className="uploadPhotoButton">
          Upload
        </button>

        <Message />
      </div>
    </>
  );
}

export function Input({value, type, className, onChange, placeholder}: {value: string, type: string, className: string, onChange : Function, placeholder: string}){
const [val, setVal] = useState(value);
return (
     <input type={type} value={val} className={className} placeholder={placeholder} onChange={(event) => {onChange(event); setVal(event.target.value)}} />
   )
}

export default AddItem;
