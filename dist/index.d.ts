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
type Email = `${string}@${string}.${string}` | string;
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
type GameOnPlayer = {
    break: boolean;
    createdAt: Timestamp$1;
    opponentId: string;
    seasonId: SeasonName;
    value: 1 | -1;
    week: number;
    game: Game;
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

type PastPlayer = Names & {
    id: Email | string;
    currentUserId?: PlayerId;
    email: Email;
    dob: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    stats: PastPlayerStats;
    seasons?: string[];
    teams?: string[];
};
type PastPlayerStats = {
    [dateString: string]: PastPlayerSeasonStat;
};
type PastPlayerSeasonStat = {
    wins: number;
    losses: number;
    seasonName: SeasonName;
    seasonEnd?: Timestamp;
    game: Game;
};
type BarePlayer = Names & {
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: Email;
    dob: string;
};
type Player = BarePlayer & {
    id: string;
    leagues: PlayerLeague[];
    seasons: PlayerSeason[];
    teams: PlayerTeam[];
    isAdmin: boolean;
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

declare const useAddGamesToPlayer: () => {
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isSuccess: false;
    status: "idle";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    addGamesToPlayer: (userId: string, gamesArray: GameOnPlayer[]) => Promise<void>;
} | {
    data: undefined;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: true;
    isSuccess: false;
    status: "loading";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    addGamesToPlayer: (userId: string, gamesArray: GameOnPlayer[]) => Promise<void>;
} | {
    data: undefined;
    error: unknown;
    isError: true;
    isIdle: false;
    isLoading: false;
    isSuccess: false;
    status: "error";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    addGamesToPlayer: (userId: string, gamesArray: GameOnPlayer[]) => Promise<void>;
} | {
    data: void;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: false;
    isSuccess: true;
    status: "success";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        gamesArray: GameOnPlayer[];
    }, unknown>;
    addGamesToPlayer: (userId: string, gamesArray: GameOnPlayer[]) => Promise<void>;
};
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
declare const addGamesToPlayerRQ: ({ db, userId, gamesArray, }: {
    db: Firestore;
    userId: string;
    gamesArray: GameOnPlayer[];
}) => Promise<void>;

declare const useFetchRoundRobin: (numberOfTeams: number | undefined) => react_query.UseQueryResult<RoundRobinSchedule | null, unknown>;
declare const useFetchFinishedRoundRobin: (seasonName: SeasonName | undefined) => react_query.UseQueryResult<RoundRobinScheduleFinished | null, unknown>;

declare const useFetchPastPlayerById: (email: Email | string | undefined) => react_query.UseQueryResult<PastPlayer | null, unknown>;
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
declare const fetchPastPlayerById: (db: Firestore, email: undefined | string) => Promise<PastPlayer | null>;
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
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<void | Season[], unknown>>;
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
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<void | Season[], unknown>>;
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
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<void | Season[], unknown>>;
    remove: () => void;
} | {
    refetchSeasons: () => void;
    data: void | Season[];
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
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<void | Season[], unknown>>;
    remove: () => void;
} | {
    refetchSeasons: () => void;
    data: void | Season[];
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
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<void | Season[], unknown>>;
    remove: () => void;
};
declare const useFetchSeason: (seasonName: string) => react_query.UseQueryResult<void | Season, unknown>;
/**
 * Fetches a SINGLE season by name/id from Firestore.
 *
 * Takes a season name/id string.
 * Gets the season document reference by name.
 * Fetches the season document snapshot.
 * If found, returns a Season object from the snapshot data.
 * If not found, throws an error.
 */
declare const fetchSeasonRQ: (seasonName: SeasonName | undefined) => Promise<Season | void>;

declare const useFetchTeamById: (teamId: string | undefined) => react_query.UseQueryResult<void | Team | null, unknown>;
declare const useFetchTeamsFromSeason: (seasonName: SeasonName | undefined) => void;
/**
 * Fetches a team by ID from Firestore.
 *
 * Takes a team ID string.
 * Gets the team document reference by ID.
 * Fetches the team document snapshot.
 * If found, returns a Team object from the snapshot data.
 * If not found, throws an error.
 */
declare const fetchTeamByIdRQ: (teamId: string | undefined) => Promise<Team | null | void>;

