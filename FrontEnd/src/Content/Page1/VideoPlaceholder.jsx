import React, {useState, useRef, useEffect} from "react";
import ReactPlayer from 'react-player'
import { Tooltip } from "@mui/material";
import Player from './Player'

let seeking = false
let count = 0

const format = (second) => {


    if (isNaN(second)) {
        return '00:00'
    }
    const date = new Date(second * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2,"0")
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
    }
    return `${mm}:${ss}`
}

export default function VideoPlaceholder(props) {

    function ValueLabelComponent(props) {
        const { children } = props;
        return (
          <Tooltip enterTouchDelay={0} placement="top" title={elapsedTime}>
            {children}
          </Tooltip>
        );
      }
      
    const handlePlayPause = () =>{
        //setState({...state, playing: !state.playing})
        props.socket.emit('PlayPause', ({Status: state.playing, RoomID: props.RoomID, time: playerRef.current.getCurrentTime()}))
    } 

    const handleVolumeChange = (e,newValue) => {
        setState({...state,volume:parseFloat(newValue/100),muted:newValue===0?true:false})
    }

    const handleVolumeSeekDown = (e,newValue) => {
        setState({...state,volume:parseFloat(newValue/100),muted:newValue===0?true:false})
    }

    const toggleFullScreen = () => {
        if(!FS){
            if (playerContainerRef.current.requestFullscreen) {
                playerContainerRef.current.requestFullscreen();
            } else if (playerContainerRef.current.webkitRequestFullscreen) { /* Safari */
                playerContainerRef.current.webkitRequestFullscreen();
            } else if (playerContainerRef.current.msRequestFullscreen) { /* IE11 */
                playerContainerRef.current.msRequestFullscreen();
            }
        }else{
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
          setState({...state, FS: !state.FS})
      
    }

    const handleProgress = (changeState) => {

        if (count > 1) {
            controlsRef.current.style.visibility = "hidden"
            count = 0
        }
        if (controlsRef.current.style.visibility === "visible") {
            count+=1
        }

        if (!seeking) {
            setState({ ...state, ...changeState})
        }
    }

    const handleSeekChange = (e, newValue) => {
        setState({ ...state, played: parseFloat(newValue / 100)})
    }

    const handleSeekMouseDown = () => {
        seeking = true
    }

    const handleSeekMouseUp = () => {
        seeking = false
        playerRef.current.seekTo(played) 
        props.socket.emit('ChangeSeekReq',({played: played, RoomID: props.RoomID}))
    }

    const handleMouseMove = () => {
        controlsRef.current.style.visibility = 'visible';
        count = 0
    }

    const Reset = () => {
        props.socket.emit('RemoveFilmDB', props.RoomID)
        setState(prevState => {
            return {
                ...prevState,
                playing: false,
                ActualPlaying: ''
            };
        }); 
    }

    const [state, setState] = useState({
        playing: false,
        volume: 0,
        FS: false,
        played: 0,
        ActualPlaying: ''
    })

    const {playing, volume, FS, played, ActualPlaying} = state
    
    const playerRef = useRef(null) 
    const playerContainerRef = useRef(null)
    const controlsRef = useRef(null)
    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00'

    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00'
    const elapsedTime = format(currentTime)
    const totalDuraion = format(duration)

    
    
    useEffect(()=>{
        props.socket.on('FilmTimeRequest', (obj) => {
            props.socket.emit('FilmTimeResponse', ({time: playerRef.current.getCurrentTime(), RoomID: props.RoomID, socketto:obj.socketto, delay: Date.now()}))
        })

        props.socket.on('PlayListUpdate', (e) => {
            setState(prevState => {
                return {
                    ...prevState,
                    playing: false,
                    ActualPlaying: e
                };
            }); 
        })

        props.socket.once('First-ConnectPlayListUpdate', (e) => {
            if(e.delay !== undefined) {
                let delayTime = (((Date.now()-e.delay)/1000)+((window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart)/1000))
                setTimeout(() => {
                    playerRef.current.seekTo(e.FilmRef.FilmTime+delayTime+0.5, 'seconds')
                }, 500);
                
            }else{
                setTimeout(() => {
                    playerRef.current.seekTo(e.FilmRef.FilmTime+0.5, 'seconds')
                }, 500);
            }
            
            setState(prevState => {
                return {
                    ...prevState,
                    ActualPlaying: e.Url,
                    playing: e.FilmRef.isPlay
                };
            }); 
        })

        props.socket.on('PlayPauseResponse', (e) => {
            setState(prevState => {
                return {
                  ...prevState,
                  playing: !e 
                };
            });           
        })

        props.socket.on('ChangeSeekRes', obj => {
            playerRef.current.seekTo(obj) 
        })

    }, [])

    return(
        <div className="Video">
            <div className="InputHolder">
                <div className="InfoInputBox">Playing now:</div>
                <div id='test1'></div>
                <input 
                    className="ValueInput" 
                    type="text" 
                    placeholder="Paste Link"
                    onKeyDown={(e)=>{
                        if (e.key==='Enter' && e.target.value !== '') {

                            props.socket.emit('AddFilm', ({Url: e.target.value, RoomID: props.RoomID}))

                            setState(prevState => {
                                return {
                                    ...prevState,
                                    ActualPlaying: e.target.value,
                                    playing: false
                                };
                            });
                            setTimeout(() => {
                                playerRef.current.seekTo(0, 'seconds')
                            }, 500);
                        }
                    }
                }/>
                 
            </div>
            <div ref={playerContainerRef} className="PlayerWrapper" onMouseMove={handleMouseMove}>
                <ReactPlayer 
                    ref = {playerRef}
                    width = {'100%'}//{'1280px'}
                    height = {'100%'}//{'720px'}
                    url = {ActualPlaying}
                    muted = {false}
                    playing = {playing}
                    volume = {volume}
                    onProgress = {handleProgress}
                    onEnded = {Reset}
                />

                 <Player
                    ValueLabelComponent = {ValueLabelComponent}
                    handleSeekChange = {handleSeekChange}
                    handleSeekMouseDown = {handleSeekMouseDown}
                    handleSeekMouseUp = {handleSeekMouseUp}
                    handlePlayPause = {handlePlayPause}
                    toggleFullScreen = {toggleFullScreen}
                    handleVolumeChange = {handleVolumeChange}
                    handleVolumeSeekDown = {handleVolumeSeekDown}
                    played = {played}
                    playing = {playing}
                    volume = {volume}
                    elapsedTime = {elapsedTime}
                    totalDuraion = {totalDuraion}
                    FS = {FS}
                    controlsRef = {controlsRef}
                />
            </div>
        </div>
    )
}

/* KOX INDYJCZYK 
https://www.youtube.com/watch?v=fIYr8hbos_4&list=PL4OKShK9gkQca9QVqmnPMzT6QYM2LHaqt&index=2
npm install @mui/material @emotion/react @emotion/style
npm install @mui/icons-material
npm install react-player
*/