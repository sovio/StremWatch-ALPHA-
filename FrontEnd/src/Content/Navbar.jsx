import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";

export default function Navbar() {
    const boxRef = useRef();
    useEffect(() => {
        gsap.set(boxRef.current, { opacity: 0 });
        gsap.to(boxRef.current, { opacity: 1 });
    });
    return(
        <nav className="navbar bg-light" ref={boxRef}>
            <div className="container-fluid">
                <div className="navbar-brand d-inline-block align-text-top">
                    <img src="./Images/BetaLogo.png" alt="" width="64" height="64" className="align-text-center StreamWatch-Logo Logo" /> 
                    <a className="LogoLink" href="/#"> <p id='Navbar-Logo-Tittle'>STREA/\/\</p><p style={{color: 'white'}}>\/\/ATCH</p> </a>
                </div>
                <div className="navbar-brand d-inline-block align-text-top Logos">
                <a className="GitHub-Logo" href="https://github.com/sovio"><img src="./Images/GitHubLogo.png" alt="" width="64" height="64" className="align-text-center Logo-Link Logo" /></a>
                <a href="https://discord.com/users/sovio#6133"><img src="./Images/DiscordLogo.png" alt="" width="64" height="64" className="align-text-center Logo-Link Logo" /></a>
                </div>
            </div>
        </nav>
    )
}