import React, {useRef, useEffect} from "react";

const CreateMassage = (props) => {

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom);

    return(
        <div className={`${props.sender?`MassageMainBox`:`MassageMainBoxGuess`}`}>
            <div className="avatarbox">
                <img className="avatarico" src={`Images/avatars/${props.ico}`} alt=''/>
            </div>
                <div className="bubble bubble-bottom-left">
                    <div className="DataMassageHolder">
                        <div className="NickHolder">{props.author}</div>
                        <div className="DateHolder">{props.date}</div>
                    </div>
                    <div className="MassageContent">{props.value}</div>
                </div>
            <div ref={messagesEndRef} />
        </div>
    )
}

export default CreateMassage