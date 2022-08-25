import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InfoCard(props){
    gsap.registerPlugin(ScrollTrigger);
    const boxRef = useRef();
    useEffect(() => {
        gsap.set(boxRef.current, { opacity: 0, y:'100px'});
        gsap.to(boxRef.current, {
            scrollTrigger: boxRef.current,
            duration: 0.5, 
            opacity: 1, 
            y:'0px', 
            
    });
    });
    return(
        <div className='Info-Card' ref={boxRef}>
            <img src={`./Images/${props.Img}`} alt=""/>
            <div className='Info-Card-Text'>
                <p>{props.Nr}</p>
                <p>{props.Description}</p>
            </div>
        </div>
    )
}