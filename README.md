# Crypta Dapp

Projet Dapp avec un front fait en React et un back avec un contrat Solidity.

Le front permet d'intéragir avec le contract par le biais d'une interface web.

Toutes les fonctionnalités du contrat sont utilisable via le front.

## Links

Voici la [vidéo démo]() de la Dapp !  
Voici le [lien de déploiement]() de la Dapp !

## Composants

L'interface est découpé en plusieurs composants :

- App => Composant racine qui dispose les sous composants
- Cours => Affiche les videos des cours destinés aux apprenants
- Marketplace => Affiche la liste des NFTs exposés
- Navbar => Barre de navigation qui contient les liens vers les différents composants
- Portfolio => La page qui affiche les NFT du compte connecté
- SellNFT => La page de création/exposition des NFTs
- NFTpage => Fiche descriptive du NFT
- NFTTile => Liste des NFT

## Déploiement

A déployer sur Goerli 

## Utilisation

git clone  
npm install
npx hardhat run scripts/deploy.js --network goerli
npm start  

## Screenshot

![image](https://user-images.githubusercontent.com/45956179/203595320-bf675745-9017-417e-8708-ae96f2de20a1.png)
