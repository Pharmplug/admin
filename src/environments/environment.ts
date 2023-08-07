// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// // DEV

export const environment = {

  production: false,
  defaultauth: 'firebase',
   firebaseConfig : {
    apiKey: "",
    serverKey:'',
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "o",
    messagingSenderId: "730399970440",
    appId: "",
    measurementId: "G-1S7N0GX1D6"
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.



//PROD


// export const environment = {
//   production: false,
//   defaultauth: 'firebase',
//   testnet: {
//     BOTURL: "https://friendbot.stellar.org",
//     HORIZON: "https://horizon-testnet.stellar.org",
//     NETWORK_PASSPHRASE: "Test SDF Network ; September 2015",
//     ISSUER_PUB: "GADIJX2LINAXDID5GAWYMTGT35MEGTULI32MSWOMGPA5MQY7URZDYWJD",
//     ISSUER_SECRET: "SCLQCWFTQIYAMHLQKDUWG6YTAW3GTY5AUNDHAZRNRYB2VRRJ3COOKDV3",
//     DIST_PUB: "GBCGXKJMUTHABGLP2EM2MXWJTBH5DB73X3KGAOBXDFKTPGEBEBTI2MEU",
//     DIST_SECRET: "SCDJBWGWXKKPOJC6SKLHHTU73DHX4CCLAIUGSPKYTWUP7HZQKIYIXBUK",
//     ASSET: "USDO",
//     DOMAIN: "bc.sandbox.orokii.com",
//     POOL_PUB: "GDBIVFOVI5NWPNWZ5VSPH7XOEMV3BFDSJEK35YWSB7TZYXR3WHF7B4HF",
//     POOL_SECRET: "SBL3FNFH2DVIP3VRYZDX65NXPAKQNXZM4QPUBDYG352NDJZ4KGTVPXFU"
//   },
//   firebaseConfig: {
//     serverKey: 'key=AAAA53dS2WQ:APA91bEegm2TQIuTcXCaRb4NhUdprrPCj-ynSvSvjpSJtAS8yAn2-VUmz2qPL74ySiXIn1lNkH-TS5ODjraesZuCZK_QfFznMA3EhOQG1STUTSCnqPaYXKk98HgKpb63T39m7O8oco1I',
//     apiKey: "AIzaSyCXRwLXpXjmIMZ2AO38yk8opQvM3wSM0Qg",
//     authDomain: "osupa-prod.firebaseapp.com",
//     projectId: "osupa-prod",
//     storageBucket: "osupa-prod.appspot.com",
//     messagingSenderId: "994139363684",
//     appId: "1:994139363684:web:7d8f3cde7d41d397208271",
//     measurementId: "G-C5GPB1CLTT"
//   },
//   loginAllow: ["bisi.adedokun@orokii.com", "sonu5650@gmail.com"],
//   status: [{ code: "0", name: 'Hold' }, { code: "1", name: 'Active' }, { code: "2", name: 'Suspend' }],
//   kycStatus: [{ code: "0", name: 'Hold' }, { code: "1", name: 'Approve' }, { code: "2", name: 'Deny' }, { code: "3", name: 'Suspend' }],
//   depositStatus: [{ code: "0", name: 'incomplete' }, { code: "1", name: 'pending_user_transfer_start' }, { code: "2", name: 'pending_external' }, { code: "3", name: 'pending_anchor' }, { code: "4", name: 'pending_stellar' }, { code: "5", name: 'pending_trust' }, { code: "6", name: 'pending_user' }, { code: "7", name: 'completed' }, { code: "8", name: 'no_market' }, { code: "9", name: 'too_small' }, { code: "10", name: 'too_large' }, { code: "11", name: 'error' }],
//   withdrawalStatus: [{ code: "0", name: 'pending_sender' }, { code: "1", name: 'pending_stellar' }, { code: "2", name: 'pending_customer_info_update' }, { code: "3", name: 'pending_transaction_info_update' }, { code: "4", name: 'pending_receiver' }, { code: "5", name: 'pending_external' }, { code: "6", name: 'completed' }, { code: "7", name: 'error' }],
//   assetInfo: { 'tiker': 'USDO', 'issuer': 'GDTFDAGZ5GSXWTKJGUMP2D5JD4WBEZEFAH2Q2U7YAUZPFNM6M4J32HWR', 'distributor': 'GBYYWKVST3FMFEIHEYEKVJBYFW5GXWUVL737A6HU4XUVZZUY2B4TNQ5M', 'distbsecret': 'SATDVSTYMUJRTDWPPP64KDKSPTEDB7CNO76AJI6NKCJS37B53LFCOS4L' },
//   horizonUrl: 'https://horizon.stellar.org',
//   newKycStatus: ["ACCEPTED", "PROCESSING", "REJECTED", "NEEDS_INFO"],
//   newKycVerification: ["ACCEPTED", "PROCESSING", "REJECTED", "NEEDS_INFO", "VERIFICATION_REQUIRED"],
//   apiURL: "https://sepapi.orokii.com",
//   imageURL: "https://sepapi.orokii.com/uploads/",
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
