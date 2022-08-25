import React from "react";
import Grid from '@mui/material/Grid'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export default function Player(props) {

    const PrettoSlider = styled(Slider)({
        color: 'blue',
        height: 8,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 12,
          background: 'unset',
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: '50% 50% 50% 0',
          backgroundColor: '#52af77',
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          '&:before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      });

    return(
        <div className="ControlsWrapper" ref={props.controlsRef}>
        <Grid className="TimeSlider" item xs={12} paddingLeft={2} paddingRight={2}>
            <PrettoSlider
            min={0}
            max={100}
            value={props.played * 100}
            valueLabelDisplay="auto"
            components={{ ValueLabel: props.ValueLabelComponent }}
            onChange={props.handleSeekChange}
            onMouseDown={props.handleSeekMouseDown}
            onMouseUp={props.handleSeekMouseUp}
            />
        </Grid>
    
        <Grid container display='flex'  justifyContent={'space-between'}>
            <Grid className="LeftContainer" display={'flex'}>
                <Grid position='relative' >
                    <IconButton className="button" onClick={props.handlePlayPause}>
                        {props.playing ? (<PauseIcon fontSize="large" />):(<PlayArrowIcon fontSize="large" />)}
                    </IconButton>
                </Grid>
                <Grid className="VolumeBox">
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <VolumeDown style={{color: 'white'}} />
                                <Slider 
                                aria-label="Volume" 
                                value={props.volume *100} 
                                onChange={props.handleVolumeChange} 
                                onChangeCommitted={props.handleVolumeSeekDown}
                                
                                />
                            <VolumeUp style={{color: 'white'}}/>
                        </Stack>
                    </Box>
                </Grid>
            
                <Button variant="text" style={{ color: '#fff', marginLeft: 16}}>
                    <Typography> {props.elapsedTime}/{props.totalDuraion}</Typography>
                </Button>
            </Grid>
            <Grid className="RightContainer" display={'flex'}>
                    <IconButton onClick={props.toggleFullScreen} className="FullScreenButton button">
                        {!props.FS?(<FullscreenIcon fontSize="large"/>):(<FullscreenExitIcon fontSize="large"/>)}
                    </IconButton>
            </Grid>
        </Grid>
    </div>
    )
   
}