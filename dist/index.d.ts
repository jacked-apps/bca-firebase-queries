import { Firestore as Firestore$1 } from '@firebase/firestore';
import { Auth as Auth$1 } from '@firebase/auth';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { PropsWithChildren } from 'react';
import { Firestore, Timestamp as Timestamp$1 } from 'firebase/firestore';
import { Auth, User } from 'firebase/auth';
import * as react_query from 'react-query';
import * as _firebase_util from '@firebase/util';

type FirebaseContextParams = {
    db: Firestore | null;
    auth: Auth | null;
};
type FirebaseProviderProps = {
    credentials: Object;
};
declare const FirebaseContext: react.Context<FirebaseContextParams>;
declare const FirebaseProvider: ({ children, credentials, }: PropsWithChildren<FirebaseProviderProps>) => react_jsx_runtime.JSX.Element;

type Timestamp = Timestamp$1;
type SeasonName = string;
type TeamName = string;
type Email = `${string}@${string}.${string}`;
type TeamId = string;
type PlayerId = string;
type MatchupId = string;
type Game = '8 Ball' | '9 Ball' | '10 Ball';
type TimeOfYear = 'Spring' | 'Summer' | 'Fall' | 'Winter';
type PoolHall = "Butera's Billiards" | 'Billiard Plaza';
type Names = {
    firstName: string;
    lastName: string;
    nickname: string;
};
type DateFormat = 'long' | 'short' | 'numeric';
type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
type DateOrStamp = Timestamp | Date;
type StampOrInvalid = Timestamp | NotDate;
type NotDate = 'Invalid Date';

type Season = {
    id: SeasonName;
    startDate: StampOrInvalid;
    endDate: StampOrInvalid;
    seasonLength: number;
    game: Game;
    holidays: Holiday[];
    night: DayOfWeek;
    poolHall: PoolHall;
    seasonCompleted: boolean;
    seasonName: SeasonName;
    teams: TeamId[];
    schedule: Schedule;
};
type Schedule = {
    [dateKey: string]: {
        title: string;
        leaguePlay: boolean;
        matchUps: MatchupId;
    };
};
type Holiday = {
    date: string;
    name: string;
    start: DateOrStamp;
    end: DateOrStamp;
    rule: string;
    type: string;
};

declare const useAddSeason: () => {
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isSuccess: false;
    status: "idle";
    mutate: react_query.UseMutateFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        seasonData: Season;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    addSeason: (seasonName: string, seasonData: Season) => Promise<void>;
} | {
    data: undefined;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: true;
    isSuccess: false;
    status: "loading";
    mutate: react_query.UseMutateFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        seasonData: Season;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    addSeason: (seasonName: string, seasonData: Season) => Promise<void>;
} | {
    data: undefined;
    error: unknown;
    isError: true;
    isIdle: false;
    isLoading: false;
    isSuccess: false;
    status: "error";
    mutate: react_query.UseMutateFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        seasonData: Season;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    addSeason: (seasonName: string, seasonData: Season) => Promise<void>;
} | {
    data: void;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: false;
    isSuccess: true;
    status: "success";
    mutate: react_query.UseMutateFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        seasonData: Season;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        seasonData: Season;
    }, unknown>;
    addSeason: (seasonName: string, seasonData: Season) => Promise<void>;
};
declare const useUpdateSeason: () => react_query.UseMutationResult<void, unknown, {
    seasonName: SeasonName;
    seasonData: Partial<Season>;
}, unknown>;
/**
 * Adds a new season document to Firestore.
 *
 * @param seasonName - The name of the season to add.
 * @param seasonData - The season data object to add.
 */
declare const addSeasonRQ: ({ seasonName, seasonData, }: {
    seasonName: SeasonName;
    seasonData: Season;
}) => Promise<void>;
/**
 * Updates an existing season document in Firestore.
 *
 * @param seasonName - The name of the season to update.
 * @param seasonData - The partial season data to update.
 */
declare const updateSeasonRQ: ({ seasonName, seasonData, }: {
    seasonName: SeasonName;
    seasonData: Partial<Season>;
}) => Promise<void>;

type MatchWeek = {
    [tableNumber: string]: {
        home: TeamInfo;
        away: TeamInfo;
        winner: TeamId | null;
        gamePlay: GamePlay;
        seasonId: SeasonName;
        completed: boolean;
    };
};
type TeamInfo = {
    id: TeamId;
    teamName: string;
    lineup: Lineup;
    teamHandicap: number;
    gamesWon: number;
    winsNeeded: number;
    tiePossible: boolean;
};
type Lineup = {
    player1: ActivePlayer;
    player2: ActivePlayer;
    player3: ActivePlayer;
};
type ActivePlayer = Names & {
    id: PlayerId;
    handicap: number;
    wins: number;
    losses: number;
};
type GamePlay = {
    [gameKey: string]: GamePlayResults;
};
type GamePlayResults = {
    breaker: PlayerId;
    racker: PlayerId;
    winner: PlayerId;
};
type TableMatchup = {
    home: number;
    away: number;
};
type TableMatchupFinished = {
    home: {
        teamName: string;
        id: string;
    };
    away: {
        teamName: string;
        id: string;
    };
};
type RoundRobinSchedule = {
    [week: string]: TableMatchup[];
};
type RoundRobinScheduleFinished = {
    [week: string]: TableMatchupFinished[];
};

