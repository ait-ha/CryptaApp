import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import ReactDOM from "react-dom/client";
import Cours from './components/Cours';
import Portfolio from './components/Portfolio';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="container-2">
        <Routes>
       
          <Route path="/" element={<Marketplace />}/> 
          <Route path="/cours" element={<Cours />}/>
          <Route path="/nftPage" element={<NFTPage />}/>   
          <Route path="/portfolio" element={<Portfolio />}/>
          <Route path="/sellNFT" element={<SellNFT />}/>             
        </Routes>
    </div>
  );
}

export default App;
