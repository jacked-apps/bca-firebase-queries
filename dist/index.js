var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/hooks/seasonUpdateHooks.ts
import { useMutation } from "react-query";

// src/hooks/seasonFetchHooks.ts
import { useQuery, useQueryClient } from "react-query";

// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
var firebaseConfig = {
  /* cSpell:disable */
  apiKey: "AIzaSyC5MvMfEeebh3XxyzYSD3qWpFR0aAAXSHM",
  authDomain: "expo-bca-app.firebaseapp.com",
  databaseURL: "https://expo-bca-app-default-rtdb.firebaseio.com",
  projectId: "expo-bca-app",
  storageBucket: "expo-bca-app.appspot.com",
  messagingSenderId: "248104656807",
  appId: "1:248104656807:web:853cad16b8fa38dbee2082",
  measurementId: "G-EL12CDVSCR"
};
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
var auth = getAuth(app);

// src/hooks/seasonFetchHooks.ts
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
var useFetchSeasons = () => {
  const queryClient = useQueryClient();
  const refetchSeasons = () => {
    queryClient.invalidateQueries("seasons");
  };
  return __spreadProps(__spreadValues({}, useQuery("currentSeasons", fetchSeasonsRQ)), { refetchSeasons });
};
var useFetchSeason = (seasonName) => {
  return useQuery(["season", seasonName], () => fetchSeasonRQ(seasonName));
};
var fetchSeasonsRQ = () => __async(void 0, null, function* () {
  const seasonQuery = query(
    collection(db, "seasons"),
    where("seasonCompleted", "==", false)
  );
  const querySnapshot = yield getDocs(seasonQuery);
  const seasonsArray = querySnapshot.docs.map((doc9) => {
    const season = doc9.data();
    season.id = doc9.id;
    return season;
  });
  return seasonsArray;
});
var fetchSeasonRQ = (seasonName) => __async(void 0, null, function* () {
  if (seasonName === void 0) {
    throw new Error("Season name/id not provided");
  }
  const seasonDoc = doc(db, "seasons", seasonName);
  const seasonDocSnapshot = yield getDoc(seasonDoc);
  if (seasonDocSnapshot.exists()) {
    const season = seasonDocSnapshot.data();
    season.id = seasonDocSnapshot.id;
    return season;
  } else {
    throw new Error("Season not found");
  }
});

// src/hooks/seasonUpdateHooks.ts
import { updateDoc, doc as doc2, setDoc } from "firebase/firestore";
var useAddSeason = () => {
  const mutation = useMutation(addSeasonRQ);
  const addSeason = (seasonName, seasonData) => __async(void 0, null, function* () {
    mutation.mutate({ seasonName, seasonData });
  });
  return __spreadValues({ addSeason }, mutation);
};
var useUpdateSeason = () => {
  return useMutation(updateSeasonRQ);
};
var addSeasonRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  seasonData
}) {
  const seasonRef = doc2(db, "seasons", seasonName);
  yield setDoc(seasonRef, __spreadProps(__spreadValues({}, seasonData), { seasonCompleted: false }));
});
var updateSeasonRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  seasonData
}) {
  const seasonRef = doc2(db, "seasons", seasonName);
  yield updateDoc(seasonRef, seasonData);
});

// src/hooks/matchupFetchHooks.ts
import { useQuery as useQuery2 } from "react-query";
import { doc as doc3, getDoc as getDoc2 } from "firebase/firestore";

// src/constants/messages.ts
var failedFetch = "Failed to fetch ";
var failedUpdate = "Failed to update ";
var failedCreate = "Failed to create ";
var tryAgain = "Please try again. ";
var createSuccess = " created successfully! ";
var updateSuccess = " successfully updated!";
var notFound = " not found in Firestore.";
var deleteSuccess = "Successfully removed ";
var deleteFailed = "Failed to remove ";
var fromStore = " from Firestore.";
var toStore = " to Firestore.";

