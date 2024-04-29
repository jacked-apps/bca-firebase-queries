// ------------------------------
// TABLE OF CONTENTS
// ------------------------------
// 1. Hooks
//    - useFetchPastPlayerById
//    - useFetchPlayerById
//    - useFetchAllPastPlayers
//    - useFetchAllPlayers
// 2. FireBaseFunctions
//    - fetchPastPlayerByIdRQ
//    - fetchCurrentUserById
//    - fetchAllPastPlayersRQ
//    - fetchAllCurrentUsers

//------------------------
// IMPORTS
//------------------------
import { useMutation, useQuery } from 'react-query';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { Email } from '../types/sharedTypes';
import { BarePlayer, PastPlayer, Player } from '../types/userTypes';
import { useContext } from 'react';
import { FirebaseContext } from '../FirebaseProvider';
import { createPlayerRQ } from './updatePlayerHooks';

// ------------------------------
// 1. HOOKS
// ------------------------------

export const useFetchPastPlayerById = (email: Email | string | undefined) => {
  const { db } = useContext(FirebaseContext);

  return useQuery(
    ['pastPlayer', email],
    () => fetchPastPlayerById(db!, email),
    {
      enabled: !!email,
      retry: 1,
    }
  );
};

export const useFetchAllPastPlayers = () => {
  const { db } = useContext(FirebaseContext);

  return useQuery('pastPlayers', () => fetchAllPastPlayers(db!));
};

export const useFetchPlayerById = (id: string | undefined) => {
  const { db } = useContext(FirebaseContext);
  return useQuery(['player', id], () => fetchPlayerById(db!, id), {
    enabled: !!id,
  });
};

export const useFetchAllPlayers = () => {
  const { db } = useContext(FirebaseContext);
  return useQuery('Players', () => fetchAllPlayers(db!));
};

// ------------------------------
// 2. FIREBASE FUNCTIONS
// ------------------------------

/**
 * Fetches a PastPlayer object by ID from Firestore.
 *
 * @param playerId - The ID of the past player to fetch.
 * @returns A Promise resolving to the PastPlayer object if found, or null if not found.
 * @throws Error if ID is not provided.
 */
export const fetchPastPlayerById = async (
  db: Firestore,
  email: undefined | string
): Promise<PastPlayer | null> => {
  if (email === undefined) {
    throw new Error('Player ID not provided');
  }
  const playerDoc = doc(db!, 'pastPlayers', email);
  const playerDocSnapshot = await getDoc(playerDoc);
  if (playerDocSnapshot.exists()) {
    return {
      id: playerDocSnapshot.id,
      ...(playerDocSnapshot.data() as Omit<PastPlayer, 'id'>),
    };
  } else {
    throw new Error('Player not found');
  }
};

/**
 * Fetches all PastPlayer objects from Firestore.
 *
 * @returns Promise resolving to an array of all PastPlayer objects.
 */
const fetchAllPastPlayers = async (db: Firestore): Promise<PastPlayer[]> => {
  const querySnapshot = await getDocs(collection(db!, 'pastPlayers'));
  const playersData: PastPlayer[] = [];

  querySnapshot.forEach((doc) => {
    const playerData = doc.data() as PastPlayer;
    playersData.push({
      ...playerData,
      id: doc.id as Email,
    });
  });

  return playersData;
};

/**
 * Fetches a Player object by ID from Firestore.
 *
 * @param id - The ID of the user to fetch.
 * @returns A Promise resolving to the Player object if found, or null if not found.
 * @throws Error if ID is not provided.
 */
export const fetchPlayerById = async (
  db: Firestore,
  id: string | undefined
): Promise<Player | null> => {
  if (id === undefined) {
    throw new Error('Player ID not provided');
  }
  const userDoc = doc(db!, 'players', id as string);
  const userDocSnapshot = await getDoc(userDoc);

  if (userDocSnapshot.exists()) {
    return {
      id: userDocSnapshot.id,
      ...(userDocSnapshot.data() as Omit<Player, 'id'>),
    };
  } else {
    throw new Error('Player not found');
  }
};

/**
 * Fetches all PastPlayer objects from Firestore.
 *
 * @returns Promise resolving to an array of all PastPlayer objects.
 */
const fetchAllPlayers = async (db: Firestore): Promise<Player[]> => {
  const querySnapshot = await getDocs(collection(db!, 'players'));
  const playersData: Player[] = [];

  querySnapshot.forEach((doc) => {
    const playerData = doc.data() as Player;
    playersData.push({
      ...playerData,
      id: doc.id,
    });
  });

  return playersData;
};
