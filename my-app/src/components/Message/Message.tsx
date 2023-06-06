import React from "react";

interface Props {
    children?: React.ReactNode;
}

function Message(props: Props) {
    return ( 

     <div>
        <p>{props.children}</p>
     </div>

     );
}

export default Message;