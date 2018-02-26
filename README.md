<p align="center">
  <img
    src="https://avatars2.githubusercontent.com/u/36809299?s=200&v=4"
    width="125px;">
</p>

<h1 align="center">Generion mobile client</h1>

### 1.	Patient’s mobile app

The app includes following functionality:
- User registration and authorisation
- Key pair creation
- Creation and uploading public keys using QR-code scanner. 
- Creation and uploading electronic medical records, choosing the access key. 
- Creation of public access keys for data sharing 
- Ability to sell personal data for tokens.

[Youtube Demo](http://ddi-lab.com/coz-2018-client-demo.html)



### 2.	Run

Generion is blockchain-based, decentralized infrastructure for safe and anonymous storing, using and sharing personal data. The current MVP is aimed to healthcare domain. However, the architecture can be used in any sphere that accumulates and operates user’s personal information.

Install node (https://nodejs.org/en/download/)
Install cocoapods (https://cocoapods.org/)

In console in project dir run:
- npm install
- cd ios
- pod install
- cd ..
- react-native link
- react-native run-ios
