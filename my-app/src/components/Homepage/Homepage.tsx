import React from "react";
import Footer from "../Footer/Footer";

import Item from "../Item/Item";
import { getRequest } from "../../services/apiService";
import "./Homepage.css";
import Title from "../Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export class ItemType {
  itemID: string = "";
  title: string = "";
  description: string = "";
  photo: any;
};

interface Props {}

interface State {
  allItems: Array<ItemType>;
}

interface HomepageProps{
onEditClick : Function
}

class Homepage extends React.Component<HomepageProps, State> {
 
  constructor(props: HomepageProps) {
    super(props);

    this.state = {
      allItems: [],
    };
  }


  addtoFavorites(id: string, itemID: string) {
    
      const data = {
         id,
         itemID,
      };

      fetch('http://localhost:3000/homepage/fav', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),

      })
          .then(res => alert(res.status === 200 ? "Ok" : res.status === 409 ? "Already added" : "Unknown Error"))
          // .then(

          // )
          
          }

          filterCards = (value: string): void => {
            value = value.toLowerCase();
            let tempArray: Array<ItemType> = this.state.allItems
              .filter((e) => e.title.toLowerCase().includes(value))
              .sort(
                (card1, card2) =>
                  card1.title.toLowerCase().indexOf(value) -
                  card2.title.toLowerCase().indexOf(value)
              );
            this.setState(() => ({
              allItems: tempArray,
            }));
          };

          deleteItem(){}

  componentDidMount(): void {
    const res = getRequest("homepage");

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

  render() {
    return (
      <>
        <div className="homepageHeaderCont">
         
          <Title><h1>Welcome to gallery</h1></Title>
            <div className="searchCont">
            <input type="text" 
             onChange={(e) => this.filterCards(e.target.value)}
             placeholder="Search by card name"/>
            <button><FontAwesomeIcon icon={faSearch} />Search</button>
            </div>
        </div>

        <div className="itemsContHomepage">
            {this.state.allItems && this.state.allItems.map((e) => (
                <Item item={e} key={e.itemID} role={''} 
                addToFav={this.addtoFavorites} 
                onEditClick={(item: ItemType) => this.props.onEditClick(item)} 
                onDeleteClicked={this.deleteItem} />
            ))}
        </div>
          <Footer />
      </>
    );
  }

}

export default Homepage;
