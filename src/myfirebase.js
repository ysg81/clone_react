import firebase from 'firebase/app'
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_APP_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};
// const firebaseConfig = {
// 	apiKey: 'AIzaSyCU9XAd0uLonizg8DRe61dQooKNP7Pj4Vw',
// 	authDomain: 'clonereact-32941.firebaseapp.com',
// 	projectId: 'clonereact-32941',
// 	storageBucket: 'clonereact-32941.appspot.com',
// 	messagingSenderId: '739645264148',
// 	appId: '1:739645264148:web:ff72809f770b4c18e23201',
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();