import { initializeApp } from '@firebase/app';
import { getFirestore, Firestore } from '@firebase/firestore';
import { getAuth, Auth } from '@firebase/auth';

export {FirebaseProvider, FirebaseContext} from './FirebaseProvider';

const firebaseConfig = {
  /* cSpell:disable */
  apiKey: 'AIzaSyC5MvMfEeebh3XxyzYSD3qWpFR0aAAXSHM',
  authDomain: 'expo-bca-app.firebaseapp.com',
  databaseURL: 'https://expo-bca-app-default-rtdb.firebaseio.com',
  projectId: 'expo-bca-app',
  storageBucket: 'expo-bca-app.appspot.com',
  messagingSenderId: '248104656807',
  appId: '1:248104656807:web:853cad16b8fa38dbee2082',
  measurementId: 'G-EL12CDVSCR',
};

let dbOut:Firestore;
let authOut:Auth;

export const init = () => {
  const app = initializeApp(firebaseConfig);
  dbOut = getFirestore(app);
  authOut = getAuth(app);
}

export * from './hooks/seasonUpdateHooks';
export * from './hooks/matchupFetchHooks';
export * from './hooks/playerFetchHooks';
export * from './hooks/scheduleUpdateHooks';
export * from './hooks/seasonFetchHooks';
export * from './hooks/seasonUpdateHooks';
export * from './hooks/teamFetchHooks';
export * from './hooks/teamToPlayerOperations';
export * from './hooks/teamUpdateHooks';
export { useAuth } from './hooks/useAuth';
export * from './Auth';
export * from './types';
export * from './constants/messages';
export { dbOut as db, authOut as auth };