// src/hooks/matchupFetchHooks.ts
var useFetchRoundRobin = (numberOfTeams) => {
  return useQuery2(
    ["roundRobin", numberOfTeams],
    () => fetchRoundRobinRQ(numberOfTeams),
    { enabled: !!numberOfTeams }
  );
};
var useFetchFinishedRoundRobin = (seasonName) => {
  return useQuery2(
    ["roundRobinFinished", seasonName],
    () => fetchFinishedRoundRobinRQ(seasonName),
    { enabled: !!seasonName }
  );
};
var adjustNumberOfTeams = (numberOfTeams) => {
  let adjustedNumber = numberOfTeams;
  if (numberOfTeams % 2 !== 0) {
    adjustedNumber += 1;
  }
  if (numberOfTeams < 4) {
    adjustedNumber = 4;
  }
  if (numberOfTeams > 48) {
    throw new Error(
      "Round Robin Schedule for more than 48 teams not supported"
    );
  }
  return adjustedNumber;
};
var fetchRoundRobinRQ = (numberOfTeams) => __async(void 0, null, function* () {
  if (numberOfTeams === void 0) {
    throw new Error("Number of teams not provided");
  }
  const adjustedTeams = adjustNumberOfTeams(numberOfTeams);
  const scheduleName = `scheduleFor${adjustedTeams}Teams`;
  const scheduleRef = doc3(db, "roundRobinSchedules", scheduleName);
  const scheduleDoc = yield getDoc2(scheduleRef);
  if (scheduleDoc.exists()) {
    return scheduleDoc.data();
  } else {
    throw new Error(
      `Round Robin Schedule for ${adjustedTeams} teams ${notFound}`
    );
  }
});
var fetchFinishedRoundRobinRQ = (seasonId) => __async(void 0, null, function* () {
  if (seasonId === void 0) {
    throw new Error("Season ID not provided");
  }
  const scheduleRef = doc3(db, "finishedRoundRobinSchedules", seasonId);
  const scheduleDoc = yield getDoc2(scheduleRef);
  if (scheduleDoc.exists()) {
    return scheduleDoc.data();
  } else {
    throw new Error(
      `Finished Round Robin Schedule for ${seasonId} ${notFound}`
    );
  }
});

// src/hooks/playerFetchHooks.ts
import { useQuery as useQuery3 } from "react-query";
import { collection as collection2, doc as doc4, getDoc as getDoc3, getDocs as getDocs2 } from "firebase/firestore";
var useFetchPastPlayerById = (playerId) => {
  return useQuery3(
    ["pastPlayer", playerId],
    () => fetchPastPlayerByIdRQ(playerId),
    {
      enabled: !!playerId
    }
  );
};
var useFetchCurrentUserById = (id) => {
  return useQuery3(["currentUser", id], () => fetchCurrentUserById(id), {
    enabled: !!id
  });
};
var useFetchPastPlayers = () => {
  return useQuery3("pastPlayers", fetchAllPastPlayersRQ);
};
var useFetchCurrentUsers = () => {
  return useQuery3("currentUsers", fetchAllCurrentUsersRQ);
};
var fetchPastPlayerByIdRQ = (playerId) => __async(void 0, null, function* () {
  if (playerId === void 0) {
    throw new Error("Player ID not provided");
  }
  const playerDoc = doc4(db, "pastPlayers", playerId);
  const playerDocSnapshot = yield getDoc3(playerDoc);
  if (playerDocSnapshot.exists()) {
    return __spreadValues({
      id: playerDocSnapshot.id
    }, playerDocSnapshot.data());
  } else {
    throw new Error("Player not found");
  }
});
var fetchCurrentUserById = (id) => __async(void 0, null, function* () {
  if (id === void 0) {
    throw new Error("User ID not provided");
  }
  const userDoc = doc4(db, "currentUsers", id);
  const userDocSnapshot = yield getDoc3(userDoc);
  if (userDocSnapshot.exists()) {
    return __spreadValues({
      id: userDocSnapshot.id
    }, userDocSnapshot.data());
  } else {
    throw new Error("User not found");
  }
});
var fetchAllPastPlayersRQ = () => __async(void 0, null, function* () {
  const querySnapshot = yield getDocs2(collection2(db, "pastPlayers"));
  const playersData = [];
  querySnapshot.forEach((doc9) => {
    const playerData = doc9.data();
    playersData.push(__spreadProps(__spreadValues({}, playerData), {
      id: doc9.id
    }));
  });
  return playersData;
});
var fetchAllCurrentUsersRQ = () => __async(void 0, null, function* () {
  const querySnapshot = yield getDocs2(collection2(db, "currentUsers"));
  const usersData = [];
  querySnapshot.forEach((doc9) => {
    const userData = doc9.data();
    usersData.push(__spreadProps(__spreadValues({}, userData), {
      id: doc9.id
    }));
  });
  return usersData;
});

