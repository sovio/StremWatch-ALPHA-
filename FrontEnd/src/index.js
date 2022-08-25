import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>      StrictMode doing bug with onProgress React player
   
   <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="Page1" element={<Page1 />} />
          <Route path="Page2" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
    
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
