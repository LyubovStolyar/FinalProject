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

    deleteFromFav(id: string, itemID: string) {
 
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
          .then(res => res.json())
          // .then(

          // )
          
    }
    
  componentDidMount(): void {
    const id = localStorage.id;
    const res = getRequest("homepage/fav?id=" + id);

    if (!res) {
      window.open("/login", "_self");
      return;
    }

    res
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState(() => ({
          allItems: json,
        }));
      });
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
            <Item item={e} key={e.itemID} addToFav={this.deleteFromFav} role={""} onEditClick={(item : ItemType) => console.log(item.itemID)}/>
          ))}
      </div>
    </>

  );
} 
}

export default Favorites;
