import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";

export default function Card(props) {

    const boxRef = useRef();
    useEffect(() => {
        gsap.set(boxRef.current, { opacity: 0, y:'100px'});
        gsap.to(boxRef.current, {duration: 0.5, opacity: 1, y:'0px', delay: props.Time});
    });

    return(
        <div className='Card' ref={boxRef} >
            <div className='Img-Card-Section'>
                <img src={`./Images/${props.Img}`} alt="" className="Card-Images"/>
            </div>
            <div className='Description-Card-Section'>
                <p className='Card-Description'>{props.Description}</p>
            </div>
        </div>
    )
}