import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../NFTCollection.json";
import axios from "axios";
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player'
import flecheGauche from '../image-53@2x.png';
import flecheDroite from '../fleche-droite@2x.png';


export default function Cours() {

    const [index, setIndex] = useState(0);

    let urls = [{"url": '1_video.mp4', "descr": "Vidéo 1/2 : Présentation générale de Crypta-", "poster":'./media/1_video.png'},
    {"url": "https://www.youtube.com/watch?v=jAa_qGb83Rg", "descr": "Vidéo 2/2 : 2ème Video"}];
  
    function incrementIndex () {
      if (index < urls.length - 1) {
     setIndex(index + 1);
    }
    };
  
    function decrementIndex () {
      if (index > 0) {
      setIndex(index - 1);
    }
   };

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-row place-items-center mt-20">
        <img className="fleche-gauche" src={flecheGauche} alt="FLECHE GAUCHE" style={{cursor:"pointer"}} onClick={decrementIndex} />
        <div>
        
        <video controls
                    src={urls[index].url} width="820" />

        <p className="descriptif">{urls[index].descr}</p>
        </div>
        <img className="fleche-droite" src={flecheDroite} alt="FLECHE DROITE" onClick={incrementIndex} style={{cursor:"pointer"}}/>
        </div>            
    </div>
);

}