import "./Message.css";

interface Props {
    message?: string;
}

function Message(props: Props) {
    return ( 

     <div className="messageBody">
        {props.message && <p>{props.message}</p>}
     </div>

     );
}

export default Message;