import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Marketplace from './components/Marketplace';
import NFTPage from './components/NFTpage';
import Cours from './components/Cours';
import Portfolio from './components/Portfolio';

/*
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/cours" element={<Cours />}/>
        <Route path="/" element={<Marketplace />}/>
        <Route path="/sellNFT" element={<SellNFT />}/> 
        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/portfolio" element={<Portfolio />}/> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
//root.use(cors(corsOptions));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