declare const useFetchRoundRobin: (numberOfTeams: number | undefined) => react_query.UseQueryResult<RoundRobinSchedule | null, unknown>;
declare const useFetchFinishedRoundRobin: (seasonName: SeasonName | undefined) => react_query.UseQueryResult<RoundRobinScheduleFinished | null, unknown>;

type PastPlayer = Names & {
    id: Email;
    currentUserId?: PlayerId;
    email: Email;
    dob: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    stats: {
        [dateString: string]: {
            wins: number;
            losses: number;
            seasonName: SeasonName;
            seasonEnd: Timestamp;
        };
    };
    seasons?: string[];
    teams?: string[];
};
type Player = Names & {
    id: string;
    isAdmin: boolean;
    leagues: PlayerLeague[];
    seasons: PlayerSeason[];
    teams: PlayerTeam[];
};
type PlayerLeague = {
    id: string;
    locationName: string;
    name: string;
    playerHandicap: number;
};
type PlayerSeason = {
    leagueId: string;
    name: string;
    seasonHandicap: number;
    rank: number;
    losses: number;
    wins: number;
};
type PlayerTeam = {
    teamId: string;
    name: string;
};

declare const useFetchPastPlayerById: (email: Email | undefined) => react_query.UseQueryResult<PastPlayer | null, unknown>;
declare const useFetchAllPastPlayers: () => react_query.UseQueryResult<PastPlayer[], unknown>;
declare const useFetchPlayerById: (id: string | undefined) => react_query.UseQueryResult<Player | null, unknown>;
declare const useFetchAllPlayers: () => react_query.UseQueryResult<Player[], unknown>;
/**
 * Fetches a PastPlayer object by ID from Firestore.
 *
 * @param playerId - The ID of the past player to fetch.
 * @returns A Promise resolving to the PastPlayer object if found, or null if not found.
 * @throws Error if ID is not provided.
 */
declare const fetchPastPlayerById: (db: Firestore, email: Email | undefined) => Promise<PastPlayer | null>;
/**
 * Fetches a Player object by ID from Firestore.
 *
 * @param id - The ID of the user to fetch.
 * @returns A Promise resolving to the Player object if found, or null if not found.
 * @throws Error if ID is not provided.
 */
declare const fetchPlayerById: (db: Firestore, id: string | undefined) => Promise<Player | null>;

declare const useUpdateSeasonSchedule: () => react_query.UseMutationResult<void, unknown, {
    seasonName: SeasonName;
    schedule: Schedule;
}, unknown>;
/**
 * Updates the schedule for the given season in Firestore.
 *
 * @param seasonName - The name of the season document to update.
 * @param schedule - The updated schedule object to save.
 */
declare const updateSeasonScheduleRQ: ({ seasonName, schedule, }: {
    seasonName: SeasonName;
    schedule: Schedule;
}) => Promise<void>;

declare const useFetchSeasons: () => {
    refetchSeasons: () => void;
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    status: "idle";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<Season[], unknown>>;
    remove: () => void;
} | {
    refetchSeasons: () => void;
    data: undefined;
    error: unknown;
    isError: true;
    isIdle: false;
    isLoading: false;
    isLoadingError: true;
    isRefetchError: false;
    isSuccess: false;
    status: "error";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<Season[], unknown>>;
    remove: () => void;
} | {
    refetchSeasons: () => void;
    data: undefined;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: true;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    status: "loading";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<Season[], unknown>>;
    remove: () => void;
} | {
    refetchSeasons: () => void;
    data: Season[];
    error: unknown;
    isError: true;
    isIdle: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    status: "error";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<Season[], unknown>>;
    remove: () => void;
} | {
    refetchSeasons: () => void;
    data: Season[];
    error: null;
    isError: false;
    isIdle: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    status: "success";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<Season[], unknown>>;
    remove: () => void;
};
declare const useFetchSeason: (seasonName: string) => react_query.UseQueryResult<Season, unknown>;
/**
 * Fetches a SINGLE season by name/id from Firestore.
 *
 * Takes a season name/id string.
 * Gets the season document reference by name.
 * Fetches the season document snapshot.
 * If found, returns a Season object from the snapshot data.
 * If not found, throws an error.
 */
declare const fetchSeasonRQ: (seasonName: SeasonName | undefined) => Promise<Season>;

type Team = {
    id: TeamId;
    teamName: string;
    seasonId: SeasonName;
    players: {
        captain: TeamPlayer;
        player2: TeamPlayer;
        player3: TeamPlayer;
        player4: TeamPlayer;
        player5: TeamPlayer;
    };
    wins: number;
    losses: number;
    points: number;
};
type TeamPlayerRole = 'captain' | 'player2' | 'player3' | 'player4' | 'player5';
type TeamPlayer = {
    firstName: string;
    lastName: string;
    nickname: string;
    email?: Email;
    totalWins: number;
    totalLosses: number;
    pastPlayerId: Email;
    currentUserId: PlayerId;
};

