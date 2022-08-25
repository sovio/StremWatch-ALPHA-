import React from "react";

export default function Item(props) {
    return(
        <div 
            className={`${props.name} ChatBoxItem`} 
            onClick={ () => {
                document.querySelectorAll('.BoxC').forEach(e => {
                    e.style.visibility = 'hidden'
                });
                document.getElementsByClassName(`${props.box}`)[0].style.visibility = 'visible';
            }}
            >{props.name}
        </div>
    )
}