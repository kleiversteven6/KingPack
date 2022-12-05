/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: 'AIzaSyBH9OoBFeuKkL2bN1IY9IGtyqjJNKYWdqA',
  authDomain: 'url-shorts-cba3b.firebaseapp.com',
  projectId: 'url-shorts-cba3b',
  storageBucket: 'url-shorts-cba3b.appspot.com',
  messagingSenderId: '823864210284',
  appId: '1:823864210284:web:517a54a4189c7b529a3949',
  measurementId: 'G-VSNBLKNJ0W',
};

initializeApp(firebaseConfig);

export const db = getFirestore();
