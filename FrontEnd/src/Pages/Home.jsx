import React from 'react';
import '../Style/Home.css';
import Navbar from '../Content/Navbar';
import NavbarDescription from '../Content/Home/NavbarDescription';
import Fotter from '../Content/Fotter';
import Line from '../Content/Home/Line';
import Card from '../Content/Home/Card';
import { Card_Data, Info_Card_Data } from '../Content/Data'
import InfoCard from '../Content/Home/Box_Info';
function App() {

  const Cards = Card_Data.map( el => {
    return(
      <Card 
        Description = {el.Description}
        Time = {el.Time}
        Img = {el.Img}
        key = {el.key}
      />
    )
  })

  const Info_Card = Info_Card_Data.map( el => {
    return(
      <InfoCard 
        Nr = {el.Nr}
        Img = {el.Img}
        Description = {el.Description}
        key = {el.Nr}
      />
    )
  })

  return (
    
    <div className="App">
       <div id="BackGround"></div>
      <Navbar />
      <NavbarDescription />
      < Line 
        Description = {'Why StreamWatch?'}
      />
      <div className='Card-Container'>
        {Cards}
      </div>
      < Line 
        Description = {'Get Started!'}
      />
      <section id='Info-Container'>
       {Info_Card}
      </section>
      
      <Fotter />
    </div>
  );
}

export default App;
