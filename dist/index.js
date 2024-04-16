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

// src/index.ts
import { initializeApp as initializeApp2 } from "@firebase/app";
import { getFirestore as getFirestore2 } from "@firebase/firestore";
import { getAuth as getAuth2 } from "@firebase/auth";

// src/FirebaseProvider.tsx
import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Fragment, jsx } from "react/jsx-runtime";
var FirebaseContext = createContext({
  db: null,
  auth: null
});
var FirebaseProvider = ({
  children,
  credentials
}) => {
  const [initialized, setInitialized] = useState(false);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const app = initializeApp(credentials);
    const db2 = getFirestore(app);
    const auth2 = getAuth(app);
    if (db2 !== null && auth2 !== null) {
      setDb(db2);
      setAuth(auth2);
      setInitialized(true);
    }
  }, [credentials]);
  return /* @__PURE__ */ jsx(FirebaseContext.Provider, { value: { db, auth }, children: initialized && /* @__PURE__ */ jsx(Fragment, { children }) });
};

// src/hooks/seasonUpdateHooks.ts
import { useMutation } from "react-query";

// src/hooks/seasonFetchHooks.ts
import { useQuery, useQueryClient } from "react-query";
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
    collection(dbOut, "seasons"),
    where("seasonCompleted", "==", false)
  );
  const querySnapshot = yield getDocs(seasonQuery);
  const seasonsArray = querySnapshot.docs.map((doc7) => {
    const season = doc7.data();
    season.id = doc7.id;
    return season;
  });
  return seasonsArray;
});
var fetchSeasonRQ = (seasonName) => __async(void 0, null, function* () {
  if (seasonName === void 0) {
    throw new Error("Season name/id not provided");
  }
  const seasonDoc = doc(dbOut, "seasons", seasonName);
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
  const seasonRef = doc2(dbOut, "seasons", seasonName);
  yield setDoc(seasonRef, __spreadProps(__spreadValues({}, seasonData), { seasonCompleted: false }));
});
var updateSeasonRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  seasonData
}) {
  const seasonRef = doc2(dbOut, "seasons", seasonName);
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
import { useContext } from "react";
var useFetchRoundRobin = (numberOfTeams) => {
  const { db } = useContext(FirebaseContext);
  return useQuery2(
    ["roundRobin", numberOfTeams],
    () => fetchRoundRobinRQ(db, numberOfTeams),
    { enabled: !!numberOfTeams }
  );
};
var useFetchFinishedRoundRobin = (seasonName) => {
  const { db } = useContext(FirebaseContext);
  return useQuery2(
    ["roundRobinFinished", seasonName],
    () => fetchFinishedRoundRobinRQ(db, seasonName),
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
var fetchRoundRobinRQ = (db, numberOfTeams) => __async(void 0, null, function* () {
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
var fetchFinishedRoundRobinRQ = (db, seasonId) => __async(void 0, null, function* () {
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
import {
  collection as collection2,
  doc as doc4,
  getDoc as getDoc3,
  getDocs as getDocs2
} from "firebase/firestore";
import { useContext as useContext2 } from "react";
var useFetchPastPlayerById = (email) => {
  const { db } = useContext2(FirebaseContext);
  return useQuery3(
    ["pastPlayer", email],
    () => fetchPastPlayerById(db, email),
    {
      enabled: !!email,
      retry: 1
    }
  );
};
var useFetchAllPastPlayers = () => {
  const { db } = useContext2(FirebaseContext);
  return useQuery3("pastPlayers", () => fetchAllPastPlayers(db));
};
var useFetchPlayerById = (id) => {
  const { db } = useContext2(FirebaseContext);
  return useQuery3(["player", id], () => fetchPlayerById(db, id), {
    enabled: !!id
  });
};
var useFetchAllPlayers = () => {
  const { db } = useContext2(FirebaseContext);
  return useQuery3("Players", () => fetchAllPlayers(db));
};
var fetchPastPlayerById = (db, email) => __async(void 0, null, function* () {
  if (email === void 0) {
    throw new Error("Player ID not provided");
  }
  const playerDoc = doc4(db, "pastPlayers", email);
  const playerDocSnapshot = yield getDoc3(playerDoc);
  if (playerDocSnapshot.exists()) {
    return __spreadValues({
      id: playerDocSnapshot.id
    }, playerDocSnapshot.data());
  } else {
    throw new Error("Player not found");
  }
});
var fetchAllPastPlayers = (db) => __async(void 0, null, function* () {
  const querySnapshot = yield getDocs2(collection2(db, "pastPlayers"));
  const playersData = [];
  querySnapshot.forEach((doc7) => {
    const playerData = doc7.data();
    playersData.push(__spreadProps(__spreadValues({}, playerData), {
      id: doc7.id
    }));
  });
  return playersData;
});
var fetchPlayerById = (db, id) => __async(void 0, null, function* () {
  if (id === void 0) {
    throw new Error("Player ID not provided");
  }
  const userDoc = doc4(db, "players", id);
  const userDocSnapshot = yield getDoc3(userDoc);
  if (userDocSnapshot.exists()) {
    return __spreadValues({
      id: userDocSnapshot.id
    }, userDocSnapshot.data());
  } else {
    throw new Error("Player not found");
  }
});
var fetchAllPlayers = (db) => __async(void 0, null, function* () {
  const querySnapshot = yield getDocs2(collection2(db, "players"));
  const playersData = [];
  querySnapshot.forEach((doc7) => {
    const playerData = doc7.data();
    playersData.push(__spreadProps(__spreadValues({}, playerData), {
      id: doc7.id
    }));
  });
  return playersData;
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
  const seasonRef = doc5(dbOut, "seasons", seasonName);
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
  const teamDoc = doc6(dbOut, "teams", teamId);
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

// src/hooks/useAuth.ts
import { useState as useState2, useEffect as useEffect2, useContext as useContext3 } from "react";
import { onAuthStateChanged } from "firebase/auth";
var useAuth = () => {
  const { auth } = useContext3(FirebaseContext);
  const [user, setUser] = useState2(null);
  useEffect2(() => {
    if (!auth) {
      return;
    }
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);
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
      authOut,
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
    const response = yield signInWithEmailAndPassword(authOut, email, password);
    return response.user;
  } catch (error) {
    throw error;
  }
});
var getCurrentUser = () => authOut.currentUser;
var resetPassword = (email) => __async(void 0, null, function* () {
  try {
    yield sendPasswordResetEmail(authOut, email);
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
    yield signOut(authOut);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
});
var observeAuthState = (callback) => {
  return onAuthStateChanged2(authOut, callback);
};

// src/index.ts
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
var dbOut;
var authOut;
var init = () => {
  const app = initializeApp2(firebaseConfig);
  dbOut = getFirestore2(app);
  authOut = getAuth2(app);
};
export {
  FirebaseContext,
  FirebaseProvider,
  LOGIN_MODES,
  addSeasonRQ,
  authOut as auth,
  createSuccess,
  dbOut as db,
  deleteFailed,
  deleteSuccess,
  failedCreate,
  failedFetch,
  failedUpdate,
  fetchPastPlayerById,
  fetchPlayerById,
  fetchSeasonRQ,
  fetchTeamByIdRQ,
  fromStore,
  getCurrentUser,
  init,
  loginUser,
  logoutUser,
  notFound,
  observeAuthState,
  registerUser,
  resetPassword,
  sendVerificationEmail,
  toStore,
  tryAgain,
  updateSeasonRQ,
  updateSeasonScheduleRQ,
  updateSuccess,
  useAddSeason,
  useAuth,
  useFetchAllPastPlayers,
  useFetchAllPlayers,
  useFetchFinishedRoundRobin,
  useFetchPastPlayerById,
  useFetchPlayerById,
  useFetchRoundRobin,
  useFetchSeason,
  useFetchSeasons,
  useFetchTeamById,
  useFetchTeamsFromSeason,
  useUpdateSeason,
  useUpdateSeasonSchedule
};
//# sourceMappingURL=index.js.map