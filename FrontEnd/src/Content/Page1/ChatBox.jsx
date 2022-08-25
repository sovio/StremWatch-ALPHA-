import React, {useRef, useState, useEffect } from "react";
import { ChatBoxItem } from "../Data";
import ChatTopItems from './ChatTopItems'
import CreateMassage from './CreateMassage.jsx'
import UserCard from "./UserCard";




function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


export default function ChatBox(props) {  

    const InputRef = useRef(null) 
    
    const [people, setPeople] = useState([])
    const [nick, setNick] = useState()
    const [avatar, setAvatar] = useState()
    const [massagearray, setArray] = useState([])
    const [state, setState] = useState({
        id: 0
    }) 
    
    useEffect(()=>{
        
        props.socket.on('PeopleUpdate', (obj) => {
            setPeople( obj ) 
        })

        props.socket.on('First-Connect', (obj) => {
            setNick( obj.nick )
            setAvatar( obj.avatar )
        }) 

        props.socket.on('receive-message',(obj) => { 
                AddMassage(obj)
                setState({...state, id: state.id++})
        })
    }, [])
    
    function AddMassage (obj) {
        var today = new Date();
        
        setArray(current => [...current, {
            sender: obj.id === getCookie('userID') ? true:false, 
            author: `${obj.Nick}`, 
            content: `${obj.message}`, 
            date: `${today.getHours()}:${today.getMinutes()}`, 
            ico: `${obj.avatar}`, 
            id: `${state.id}${obj.Nick}${obj.message}${today.getMinutes()}${today.getSeconds()}`
        }])
    }

    const ChatBoxItems = ChatBoxItem.map( el => {
        return(
            <ChatTopItems
                name = {el.Name}
                box = {el.BoxShower}
                key = {el.Name}
            />
        )
    })

    const Massage = massagearray.map((el) => {
        return (
            <CreateMassage 
                value = {el.content}
                author = {el.author}
                date = {el.date}
                ico = {el.ico}
                key = {el.id} 
                sender = {el.sender}
            />
        )
    })   

    const People = people.map((el) => {
        return (
            <UserCard 
            avatar = {el.Avatar}
            nick = {el.UserNickName}
            key = {el.UserID}
            />
        )
    })

    return(
        <div className="ChatBox">
            <div className="ChooseChatBox">
                {ChatBoxItems}
            </div> 
            <div className="MessageContainer BoxC">
                <div className="NickBox">
                    <div className="NickInfoBox">
                        Your Nick:
                    </div>
                    <input 
                    ref={InputRef}
                    className={"NickInput"}
                    defaultValue={nick}
                    maxLength = "10"
                    onKeyDown={
                        (e) => {
                            if (e.key === 'Enter' && e.target.value !== '' && e.target.value !== nick) {
                                setNick( e.target.value )
                                props.socket.emit('NickUpdate', ({ NewNick: e.target.value , RoomID: props.RoomID, socket: getCookie('userID')}))
                            }
                        }
                    }
                    />
                </div>
                <div className="MassagesBox" >
                  {Massage}
                </div>
                <div className="SendMassageInputBox">
                    <input 
                        className="SendMassageInput"
                        placeholder="Send message"
                        onKeyDown={
                            (e) => {
                                if (e.key==='Enter' && e.target.value!=='') {
                                    setState({...state, id: state.id+1})
                                    AddMassage({id: getCookie('userID'), message: e.target.value, Nick: InputRef.current.value, avatar: avatar})
                                    props.socket.emit('send-message', {message:e.target.value, id: getCookie('userID'), RoomID: props.RoomID})
                                    e.currentTarget.value = ''
                                }
                        }}
                    />
                </div>
            </div>
            <div className="PlaylistContainer BoxC">Work in Progress :)</div>
            
            <div className="PeopleContainer BoxC"><div className='PeopleBox'>{People}</div></div>
        </div>
    )
}