// src/hooks/scheduleUpdateHooks.ts
import { useMutation as useMutation2 } from "react-query";
import { updateDoc as updateDoc2, doc as doc5 } from "firebase/firestore";
var useUpdateSeasonSchedule = () => {
  return useMutation2(updateSeasonScheduleRQ);
};
var updateSeasonScheduleRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  schedule
}) {
  const seasonRef = doc5(db, "seasons", seasonName);
  yield updateDoc2(seasonRef, {
    schedule
  });
});

// src/hooks/teamFetchHooks.ts
import { useQuery as useQuery4 } from "react-query";
import { doc as doc6, getDoc as getDoc4 } from "firebase/firestore";
var useFetchTeamById = (teamId) => {
  return useQuery4(["team", teamId], () => fetchTeamByIdRQ(teamId), {
    enabled: teamId !== void 0
  });
};
var useFetchTeamsFromSeason = (seasonName) => {
  const query2 = useQuery4(
    ["teamsFromSeason", seasonName],
    () => fetchTeamsFromSeasonRQ(seasonName),
    {
      enabled: !!seasonName
    }
  );
  return query2;
};
var fetchTeamByIdRQ = (teamId) => __async(void 0, null, function* () {
  if (teamId === void 0) {
    throw new Error("Team ID not provided");
  }
  const teamDoc = doc6(db, "teams", teamId);
  const teamDocSnapshot = yield getDoc4(teamDoc);
  if (teamDocSnapshot.exists()) {
    const teamData = teamDocSnapshot.data();
    teamData.id = teamDocSnapshot.id;
    return teamData;
  } else {
    throw new Error("Team not found");
  }
});
var fetchTeamsFromSeasonRQ = (seasonName) => __async(void 0, null, function* () {
  const seasonDoc = yield fetchSeasonRQ(seasonName);
  if (!seasonDoc.teams || seasonDoc.teams.length === 0) {
    return [];
  }
  const teamsPromises = seasonDoc.teams.map(
    (teamId) => __async(void 0, null, function* () {
      return fetchTeamByIdRQ(teamId);
    })
  );
  const teams = yield Promise.all(teamsPromises);
  return teams.filter((team) => team !== null);
});

