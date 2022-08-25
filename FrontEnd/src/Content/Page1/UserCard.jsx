import React from "react";

export default function UserCard (props) {
    return(
        <div className="UserCard">
            <div className="UserNick">Nick: {props.nick}</div>
            <div className="UserAvatar"><img src={`Images/avatars/${props.avatar}`} alt=''/></div>
        </div>
    )
}