import { useEffect } from "react";
import Footer from "../Footer/Footer";
import { ItemType } from "../Homepage/Homepage";
import Item from "../Item/Item";
import Title from "../Title/Title";
import React from "react";
import { getRequest } from "../../services/apiService";

interface State {
  allItems: Array<ItemType>;

}

class Favorites extends React.Component<{}, State> {
 
  constructor(props: {}) {
        super(props);
        this.state = {
              allItems:[],
        }
    }


  deleteFromFav = (itemID: string) => {
    const id = localStorage.id;
    const data = {
        id,
        itemID,
     };
     
    fetch('http://localhost:3000/homepage/fav', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),

    })
          .then(res => res.status == 200 ? itemID : undefined)
          .then(itemId => {if(itemID) (this.setState(() => ({ allItems: this.state.allItems.filter(f => f.itemID != itemId) })))})  
  }

 componentDidMount(): void {
    const id = localStorage.id;
    const res = getRequest("homepage/fav?id=" + id);
    
    if (!res) {
      window.open("/login", "_self");
      return;
    }

    res
      .then((res) => res.json())
      .then((json) => this.setState(() => ({ allItems: json })));
 }
       
 render(){
  
  return (

    <>
      <Title>
        <h1>My favorites</h1>
      </Title>
      <div className="itemsContHomepage">
        {this.state.allItems &&
          this.state.allItems.map((e) => (
            <Item item={e} key={e.itemID} role={""}
            addToFav={this.deleteFromFav} />
          ))}
      </div>
    </>

  );
} 
}

export default Favorites;