// src/hooks/teamToPlayerOperations.ts
import { useMutation as useMutation3 } from "react-query";
import {
  doc as doc7,
  updateDoc as updateDoc3,
  getDoc as getDoc5,
  arrayUnion,
  arrayRemove,
  runTransaction
} from "firebase/firestore";
var useAddPlayerToTeam = () => {
  return useMutation3(addPlayerToTeamRQ, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    retry: false
  });
};
var useAddTeamToBothViaPlayer = () => {
  return useMutation3(addTeamToBothWithPlayer, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    retry: false
  });
};
var useAddTeamToBothViaUser = () => {
  return useMutation3(addTeamToBothWithUser, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    retry: false
  });
};
var useRemoveTeamFromBothViaPlayer = () => {
  return useMutation3(removeTeamFromBothWithPlayer, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    retry: false
  });
};
var useRemoveTeamFromBothViaUser = () => {
  return useMutation3(removeTeamFromBothWithUser, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
    retry: false
  });
};
var addTeamToPastPlayer = (teamId, pastPlayerId) => __async(void 0, null, function* () {
  const playerRef = doc7(db, "pastPlayers", pastPlayerId);
  yield updateDoc3(playerRef, {
    teams: arrayUnion(teamId)
  });
});
var addTeamToCurrentUser = (teamId, currentUserId) => __async(void 0, null, function* () {
  if (!teamId || !currentUserId)
    throw new Error("Missing teamId or currentUserId");
  const userRef = doc7(db, "currentUsers", currentUserId);
  yield updateDoc3(userRef, {
    teams: arrayUnion(teamId)
  });
});
var addTeamToBothWithPlayer = (teamId, pastPlayerId) => __async(void 0, null, function* () {
  if (!teamId || !pastPlayerId)
    throw new Error("Missing teamId or pastPlayerId");
  yield addTeamToPastPlayer(teamId, pastPlayerId);
  const pastPlayer = yield fetchPastPlayerByIdRQ(pastPlayerId);
  if (pastPlayer && pastPlayer.currentUserId) {
    yield addTeamToCurrentUser(teamId, pastPlayer.currentUserId);
  }
});
var addTeamToBothWithUser = (teamId, currentUserId) => __async(void 0, null, function* () {
  if (!teamId || !currentUserId)
    throw new Error("Missing teamId or currentUserId");
  yield addTeamToCurrentUser(teamId, currentUserId);
  const user = yield fetchCurrentUserById(currentUserId);
  if (user && user.pastPlayerId) {
    yield addTeamToPastPlayer(teamId, user.pastPlayerId);
  }
});
var removeTeamFromPastPlayer = (teamId, pastPlayerId) => __async(void 0, null, function* () {
  if (!teamId || !pastPlayerId)
    throw new Error("Missing teamId or pastPlayerId");
  const playerRef = doc7(db, "pastPlayers", pastPlayerId);
  yield updateDoc3(playerRef, {
    teams: arrayRemove(teamId)
  });
});
var removeTeamFromCurrentUser = (teamId, currentUserId) => __async(void 0, null, function* () {
  if (!teamId || !currentUserId)
    throw new Error("Missing teamId or currentUserId");
  const userRef = doc7(db, "currentUsers", currentUserId);
  yield updateDoc3(userRef, {
    teams: arrayRemove(teamId)
  });
});
var removeTeamFromBothWithPlayer = (teamId, pastPlayerId) => __async(void 0, null, function* () {
  if (!teamId || !pastPlayerId)
    throw new Error("Missing teamId or pastPlayerId");
  yield removeTeamFromPastPlayer(teamId, pastPlayerId);
  const pastPlayer = yield fetchPastPlayerByIdRQ(pastPlayerId);
  if (pastPlayer && pastPlayer.currentUserId) {
    yield removeTeamFromCurrentUser(teamId, pastPlayer.currentUserId);
  }
});
var removeTeamFromBothWithUser = (teamId, currentUserId) => __async(void 0, null, function* () {
  if (!teamId || !currentUserId)
    throw new Error("Missing teamId or currentUserId");
  yield removeTeamFromCurrentUser(teamId, currentUserId);
  const user = yield fetchCurrentUserById(currentUserId);
  if (user && user.pastPlayerId) {
    yield removeTeamFromPastPlayer(teamId, user.pastPlayerId);
  }
});
var addPlayerToTeamRQ = (_0) => __async(void 0, [_0], function* ({
  teamId,
  role,
  playerData
}) {
  const teamData = yield fetchTeamByIdRQ(teamId);
  if (!teamData) {
    throw new Error("Team not found");
  }
  const oldPlayer = teamData == null ? void 0 : teamData.players[role];
  if (oldPlayer.email) {
    yield removeTeamFromBothWithPlayer(teamId, oldPlayer.email);
  } else if (oldPlayer.currentUserId) {
    yield removeTeamFromBothWithUser(teamId, oldPlayer.currentUserId);
  }
  try {
    yield insertPlayerOntoTeam(teamId, role, playerData);
    yield addTeamToBothWithPlayer(teamId, playerData.email);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
});
var insertPlayerOntoTeam = (teamId, role, playerData) => __async(void 0, null, function* () {
  const teamRef = doc7(db, "teams", teamId);
  const teamDoc = yield getDoc5(teamRef);
  if (teamDoc.exists()) {
    const teamData = teamDoc.data();
    const newTeamData = __spreadProps(__spreadValues({}, teamData), {
      players: __spreadProps(__spreadValues({}, teamData.players), {
        [role]: playerData
      })
    });
    yield updateDoc3(teamRef, newTeamData);
  }
});
var removeAllPlayersFromTeamRQ = (teamId) => __async(void 0, null, function* () {
  yield runTransaction(db, (transaction) => __async(void 0, null, function* () {
    const teamRef = doc7(db, "teams", teamId);
    const teamDoc = yield transaction.get(teamRef);
    if (!teamDoc.exists()) {
      throw new Error("Team not found");
    }
    const teamData = teamDoc.data();
    const playerIds = Object.values(teamData.players).map((player) => player.pastPlayerId).filter((pastPlayerId) => pastPlayerId);
    for (const pastPlayerId of playerIds) {
      const pastPlayerRef = doc7(db, "pastPlayers", pastPlayerId);
      const pastPlayerDoc = yield transaction.get(pastPlayerRef);
      const pastPlayerData = pastPlayerDoc.data();
      transaction.update(pastPlayerRef, {
        teams: arrayRemove(teamId)
      });
      if (pastPlayerData == null ? void 0 : pastPlayerData.currentUserId) {
        const currentUserRef = doc7(
          db,
          "currentUsers",
          pastPlayerData.currentUserId
        );
        transaction.update(currentUserRef, {
          teams: arrayRemove(teamId)
        });
      }
    }
  }));
});

// src/hooks/teamUpdateHooks.ts
import { useMutation as useMutation4 } from "react-query";
import {
  collection as collection3,
  updateDoc as updateDoc4,
  deleteDoc,
  doc as doc8,
  runTransaction as runTransaction2
} from "firebase/firestore";
var createNewTeamData = (teamName, seasonId) => ({
  teamName,
  seasonId,
  players: {
    captain: {},
    player2: {},
    player3: {},
    player4: {},
    player5: {}
  },
  wins: 0,
  losses: 0,
  points: 0
});
var useRemoveTeamFromSeason = () => {
  const mutation = useMutation4(removeTeamFromSeasonRQ);
  const removeTeam = (seasonName, teamId) => __async(void 0, null, function* () {
    try {
      yield mutation.mutateAsync({ seasonName, teamId });
      if (mutation.isSuccess) {
        yield deleteTeamRQ(teamId);
        yield removeAllPlayersFromTeamRQ(teamId);
      }
    } catch (error) {
      console.error("Error removing Team from Season", error);
    }
  });
  return __spreadValues({ removeTeam }, mutation);
};
var useUpdateTeamData = () => {
  return useMutation4(updateTeamDataRQ);
};
var useAddNewTeamToSeason = () => {
  return useMutation4(addNewTeamToSeasonRQ);
};
var removeTeamFromSeasonRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  teamId
}) {
  const season = yield fetchSeasonRQ(seasonName);
  if (!season)
    return;
  const teamArray = season.teams;
  const newArray = teamArray.filter((team) => team !== teamId);
  yield updateSeasonRQ({ seasonName, seasonData: { teams: newArray } });
});
var updateTeamDataRQ = (_0) => __async(void 0, [_0], function* ({
  teamId,
  data
}) {
  const teamRef = doc8(db, "teams", teamId);
  yield updateDoc4(teamRef, data);
});
var deleteTeamRQ = (teamId) => __async(void 0, null, function* () {
  const teamRef = doc8(db, "teams", teamId);
  yield deleteDoc(teamRef);
});
var addNewTeamToSeasonRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  teamName
}) {
  yield runTransaction2(db, (transaction) => __async(void 0, null, function* () {
    const seasonRef = doc8(db, "seasons", seasonName);
    const seasonDoc = yield transaction.get(seasonRef);
    if (!seasonDoc.exists()) {
      throw new Error(`Season ${seasonName} not found`);
    }
    const teamRef = doc8(collection3(db, "teams"));
    const newTeamData = createNewTeamData(teamName, seasonName);
    transaction.set(teamRef, newTeamData);
    const currentTeams = seasonDoc.data().teams || [];
    transaction.update(seasonRef, {
      teams: [...currentTeams, teamRef.id]
    });
  }));
});

// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
var useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return { user };
};

// src/Auth.ts
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged as onAuthStateChanged2
} from "firebase/auth";
var LOGIN_MODES = {
  LOGIN: "login",
  REGISTER: "register",
  RESET_PASSWORD: "resetPassword"
};
var registerUser = (email, password) => __async(void 0, null, function* () {
  try {
    const response = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user;
  } catch (error) {
    throw error;
  }
});
var loginUser = (email, password) => __async(void 0, null, function* () {
  try {
    const response = yield signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    throw error;
  }
});
var getCurrentUser = () => auth.currentUser;
var resetPassword = (email) => __async(void 0, null, function* () {
  try {
    yield sendPasswordResetEmail(auth, email);
    alert("Reset Password sent to your Email");
  } catch (error) {
    console.error("Error sending reset password email", error);
    throw error;
  }
});
var sendVerificationEmail = (user) => __async(void 0, null, function* () {
  try {
    yield sendEmailVerification(user);
    console.log("Verification email sent.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
});
var logoutUser = () => __async(void 0, null, function* () {
  try {
    yield signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
});
var observeAuthState = (callback) => {
  return onAuthStateChanged2(auth, callback);
};
export {
  LOGIN_MODES,
  addSeasonRQ,
  createNewTeamData,
  createSuccess,
  deleteFailed,
  deleteSuccess,
  failedCreate,
  failedFetch,
  failedUpdate,
  fetchCurrentUserById,
  fetchPastPlayerByIdRQ,
  fetchSeasonRQ,
  fetchTeamByIdRQ,
  fromStore,
  getCurrentUser,
  loginUser,
  logoutUser,
  notFound,
  observeAuthState,
  registerUser,
  removeAllPlayersFromTeamRQ,
  resetPassword,
  sendVerificationEmail,
  toStore,
  tryAgain,
  updateSeasonRQ,
  updateSeasonScheduleRQ,
  updateSuccess,
  useAddNewTeamToSeason,
  useAddPlayerToTeam,
  useAddSeason,
  useAddTeamToBothViaPlayer,
  useAddTeamToBothViaUser,
  useAuth,
  useFetchCurrentUserById,
  useFetchCurrentUsers,
  useFetchFinishedRoundRobin,
  useFetchPastPlayerById,
  useFetchPastPlayers,
  useFetchRoundRobin,
  useFetchSeason,
  useFetchSeasons,
  useFetchTeamById,
  useFetchTeamsFromSeason,
  useRemoveTeamFromBothViaPlayer,
  useRemoveTeamFromBothViaUser,
  useRemoveTeamFromSeason,
  useUpdateSeason,
  useUpdateSeasonSchedule,
  useUpdateTeamData
};
//# sourceMappingURL=index.js.map