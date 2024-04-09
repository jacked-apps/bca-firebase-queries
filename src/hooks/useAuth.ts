import { useState, useEffect, useContext } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from '../';

export const useAuth = (): { user: User | null } => {
  const { auth } = useContext(FirebaseContext)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if(!auth) {
      return;
    }
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  return { user };
};
