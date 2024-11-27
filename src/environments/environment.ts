// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// // DEV

export const environment = {
  baseUrl:'https://api-pharmplug.onrender.com/api/',
  localhost:'http://localhost:9000/api/',
  production: false,
  defaultauth: 'firebase',
  firebaseConfig : {
    apiKey: "AIzaSyAYFbul6xaPo_9jPX15JQXxxALLx9PKjgU",
    authDomain: "pharmplug-67420.firebaseapp.com",
    projectId: "pharmplug-67420",
    storageBucket: "pharmplug-67420.appspot.com",
    messagingSenderId: "719386604068",
    appId: "1:719386604068:web:5f85c6e8dea4af08acdeb1",
    measurementId: "G-JYJY9DD8WC"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
