// ------------------------------
// TABLE OF CONTENTS
// ------------------------------
// 1. Hooks
//    - useAddOrUpdateSeason
// 2. FireBaseFunctions
//    - addOrUpdateSeasonRQ

//------------------------
// IMPORTS
//------------------------

// react query
import { useMutation } from 'react-query';

// firebase

import { updateDoc, doc, setDoc, Firestore } from 'firebase/firestore';
import { BarePlayer, Player } from '../types';
import { useContext } from 'react';
import { FirebaseContext } from '../FirebaseProvider';

// types

// ------------------------------
// 1. HOOKS
// ------------------------------
export const useCreatePlayer = (userId: string, playerData: BarePlayer) => {
  const { db } = useContext(FirebaseContext);
  const mutation = useMutation(createPlayerRQ);
  const createPlayer = async (userId: string, playerData: BarePlayer) => {
    if (db === null) {
      throw new Error('DB is not initialized');
    }
    mutation.mutate({ db, userId, playerData });
  };
  return { createPlayer, ...mutation };
};

export const useUpdatePlayer = (
  playerId: string,
  playerData: Partial<Player>
) => {
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
  const playerRef = doc(db!, 'player', userId);
  await setDoc(playerRef, {
    ...playerData,
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
  const playerRef = doc(db, 'player', playerId);
  await updateDoc(playerRef, playerData);
};
