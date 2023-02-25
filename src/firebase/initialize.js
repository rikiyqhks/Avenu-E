/* ↓Firebase Imports ALL */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

/* ↓Firebase Config */
const firebaseConfig = {
    apiKey: 'AIzaSyDWCkNzZ2f3AuOp4AqgxgiI8G1XtF6HIHo',
    authDomain: 'avenu-e.firebaseapp.com',
    projectId: 'avenu-e',
    storageBucket: 'avenu-e.appspot.com',
    messagingSenderId: '243220346607',
    appId: '1:243220346607:web:634461e975371e8b4c4d1a',
    measurementId: 'G-RR5TS96545',
};

/* ↓Firebase Initialization */
try {
	firebase.initializeApp(firebaseConfig);
	firebase.firestore();
} catch (err) {
	console.log('Firebaseの初期化中にエラーが発生しました。', err);
}

export default firebase;