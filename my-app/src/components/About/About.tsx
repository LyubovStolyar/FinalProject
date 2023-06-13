import { Link, NavLink } from "react-router-dom";
import Title from "../Title/Title";
import "./About.css";
import myPhoto from "../../photo/MyPhoto.jpg";

function About() {
  return (
    <>
      <Title>
        <h1>Few worlds about me</h1>
      </Title>
      <div className="aboutPageCont">
        <img src={myPhoto} alt="author photo" className="authorPhoto" />
        <div>
          <p className="paragraphAbout">
            I'm photographer from Israel. I like trip, taken photo and given
            good mood for all who looking at my pictures. Sometimes my hands
            want to create. After I have butterfly decor, candles, handpainted
            cups, gypsum letters, beads barrette, real touch flowers or
            something else..
          </p>

          <p className="paragraphWelcome"> 
            <strong>So, welcome to my gallery.. and enjoy </strong>
          </p>
          <button className="homepageLinkButton">
          <NavLink to="/homepage" className="toHomepageLink">
            To homepage
          </NavLink>
          </button>
        </div>
      </div>
    </>
  );
}

export default About;
