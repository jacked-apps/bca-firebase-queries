// ------------------------------
// TABLE OF CONTENTS
// ------------------------------
// 1. Hooks
//    - useAddGamesToPlayer
// 2. FireBaseFunctions
//    - addGamesToPlayer

//------------------------
// IMPORTS
//------------------------

// react query
import { useMutation } from 'react-query';

// firebase

import {
  updateDoc,
  doc,
  setDoc,
  writeBatch,
  Firestore,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { GameOnPlayer } from '../types';
import { useContext } from 'react';
import { FirebaseContext } from '../FirebaseProvider';

// types

// ------------------------------
// 1. HOOKS
// ------------------------------

export const useAddGamesToPlayer = () => {
  // get database and mutation
  const { db } = useContext(FirebaseContext);
  const mutation = useMutation(addGamesToPlayerRQ);

  // addGames function
  const addGamesToPlayer = async (
    userId: string,
    gamesArray: GameOnPlayer[]
  ) => {
    // insure database is initialized
    if (db === null) {
      throw new Error('DB is not initialized');
    }
    mutation.mutate({ db, userId, gamesArray });
  };

  return { addGamesToPlayer, ...mutation };
};

// ------------------------------
// 2. FIREBASE FUNCTIONS
// ------------------------------

/**
 * Adds the provided array of GameOnPlayer objects to the
 * current user's document in Firestore by creating a batch
 * write. Writes the games to a collection named after the
 * game with spaces removed.
 *
 * @param db - The Firestore database instance
 * @param userId - The id of the user document to update
 * @param gamesArray - The array of GameOnPlayer objects to add
 */

export const addGamesToPlayerRQ = async ({
  db,
  userId,
  gamesArray,
}: {
  db: Firestore;
  userId: string;
  gamesArray: GameOnPlayer[];
}) => {
  const batch = writeBatch(db);
  const playerRef = doc(db, 'players', userId);
  gamesArray.forEach((gameObject) => {
    const gameCollectionName = `${gameObject.game.replace(/\s+/g, '')}Games`;
    const gamesCollection = collection(playerRef, gameCollectionName);
    const newGameRef = doc(gamesCollection);
    batch.set(newGameRef, gameObject);
  });
  await batch.commit().catch((error) => {
    throw error;
  });
};
