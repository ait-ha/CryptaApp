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

    let urls = [{"url": '1_video.mp4', "descr": "Vidéo 1/5 : Présentation générale de Crypta-", "poster":'./media/1_video.png'},
    {"url": "https://youtu.be/jhtJ1zwAkQE", "descr": "Vidéo 2/5 : 2ème Video"},
    {"url": "https://youtu.be/0ETcLj5jBy4", "descr": "Vidéo 3/5 : 3ème Video"},
    {"url": "https://www.youtube.com/embed/phgdYixi6cI", "descr": "Vidéo 4/5 : 4ème Video"},
    {"url": "https://www.youtube.com/embed/phgdYixi6cI", "descr": "Vidéo 5/5 : 4ème Video"}];
  
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
  
  const [index, setIndex] = useState(0);

const sampleData = [
    {
        "name": "NFT#1",
        "description": "Alchemy's First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#2",
        "description": "Alchemy's Second NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#3",
        "description": "Alchemy's Third NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

  
    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
     
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-row place-items-center mt-20">
        <img className="fleche-gauche" src={flecheGauche} alt="FLECHE GAUCHE" style={{cursor:"pointer"}} onClick={decrementIndex} />
        <div>
        
        <video controls
                    src='1_video.mp4' width="820" />

        <p className="descriptif">{urls[index].descr}</p>
        </div>
        <img className="fleche-droite" src={flecheDroite} alt="FLECHE DROITE" onClick={incrementIndex} style={{cursor:"pointer"}}/>
        </div>            
    </div>
);

}