declare const useCreatePlayer: () => {
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isSuccess: false;
    status: "idle";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    createPlayer: (userId: string, playerData: BarePlayer, onCreatePlayerSuccess?: () => void) => Promise<void>;
} | {
    data: undefined;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: true;
    isSuccess: false;
    status: "loading";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    createPlayer: (userId: string, playerData: BarePlayer, onCreatePlayerSuccess?: () => void) => Promise<void>;
} | {
    data: undefined;
    error: unknown;
    isError: true;
    isIdle: false;
    isLoading: false;
    isSuccess: false;
    status: "error";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    createPlayer: (userId: string, playerData: BarePlayer, onCreatePlayerSuccess?: () => void) => Promise<void>;
} | {
    data: void;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: false;
    isSuccess: true;
    status: "success";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        userId: string;
        playerData: BarePlayer;
    }, unknown>;
    createPlayer: (userId: string, playerData: BarePlayer, onCreatePlayerSuccess?: () => void) => Promise<void>;
};
declare const useUpdatePlayer: () => {
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isSuccess: false;
    status: "idle";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    updatePlayer: (playerId: string, playerData: Partial<Player>) => Promise<void>;
} | {
    data: undefined;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: true;
    isSuccess: false;
    status: "loading";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    updatePlayer: (playerId: string, playerData: Partial<Player>) => Promise<void>;
} | {
    data: undefined;
    error: unknown;
    isError: true;
    isIdle: false;
    isLoading: false;
    isSuccess: false;
    status: "error";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    updatePlayer: (playerId: string, playerData: Partial<Player>) => Promise<void>;
} | {
    data: void;
    error: null;
    isError: false;
    isIdle: false;
    isLoading: false;
    isSuccess: true;
    status: "success";
    mutate: react_query.UseMutateFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        db: Firestore;
        playerId: string;
        playerData: Partial<Player>;
    }, unknown>;
    updatePlayer: (playerId: string, playerData: Partial<Player>) => Promise<void>;
};
/**
 * Adds a new player document to Firestore.
 *
 * @param db - The Firestore database object.
 * @param userId - The the id of the user to add.
 * @param playerData - The player data object to add.
 *
 */
declare const createPlayerRQ: ({ db, userId, playerData, }: {
    db: Firestore;
    userId: string;
    playerData: BarePlayer;
}) => Promise<void>;
/**
 * Updates an existing player document in Firestore.
 *
 * @param db - The Firestore database object.
 * @param playerId - The name of the season to update.
 * @param playerData - The partial season data to update.
 */
declare const updatePlayerRQ: ({ playerId, playerData, db, }: {
    db: Firestore;
    playerId: string;
    playerData: Partial<Player>;
}) => Promise<void>;
/**
 * Updates the player's data in the database and records the changes in the player's change history.
 *
 * @param db - The Firestore database instance.
 * @param playerId - The ID of the player whose data is being updated.
 * @param newData - The new data to be saved for the player.
 * @throws {Error} If the player does not exist in the database.
 */
declare const playerUpdateHistory: (db: Firestore, playerId: string, newData: Partial<BarePlayer>) => Promise<void>;

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

