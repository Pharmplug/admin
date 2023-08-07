// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// // DEV

export const environment = {
  testnet:{
    BOTURL:"https://friendbot.stellar.org",
    HORIZON:"https://horizon-testnet.stellar.org",
    NETWORK_PASSPHRASE:"Test SDF Network ; September 2015",
    ISSUER_PUB:"GADIJX2LINAXDID5GAWYMTGT35MEGTULI32MSWOMGPA5MQY7URZDYWJD",
    ISSUER_SECRET:"SCLQCWFTQIYAMHLQKDUWG6YTAW3GTY5AUNDHAZRNRYB2VRRJ3COOKDV3",
    DIST_PUB:"GBCGXKJMUTHABGLP2EM2MXWJTBH5DB73X3KGAOBXDFKTPGEBEBTI2MEU",
    DIST_SECRET:"SCDJBWGWXKKPOJC6SKLHHTU73DHX4CCLAIUGSPKYTWUP7HZQKIYIXBUK",
    ASSET:"USDO",
    DOMAIN:"bc.sandbox.orokii.com",
    POOL_PUB:"GDBIVFOVI5NWPNWZ5VSPH7XOEMV3BFDSJEK35YWSB7TZYXR3WHF7B4HF",
    POOL_SECRET:"SBL3FNFH2DVIP3VRYZDX65NXPAKQNXZM4QPUBDYG352NDJZ4KGTVPXFU",
    tt:""
  },
  production: false,
  defaultauth: 'firebase',
   firebaseConfig : {
    apiKey: "AIzaSyCKl38SOOLcLZC4tLplCDRUotXPa5EYo9Y",
    serverKey:'key=AAAAqg87FIg:APA91bEQEPcHmWOpx-VT40TyoyXPXfwo-6JIBwnRHiXby3Z4rOjfotfVu6U-daglXUDVdR40GYPM5B7oO2RFwiJ0gNjBP54nQEuCKtNzRw8c3WvF-gfH8dHn-E1Zqop31uQ60OC-gDZp',
    authDomain: "osupa-f56dd.firebaseapp.com",
    databaseURL: "https://osupa-f56dd.firebaseio.com",
    projectId: "osupa-f56dd",
    storageBucket: "osupa-f56dd.appspot.com",
    messagingSenderId: "730399970440",
    appId: "1:730399970440:web:1716fc4df20e6f62233b3d",
    measurementId: "G-1S7N0GX1D6"
  },

  status:[{code:"0",name:'Hold'},{code:"1",name:'Active'},{code:"2",name:'Suspend'}],
  kycStatus:[{code:"0",name:'Hold'},{code:"1",name:'Approve'},{code:"2",name:'Deny'},{code:"3",name:'Suspend'}],

  depositStatus:[{code:"0",name:'incomplete'},{code:"1",name:'pending_user_transfer_start'},{code:"2",name:'pending_external'},{code:"3",name:'pending_anchor'},{code:"4",name:'pending_stellar'},{code:"5",name:'pending_trust'},{code:"6",name:'pending_user'},{code:"7",name:'completed'},{code:"8",name:'no_market'},{code:"9",name:'too_small'},{code:"10",name:'too_large'},{code:"11",name:'error'}],

  withdrawalStatus:[{code:"0",name:'pending_sender'},{code:"1",name:'pending_stellar'},{code:"2",name:'pending_customer_info_update'},{code:"3",name:'pending_transaction_info_update'},{code:"4",name:'pending_receiver'},{code:"5",name:'pending_external'},{code:"6",name:'completed'},{code:"7",name:'error'}],
  assetInfo:{'tiker':'USDT','issuer':'GADIJX2LINAXDID5GAWYMTGT35MEGTULI32MSWOMGPA5MQY7URZDYWJD','distributor':'GBCGXKJMUTHABGLP2EM2MXWJTBH5DB73X3KGAOBXDFKTPGEBEBTI2MEU','distbsecret':'SCDJBWGWXKKPOJC6SKLHHTU73DHX4CCLAIUGSPKYTWUP7HZQKIYIXBUK'},
  horizonUrl:'https://horizon-testnet.stellar.org',
  newKycStatus:["ACCEPTED","PROCESSING","REJECTED","NEEDS_INFO"],
  newKycVerification:["ACCEPTED","PROCESSING","REJECTED","NEEDS_INFO","VERIFICATION_REQUIRED"],
  apiURL:"https://bc.apitest.orokii.com",
  imageURL:"https://bc.sandbox.orokii.com/uploads/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.




import 'zone.js/dist/zone-error';  // Included with Angular CLI.
