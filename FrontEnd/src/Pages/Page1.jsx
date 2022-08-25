import React, {useEffect} from "react"
import {io} from 'socket.io-client'
import { useNavigate } from "react-router-dom";
import '../Style/Page1.css'
import Navbar from "../Content/Navbar"
import VideoPlaceholder from "../Content/Page1/VideoPlaceholder"
import ChatBox from "../Content/Page1/ChatBox"

const socket = io()

function createCookie(userID){
    var date = new Date()
    date.setDate(date.getDate() + 1)
    var utcTime = date.toUTCString()
    document.cookie = `userID=${userID}; expires=${utcTime}`
}
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


export default function Page1() {
    let ID = new URLSearchParams(window.location.search).get('ID')
    let navigate = useNavigate();
    if(ID.length !== 12){
        navigate('/')
    }else{
        socket.emit('newRoom', ID)
    }
  
    useEffect(() => {
        if(!document.cookie){
            socket.emit('new-user', ID, (response) => {
                createCookie(response)
            })
        }
        setTimeout(() => {
            socket.emit('FirstCon', ID, getCookie('userID'))
        }, 1000);
    }); 
   
    return(
        <div id='App'>
            <div id="BackGround"></div>
            <Navbar />
            <div className="MainVideoContainer">
                <VideoPlaceholder 
                    socket = {socket}
                    RoomID = {ID}
                />
                <ChatBox 
                    socket = {socket}
                    RoomID = {ID}
                />
            </div>
        </div>
    )
}