type USStates = (typeof usStates)[number];
declare const usStates: readonly [{
    readonly name: "Alabama";
    readonly abbreviation: "AL";
}, {
    readonly name: "Alaska";
    readonly abbreviation: "AK";
}, {
    readonly name: "Arizona";
    readonly abbreviation: "AZ";
}, {
    readonly name: "Arkansas";
    readonly abbreviation: "AR";
}, {
    readonly name: "California";
    readonly abbreviation: "CA";
}, {
    readonly name: "Colorado";
    readonly abbreviation: "CO";
}, {
    readonly name: "Connecticut";
    readonly abbreviation: "CT";
}, {
    readonly name: "Delaware";
    readonly abbreviation: "DE";
}, {
    readonly name: "Florida";
    readonly abbreviation: "FL";
}, {
    readonly name: "Georgia";
    readonly abbreviation: "GA";
}, {
    readonly name: "Hawaii";
    readonly abbreviation: "HI";
}, {
    readonly name: "Idaho";
    readonly abbreviation: "ID";
}, {
    readonly name: "Illinois";
    readonly abbreviation: "IL";
}, {
    readonly name: "Indiana";
    readonly abbreviation: "IN";
}, {
    readonly name: "Iowa";
    readonly abbreviation: "IA";
}, {
    readonly name: "Kansas";
    readonly abbreviation: "KS";
}, {
    readonly name: "Kentucky";
    readonly abbreviation: "KY";
}, {
    readonly name: "Louisiana";
    readonly abbreviation: "LA";
}, {
    readonly name: "Maine";
    readonly abbreviation: "ME";
}, {
    readonly name: "Maryland";
    readonly abbreviation: "MD";
}, {
    readonly name: "Massachusetts";
    readonly abbreviation: "MA";
}, {
    readonly name: "Michigan";
    readonly abbreviation: "MI";
}, {
    readonly name: "Minnesota";
    readonly abbreviation: "MN";
}, {
    readonly name: "Mississippi";
    readonly abbreviation: "MS";
}, {
    readonly name: "Missouri";
    readonly abbreviation: "MO";
}, {
    readonly name: "Montana";
    readonly abbreviation: "MT";
}, {
    readonly name: "Nebraska";
    readonly abbreviation: "NE";
}, {
    readonly name: "Nevada";
    readonly abbreviation: "NV";
}, {
    readonly name: "New Hampshire";
    readonly abbreviation: "NH";
}, {
    readonly name: "New Jersey";
    readonly abbreviation: "NJ";
}, {
    readonly name: "New Mexico";
    readonly abbreviation: "NM";
}, {
    readonly name: "New York";
    readonly abbreviation: "NY";
}, {
    readonly name: "North Carolina";
    readonly abbreviation: "NC";
}, {
    readonly name: "North Dakota";
    readonly abbreviation: "ND";
}, {
    readonly name: "Ohio";
    readonly abbreviation: "OH";
}, {
    readonly name: "Oklahoma";
    readonly abbreviation: "OK";
}, {
    readonly name: "Oregon";
    readonly abbreviation: "OR";
}, {
    readonly name: "Pennsylvania";
    readonly abbreviation: "PA";
}, {
    readonly name: "Rhode Island";
    readonly abbreviation: "RI";
}, {
    readonly name: "South Carolina";
    readonly abbreviation: "SC";
}, {
    readonly name: "South Dakota";
    readonly abbreviation: "SD";
}, {
    readonly name: "Tennessee";
    readonly abbreviation: "TN";
}, {
    readonly name: "Texas";
    readonly abbreviation: "TX";
}, {
    readonly name: "Utah";
    readonly abbreviation: "UT";
}, {
    readonly name: "Vermont";
    readonly abbreviation: "VT";
}, {
    readonly name: "Virginia";
    readonly abbreviation: "VA";
}, {
    readonly name: "Washington";
    readonly abbreviation: "WA";
}, {
    readonly name: "West Virginia";
    readonly abbreviation: "WV";
}, {
    readonly name: "Wisconsin";
    readonly abbreviation: "WI";
}, {
    readonly name: "Wyoming";
    readonly abbreviation: "WY";
}];

export { type ActivePlayer, type BarePlayer, type DateFormat, type DateOrStamp, type DayOfWeek, type Email, FirebaseContext, FirebaseProvider, type Game, type GameOnPlayer, type GamePlay, type GamePlayResults, type Holiday, LOGIN_MODES, type Lineup, type MatchWeek, type MatchupId, type Names, type NotDate, type PastPlayer, type PastPlayerSeasonStat, type PastPlayerStats, type Player, type PlayerId, type PlayerLeague, type PlayerSeason, type PlayerTeam, type PoolHall, type RoundRobinSchedule, type RoundRobinScheduleFinished, type Schedule, type Season, type SeasonName, type StampOrInvalid, type TableMatchup, type TableMatchupFinished, type Team, type TeamId, type TeamInfo, type TeamName, type TeamPlayer, type TeamPlayerRole, type TimeOfYear, type Timestamp, type USStates, addGamesToPlayerRQ, addSeasonRQ, createPlayerRQ, createSuccess, deleteFailed, deleteSuccess, failedCreate, failedFetch, failedUpdate, fetchPastPlayerById, fetchPlayerById, fetchSeasonRQ, fetchTeamByIdRQ, fromStore, loginUser, logoutUser, notFound, observeAuthState, playerUpdateHistory, registerUser, resetPassword, sendVerificationEmail, toStore, tryAgain, updatePlayerRQ, updateSeasonRQ, updateSeasonScheduleRQ, updateSuccess, usStates, useAddGamesToPlayer, useAddSeason, useAuth, useCreatePlayer, useFetchAllPastPlayers, useFetchAllPlayers, useFetchFinishedRoundRobin, useFetchPastPlayerById, useFetchPlayerById, useFetchRoundRobin, useFetchSeason, useFetchSeasons, useFetchTeamById, useFetchTeamsFromSeason, useUpdatePlayer, useUpdateSeason, useUpdateSeasonSchedule };
