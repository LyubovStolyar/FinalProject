import './Title.css';

interface Props {
    text?: string;
    children?: React.ReactNode;
}

function Title(props: Props) {
    return ( 

    <div className="title">{props.children}</div>

     );
}

export default Title;