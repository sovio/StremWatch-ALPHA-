import React from "react"
import '../Style/Page1.css'
import Navbar from "../Content/Navbar"

export default function Page1() {
    function handleClick() {
        fetch('/page2/clicks')
        .then((response) => response.json())
        .then((data) => console.log(data));
    };
    function handleGetID() {
        fetch('/page2/getid')
        .then((response) => response.json())
        .then((data) => console.log(data));
    };
    return(
        <div id='App'>
            <Navbar />
            <button onClick={handleClick}>Click Me!</button>
            <button onClick={handleGetID}>Give me my ID!</button>
        </div>
    )
}