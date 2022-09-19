

import './circle.css'


export default function PageCircles(props){


    return (
        <span className="circle-wrapper">
            <span className="badge"> {props.children}</span>
        </span>
        
    )
}