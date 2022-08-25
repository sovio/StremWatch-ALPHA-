import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function createID (len) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < len; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function NavbarDescription() {
    const boxRef = useRef();

    useEffect(() => {
        gsap.set(boxRef.current, {x:'-200px', opacity: 0 });
        gsap.to(boxRef.current, {duration: 1, x:'0px', opacity: 1, delay: 0.5 });
    });
    let navigate = useNavigate();

    const goToRoom = () =>{
       navigate(`/Page1?ID=${createID(12)}`)
    }
    return(
        <div className='Main-Container'>
            <div className='BoxOne' ref={boxRef}>
                <p>Start a stream and enjoy videos<br /> with your Friends!</p>
                <button id="Create-Room-Button" onClick={goToRoom}>Create a New Room</button>
            </div>
        </div>
                
              

    )
}