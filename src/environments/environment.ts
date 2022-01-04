// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint: 'https://heygrio-api.herokuapp.com/api/v1',
  server_host: 'https://heygrio-api.herokuapp.com',
  firebaseConfig: {
    apiKey: "AIzaSyCkpeAWbQsUwI6oVMU8vMb_sFD57t8GJec",
    authDomain: "heygrio-7decf.firebaseapp.com",
    databaseURL: "https://heygrio-7decf-default-rtdb.firebaseio.com",
    projectId: "heygrio-7decf",
    storageBucket: "heygrio-7decf.appspot.com",
    messagingSenderId: "787460043586",
    appId: "1:787460043586:web:7aa785db4f4565d7c04edb"
  },
};

/*
{
  endpoint: 'https://heygrio-api.herokuapp.com/api/v1',
  server_host: 'https://heygrio-api.herokuapp.com',
  endpoint: 'http://localhost:4000/api/v1',
  server_host: 'http://localhost:4000',
https://heygrio-api.herokuapp.com
http://localhost:4000
  apiKey: "AIzaSyCkpeAWbQsUwI6oVMU8vMb_sFD57t8GJec",
  authDomain: "heygrio-7decf.firebaseapp.com",
  databaseURL: "https://heygrio-7decf-default-rtdb.firebaseio.com",
  projectId: "heygrio-7decf",
  storageBucket: "heygrio-7decf.appspot.com",
  messagingSenderId: "787460043586",
  appId: "1:787460043586:web:7aa785db4f4565d7c04edb"
};
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
