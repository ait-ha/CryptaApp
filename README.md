# Crypta Dapp

Projet Dapp avec un front fait en React et un back avec un contrat Solidity.

Le front permet d'intéragir avec le contract par le biais d'une interface web.

Toutes les fonctionnalités du contrat sont utilisable via le front.

## Links

Voici la video [https://www.loom.com/share/085a6450b65347ee9a98568fd6c77453] de la Dapp !  
Voici le lien déploiement [https://crypta-app.vercel.app/] de la Dapp !

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

A déployer sur Goerli et tester la Dapp sur Chrome

## Utilisation

git clone  
npm install
npx hardhat run scripts/deploy.js --network goerli
npm start  


