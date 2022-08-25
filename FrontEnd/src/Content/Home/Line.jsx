import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default function Line(props) {
    gsap.registerPlugin(ScrollTrigger);
    const boxRef = useRef();

    // wait until DOM has been rendered
    useEffect(() => {
        gsap.set(boxRef.current, { opacity: 0 });
        gsap.to(boxRef.current, { scrollTrigger: boxRef.current, opacity: 1, delay: 0});
    });

    return(
        <div className="Line-Body" ref={boxRef}>
            <div className="Line" />
            <p className='Line-Text'>{props.Description}</p>
            <div className="Line" />
        </div>
    )
}