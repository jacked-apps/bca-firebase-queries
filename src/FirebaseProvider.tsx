import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';

type FirebaseContextParams = {
  db: Firestore | null;
  auth: Auth | null;
};

type FirebaseProviderProps = {
  credentials: Object;
};

export const FirebaseContext = createContext<FirebaseContextParams>({
  db: null,
  auth: null,
});

export const FirebaseProvider = ({
  children,
  credentials,
}: PropsWithChildren<FirebaseProviderProps>) => {
  const [initialized, setInitialized] = useState(false);
  const [db, setDb] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const app = initializeApp(credentials);
    const db = getFirestore(app);
    const auth = getAuth(app);
    if (db !== null && auth !== null) {
      setDb(db);
      setAuth(auth);
      setInitialized(true);
    }
    //make sure db and auth are not null and are of type Firestore and Auth
    //set an initialized flag
  }, [credentials]);
  return (
    <FirebaseContext.Provider value={{ db, auth }}>
      {initialized && <>{children}</>}
    </FirebaseContext.Provider>
  );
};
