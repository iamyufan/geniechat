// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCCJDxrU6yGXFzrpKQd9V1Pp7c_3R7ZG3c',
  authDomain: 'mern-chat-app-86ec0.firebaseapp.com',
  projectId: 'mern-chat-app-86ec0',
  storageBucket: 'mern-chat-app-86ec0.appspot.com',
  messagingSenderId: '344041508332',
  appId: '1:344041508332:web:837e0cad27de16e68604c9',
  measurementId: 'G-QH07EYKWQM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export default firebaseAuth;
