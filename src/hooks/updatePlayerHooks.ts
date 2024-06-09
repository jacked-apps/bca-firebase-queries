// ------------------------------
// TABLE OF CONTENTS
// ------------------------------
// 1. Hooks
//    - useCreatePlayer
//    - useUpdatePlayer
// 2. FireBaseFunctions
//    - createPlayerRQ
//    - updatePlayerRQ

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
  Firestore,
  collection,
  serverTimestamp,
  getDoc,
  addDoc,
} from 'firebase/firestore';
import { BarePlayer, Email, Player } from '../types';
import { useContext } from 'react';
import { FirebaseContext } from '../FirebaseProvider';
import { isValidEmail } from '../constants/functions';

// types

// ------------------------------
// 1. HOOKS
// ------------------------------

export const useCreatePlayer = () => {
  // get database and mutation
  const { db } = useContext(FirebaseContext);
  const mutation = useMutation(createPlayerRQ);

  // createPlayer function
  const createPlayer = async (
    userId: string,
    playerData: BarePlayer,
    onCreatePlayerSuccess?: () => void
  ) => {
    // insure database is initialized
    if (db === null) {
      throw new Error('DB is not initialized');
    }
    // call mutation
    mutation.mutate(
      { db, userId, playerData },
      {
        onSuccess: () => {
          onCreatePlayerSuccess?.();
        },
      }
    );
  };

  return { createPlayer, ...mutation };
};

export const useUpdatePlayer = () => {
  const { db } = useContext(FirebaseContext);
  const mutation = useMutation(updatePlayerRQ);
  const updatePlayer = async (
    playerId: string,
    playerData: Partial<Player>
  ) => {
    if (db === null) {
      throw new Error('DB is not initialized');
    }
    mutation.mutate({ db, playerId, playerData });
  };
  return { updatePlayer, ...mutation };
};

// ------------------------------
// 2. FIREBASE FUNCTIONS
// ------------------------------

/**
 * Adds a new player document to Firestore.
 *
 * @param db - The Firestore database object.
 * @param userId - The the id of the user to add.
 * @param playerData - The player data object to add.
 *
 */
export const createPlayerRQ = async ({
  db,
  userId,
  playerData,
}: {
  db: Firestore;
  userId: string;
  playerData: BarePlayer;
}) => {
  const playerRef = doc(db!, 'players', userId);
  await setDoc(playerRef, {
    ...playerData,
    isAdmin: false,
    leagues: [],
    seasons: [],
    teams: [],
  });
};

/**
 * Updates an existing player document in Firestore.
 *
 * @param db - The Firestore database object.
 * @param playerId - The name of the season to update.
 * @param playerData - The partial season data to update.
 */
export const updatePlayerRQ = async ({
  playerId,
  playerData,
  db,
}: {
  db: Firestore;
  playerId: string;
  playerData: Partial<Player>;
}) => {
  const playerRef = doc(db, 'players', playerId);
  await playerUpdateHistory(db, playerId, playerData);
  await updateDoc(playerRef, playerData);
};

/**
 * Updates the player's data in the database and records the changes in the player's change history.
 *
 * @param db - The Firestore database instance.
 * @param playerId - The ID of the player whose data is being updated.
 * @param newData - The new data to be saved for the player.
 * @throws {Error} If the player does not exist in the database.
 */

export const playerUpdateHistory = async (
  db: Firestore,
  playerId: string,
  newData: Partial<BarePlayer>
) => {
  // get the keys of the changes to be saved
  const allChangeKeys = Object.keys(newData);
  const ignoreKeys = ['id', 'isAdmin', 'leagues', 'seasons', 'teams'];
  const changeKeys = allChangeKeys.filter(
    (key) => !ignoreKeys.includes(key as keyof BarePlayer)
  );
  // Quit if there are no changes to be made
  if (changeKeys.length === 0) {
    return;
  }
  // get the current player data
  const playerRef = doc(db, 'players', playerId);
  const playerDocSnapshot = await getDoc(playerRef);

  if (!playerDocSnapshot.exists()) {
    throw new Error('Player does not exist');
  }

  const oldData = playerDocSnapshot.data() as BarePlayer;

  // create the new data object to save
  const changesToSave = {} as Partial<BarePlayer>;

  changeKeys.forEach((key) => {
    if (oldData.hasOwnProperty(key)) {
      // Make sure each change is different from the old data
      if (
        oldData[key as keyof BarePlayer] === newData[key as keyof BarePlayer]
      ) {
        return;
      }
      if (key === 'email') {
        changesToSave.email = newData.email;
      } else {
        changesToSave[key as keyof Omit<BarePlayer, 'email'>] =
          oldData[key as keyof BarePlayer];
      }
    }
  });

  // Quit if there are no changes to save
  if (Object.keys(changesToSave).length === 0) {
    return;
  }
  // add the changes to the player's change history
  const changeHistoryRef = collection(playerRef, 'changeHistory');
  console.log('inside history 4', changesToSave);
  await addDoc(changeHistoryRef, {
    changes: changesToSave,
    timestamp: serverTimestamp(),
  });
};
