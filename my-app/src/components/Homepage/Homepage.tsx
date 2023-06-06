import React from "react";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";
import Item from "../Item/Item";
import { getRequest } from "../../services/apiService";
import "./Homepage.css";
import Title from "../Title/Title";
import photo from "../../photo/IMG_4874.jpg";

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
          <img src={photo} alt="photo" className="headerHomepagePhoto" />
          <Title><h1>Welcome to gallery</h1></Title>
          <Search />
           
          </div>
          <div className="itemsContHomepage">
            {this.state.allItems && this.state.allItems.map((e) => (
                <Item item={e} key={e.itemID} addToFav={this.addtoFavorites} onEditClick = {(item : ItemType) => this.props.onEditClick(item)}role={''}/>
            ))}
          </div>
          <Footer />
      </>
    );
  }
}

export default Homepage;
