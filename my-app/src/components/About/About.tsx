import {useNavigate } from "react-router-dom";
import Title from "../Title/Title";

function About() {
    const navigate = useNavigate();

    function toHomePage(): void {
        navigate("/homepage");
    }

    return ( 
    
    <>
    <Title>
        <h1>Few worlds about me...</h1>
    </Title>
    
    <p> I'm photographer from Israel. I like trip, taken photo and given good mood for all who looking at my pictures.
Sometimes my hands want to create. After I have butterfly decor, candles, handpainted cups, gypsum letters, beads barrette, real touch flowers or something else..</p>
<p>So, welcome to my gallery.. and enjoy</p>
<button onClick={toHomePage}>To homepage</button>
    </> );
}

export default About;