declare const useFetchTeamById: (teamId: string | undefined) => react_query.UseQueryResult<Team | null, unknown>;
declare const useFetchTeamsFromSeason: (seasonName: SeasonName | undefined) => react_query.UseQueryResult<Team[], unknown>;
/**
 * Fetches a team by ID from Firestore.
 *
 * Takes a team ID string.
 * Gets the team document reference by ID.
 * Fetches the team document snapshot.
 * If found, returns a Team object from the snapshot data.
 * If not found, throws an error.
 */
declare const fetchTeamByIdRQ: (teamId: string | undefined) => Promise<Team | null>;

declare const useAuth: () => {
    user: User | null;
};

/**
 * INDEX TABLE OF CONTENTS
 * 1. Enums
 * 2. User functions
 * 3. Password functions
 * 4. Email Functions
 * 5. Session Management Functions
 */
/**
 * @typedef {Object} MODES
 * @property {'login'} LOGIN - Represents the login page
 * @property {'register'} REGISTER - Represents the registration page
 * @property {'resetPassword'} RESET_PASSWORD - Represents the reset password page
 */
declare const LOGIN_MODES: {
    LOGIN: string;
    REGISTER: string;
    RESET_PASSWORD: string;
};
/** Register a user
 * @param {string} email users email
 * @param {string} password users password
 * @returns {object} User response object
 * @throws {Error} Throws an error if registration fails
 */
declare const registerUser: (email: Email, password: string) => Promise<User>;
/** Log in a user
 * @param {string} email users email
 * @param {string} password users password
 * @returns {object} User response object
 * @throws {Error} Throws an error if login fails
 */
declare const loginUser: (email: Email, password: string) => Promise<User>;
/** Get current user
 * @returns {object} User response object
 */
declare const getCurrentUser: () => User | null;
/** Sends a password email to the provided email address
 * @param {string} email users email
 * @returns {undefined}
 * @throws {Error} Throws an error if sending reset password email fails
 */
declare const resetPassword: (email: Email) => Promise<void>;
/** Sends verification email
 * @param {object} user Firebase user object
 * @returns {undefined}
 * @throws {Error} Throws an error if sending reset password email fails
 */
declare const sendVerificationEmail: (user: User) => Promise<void>;
/** Logs out the current user
 * @returns {undefined}
 * @throws {Error} Throws and error if logout fails
 */
declare const logoutUser: () => Promise<void>;
/** Subscribe to authentication state changes
 * @param {function} callback Callback function to handle auth state changes
 * @returns {function} Unsubscribe function
 */
declare const observeAuthState: (callback: any) => _firebase_util.Unsubscribe;

declare const failedFetch = "Failed to fetch ";
declare const failedUpdate = "Failed to update ";
declare const failedCreate = "Failed to create ";
declare const tryAgain = "Please try again. ";
declare const createSuccess = " created successfully! ";
declare const updateSuccess = " successfully updated!";
declare const notFound = " not found in Firestore.";
declare const deleteSuccess = "Successfully removed ";
declare const deleteFailed = "Failed to remove ";
declare const fromStore = " from Firestore.";
declare const toStore = " to Firestore.";

declare let dbOut: Firestore$1;
declare let authOut: Auth$1;
declare const init: () => void;

export { type ActivePlayer, type DateFormat, type DateOrStamp, type DayOfWeek, type Email, FirebaseContext, FirebaseProvider, type Game, type GamePlay, type GamePlayResults, type Holiday, LOGIN_MODES, type Lineup, type MatchWeek, type MatchupId, type Names, type NotDate, type PastPlayer, type Player, type PlayerId, type PlayerLeague, type PlayerSeason, type PlayerTeam, type PoolHall, type RoundRobinSchedule, type RoundRobinScheduleFinished, type Schedule, type Season, type SeasonName, type StampOrInvalid, type TableMatchup, type TableMatchupFinished, type Team, type TeamId, type TeamInfo, type TeamName, type TeamPlayer, type TeamPlayerRole, type TimeOfYear, type Timestamp, addSeasonRQ, authOut as auth, createSuccess, dbOut as db, deleteFailed, deleteSuccess, failedCreate, failedFetch, failedUpdate, fetchPastPlayerById, fetchPlayerById, fetchSeasonRQ, fetchTeamByIdRQ, fromStore, getCurrentUser, init, loginUser, logoutUser, notFound, observeAuthState, registerUser, resetPassword, sendVerificationEmail, toStore, tryAgain, updateSeasonRQ, updateSeasonScheduleRQ, updateSuccess, useAddSeason, useAuth, useFetchAllPastPlayers, useFetchAllPlayers, useFetchFinishedRoundRobin, useFetchPastPlayerById, useFetchPlayerById, useFetchRoundRobin, useFetchSeason, useFetchSeasons, useFetchTeamById, useFetchTeamsFromSeason, useUpdateSeason, useUpdateSeasonSchedule };
