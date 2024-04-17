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
});
var fetchSeasonRQ = (seasonName) => __async(void 0, null, function* () {
});

// src/hooks/seasonUpdateHooks.ts
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
});
var updateSeasonRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  seasonData
}) {
});

// src/hooks/matchupFetchHooks.ts
import { useQuery as useQuery2 } from "react-query";
import { doc, getDoc } from "firebase/firestore";

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
  const scheduleRef = doc(db, "roundRobinSchedules", scheduleName);
  const scheduleDoc = yield getDoc(scheduleRef);
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
  const scheduleRef = doc(db, "finishedRoundRobinSchedules", seasonId);
  const scheduleDoc = yield getDoc(scheduleRef);
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
  collection,
  doc as doc2,
  getDoc as getDoc2,
  getDocs
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
  const playerDoc = doc2(db, "pastPlayers", email);
  const playerDocSnapshot = yield getDoc2(playerDoc);
  if (playerDocSnapshot.exists()) {
    return __spreadValues({
      id: playerDocSnapshot.id
    }, playerDocSnapshot.data());
  } else {
    throw new Error("Player not found");
  }
});
var fetchAllPastPlayers = (db) => __async(void 0, null, function* () {
  const querySnapshot = yield getDocs(collection(db, "pastPlayers"));
  const playersData = [];
  querySnapshot.forEach((doc4) => {
    const playerData = doc4.data();
    playersData.push(__spreadProps(__spreadValues({}, playerData), {
      id: doc4.id
    }));
  });
  return playersData;
});
var fetchPlayerById = (db, id) => __async(void 0, null, function* () {
  if (id === void 0) {
    throw new Error("Player ID not provided");
  }
  const userDoc = doc2(db, "players", id);
  const userDocSnapshot = yield getDoc2(userDoc);
  if (userDocSnapshot.exists()) {
    return __spreadValues({
      id: userDocSnapshot.id
    }, userDocSnapshot.data());
  } else {
    throw new Error("Player not found");
  }
});
var fetchAllPlayers = (db) => __async(void 0, null, function* () {
  const querySnapshot = yield getDocs(collection(db, "players"));
  const playersData = [];
  querySnapshot.forEach((doc4) => {
    const playerData = doc4.data();
    playersData.push(__spreadProps(__spreadValues({}, playerData), {
      id: doc4.id
    }));
  });
  return playersData;
});

// src/hooks/scheduleUpdateHooks.ts
import { useMutation as useMutation3 } from "react-query";
var useUpdateSeasonSchedule = () => {
  return useMutation3(updateSeasonScheduleRQ);
};
var updateSeasonScheduleRQ = (_0) => __async(void 0, [_0], function* ({
  seasonName,
  schedule
}) {
});

// src/hooks/teamFetchHooks.ts
import { useQuery as useQuery4 } from "react-query";
var useFetchTeamById = (teamId) => {
  return useQuery4(["team", teamId], () => fetchTeamByIdRQ(teamId), {
    enabled: teamId !== void 0
  });
};
var useFetchTeamsFromSeason = (seasonName) => {
};
var fetchTeamByIdRQ = (teamId) => __async(void 0, null, function* () {
});

// src/hooks/updatePlayerHooks.ts
import { useMutation as useMutation4 } from "react-query";
import { updateDoc, doc as doc3, setDoc } from "firebase/firestore";
import { useContext as useContext3 } from "react";
var useCreatePlayer = () => {
  const { db } = useContext3(FirebaseContext);
  const mutation = useMutation4(createPlayerRQ);
  console.log("test");
  const createPlayer = (userId, playerData) => __async(void 0, null, function* () {
    if (db === null) {
      throw new Error("DB is not initialized");
    }
    mutation.mutate({ db, userId, playerData });
  });
  return __spreadValues({ createPlayer }, mutation);
};
var useUpdatePlayer = (playerId, playerData) => {
  const { db } = useContext3(FirebaseContext);
  const mutation = useMutation4(updatePlayerRQ);
  const updatePlayer = (playerId2, playerData2) => __async(void 0, null, function* () {
    if (db === null) {
      throw new Error("DB is not initialized");
    }
    mutation.mutate({ db, playerId: playerId2, playerData: playerData2 });
  });
  return __spreadValues({ updatePlayer }, mutation);
};
var createPlayerRQ = (_0) => __async(void 0, [_0], function* ({
  db,
  userId,
  playerData
}) {
  const playerRef = doc3(db, "players", userId);
  yield setDoc(playerRef, __spreadProps(__spreadValues({}, playerData), {
    isAdmin: false,
    leagues: [],
    seasons: [],
    teams: []
  }));
});
var updatePlayerRQ = (_0) => __async(void 0, [_0], function* ({
  playerId,
  playerData,
  db
}) {
  const playerRef = doc3(db, "player", playerId);
  yield updateDoc(playerRef, playerData);
});

// src/hooks/useAuth.ts
import { useState as useState2, useEffect as useEffect2, useContext as useContext4 } from "react";
import { onAuthStateChanged } from "firebase/auth";
var useAuth = () => {
  const { auth } = useContext4(FirebaseContext);
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
import { useContext as useContext5 } from "react";
var LOGIN_MODES = {
  LOGIN: "login",
  REGISTER: "register",
  RESET_PASSWORD: "resetPassword"
};
var registerUser = (email, password) => __async(void 0, null, function* () {
  const { auth } = useContext5(FirebaseContext);
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
  const { auth } = useContext5(FirebaseContext);
  try {
    const response = yield signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    throw error;
  }
});
var resetPassword = (email) => __async(void 0, null, function* () {
  const { auth } = useContext5(FirebaseContext);
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
  const { auth } = useContext5(FirebaseContext);
  try {
    yield signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
});
var observeAuthState = (callback) => {
  const { auth } = useContext5(FirebaseContext);
  return onAuthStateChanged2(auth, callback);
};
export {
  FirebaseContext,
  FirebaseProvider,
  LOGIN_MODES,
  addSeasonRQ,
  createPlayerRQ,
  createSuccess,
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
  loginUser,
  logoutUser,
  notFound,
  observeAuthState,
  registerUser,
  resetPassword,
  sendVerificationEmail,
  toStore,
  tryAgain,
  updatePlayerRQ,
  updateSeasonRQ,
  updateSeasonScheduleRQ,
  updateSuccess,
  useAddSeason,
  useAuth,
  useCreatePlayer,
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
  useUpdatePlayer,
  useUpdateSeason,
  useUpdateSeasonSchedule
};
//# sourceMappingURL=index.js.map