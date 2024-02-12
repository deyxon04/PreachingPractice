Create new "environment.ts" file in the path "src/environments" and add:

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: 'your apikey of firebase',
    authDomain: 'your_domain.firebaseapp.com',
    projectId: 'your_project_id',
    storageBucket: 'your_storageBucket',
    messagingSenderId: 'your_messagingSenderId',
    appId: 'your_appId',
  },
  
};
