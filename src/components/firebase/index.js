import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyCOMdGjtzRu8H28DbNNvMZezEKB_pcrdeI',
  authDomain: 'drive-clone-83fc1.firebaseapp.com',
  projectId: 'drive-clone-83fc1',
  storageBucket: 'drive-clone-83fc1.appspot.com',
  messagingSenderId: '973160070142',
  appId: '1:973160070142:web:eec435470f10ef3bc85eaf',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {db, storage, auth, provider}
