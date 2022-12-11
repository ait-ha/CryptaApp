// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTCollection is ERC721URIStorage {

    using Counters for Counters.Counter;

    address payable owner;

    //le dernier tokenId minté
    Counters.Counter private _tokenId;

    //Nombre d'items soldés sur marketplace 
    Counters.Counter private _tokensSold;

    //Frais d'exposition sur markeplace 
    uint256 exposePrice = 0.01 ether;

    //structure pour stocker les infos du NFT exposé 
    struct ExposedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyExposed;
    }

    //Event déclenché quand le NFT est exposé avec succés
    event TokenExposedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyExposed
    );

    //Mapper le tokenId à NFT
    mapping(uint256 => ExposedToken) private idToExposedToken;

    constructor() ERC721("NFTCollection", "CTY") {
        owner = payable(msg.sender);
    }

    function getOwner() public view virtual returns (address) {
        return owner;
    }

    /// @notice Utiliser cette fonction pour mettre a jour le prix d'exposition
    /// @dev Assigner le prix d'exposition.
    /// @param _Price nouveau prix d'exposition
    function updateExposePrice(uint256 _Price) public payable {
        require(owner == msg.sender, "Seulement le owner peut mettre a jour le prix");
        exposePrice = _Price;
    }

    /// @notice Renvoie le prix d'exposition
    function getExposePrice() public view returns (uint256) {
        return exposePrice;
    }

    /// @notice Renvoie le tokenId du dernier NFT exposé
    function getLatestIdToExposedToken() public view returns (ExposedToken memory) {
        uint256 currentTokenId = _tokenId.current();
        return idToExposedToken[currentTokenId];
    }

    /// @notice Renvoie le token correnspondant a un tokenId
    /// @param tokenId l'identifiant du token
    function getExposedTokenForId(uint256 tokenId) public view returns (ExposedToken memory) {
        return idToExposedToken[tokenId];
    }

    /// @notice Renvoie l'identifiant du dernier NFT minté 
    function getCurrentToken() public view returns (uint256) {
        return _tokenId.current();
    }


    /// @notice créer le NFT et l'exposer pour la premiere fois sur le marketplace
    /// @dev Incrémenter le tokenId
    /// @dev Minter le NFT 
    /// @dev Associer l'URI avec le tokenId du NFT 
    /// @param tokenURI URI de l'item sur IPFS
    /// @param price le prix associé
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {

        //Incrémeter le compteur tokenId des NFTs mintés
        _tokenId.increment();
        uint256 newTokenId = _tokenId.current();

        //Minter le NFT avec newTokenId 
        _safeMint(msg.sender, newTokenId);

        //Mapper le tokenId avec tokenURI (URL IPFS avec NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Mise a jour des variables globales 
        createExposedToken(newTokenId, price);

        return newTokenId;
    }

    function createExposedToken(uint256 tokenId, uint256 price) private {
        //Tester si la valeur envoyée est suffisante 
        require(msg.value >= exposePrice, "Hopefully sending the correct price");
        //Check si le prix saisi est positif
        require(price > 0, "Make sure the price isn't negative");

        //Mettre a jour les détails du token 
        idToExposedToken[tokenId] = ExposedToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
        //Emmettre l'event en cas de succés
        emit TokenExposedSuccess(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }
    

    /// @notice Renvoie tous les NFTs exposés sur le marketplace
    /// @dev Construit un tableau de structures de token
    function getAllNFTs() public view returns (ExposedToken[] memory) {
        uint nftCount = _tokenId.current();
        ExposedToken[] memory tokens = new ExposedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ExposedToken storage currentItem = idToExposedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }

        return tokens;
    }
    

    /// @notice Renvoie tous les NFTs de l'utilisateur 
    /// @dev Construit un tableau de structures de token
    function getMyNFTs() public view returns (ExposedToken[] memory) {
        uint totalItemCount = _tokenId.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToExposedToken[i+1].owner == msg.sender || idToExposedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        ExposedToken[] memory items = new ExposedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToExposedToken[i+1].owner == msg.sender || idToExposedToken[i+1].seller == msg.sender) {
                currentId = i+1;
                ExposedToken storage currentItem = idToExposedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }


    /// @notice Transfert du NFT
    function purchase(uint256 tokenId) public payable {
        uint price = idToExposedToken[tokenId].price;
        address seller = idToExposedToken[tokenId].seller;
        require(msg.value >= price, "Please submit the asking price in order to complete the purchase");

        //Mettre à jour les details du NFT
        idToExposedToken[tokenId].currentlyExposed = true;
        idToExposedToken[tokenId].seller = payable(msg.sender);
        _tokensSold.increment();

        //Transfert le NFT au nouveau owner
        _transfer(address(this), msg.sender, tokenId);
        //Approuver le marketplace à vendre le NFT
        approve(address(this), tokenId);

        //Transfert des charges d'exposition de NFT pour l'adress marketplace 
        payable(owner).transfer(exposePrice);
        //Transfert de la valeur NFT au vendeur 
        payable(seller).transfer(msg.value);
    }

}
