import * as react_query from 'react-query';
import { Timestamp as Timestamp$1 } from 'firebase/firestore';
import { User } from 'firebase/auth';

type HookProps<T> = {
    useToast?: boolean;
    successToastLength?: number;
    successMessage?: string;
    failedMessage?: string;
    onFetchSuccess?: (data: T) => void;
};

type Timestamp = Timestamp$1;
type SeasonName = string;
type Email = string;
type TeamId = string;
type PlayerId = string;
type MatchupId = string;
type Game = '8 Ball' | '9 Ball' | '10 Ball';
type PoolHall = "Butera's Billiards" | 'Billiard Plaza';
type Names = {
    firstName: string;
    lastName: string;
    nickname: string;
};
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

declare const useAddSeason: (props?: HookProps<void>) => {
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
declare const useUpdateSeason: (props?: HookProps<void>) => react_query.UseMutationResult<void, unknown, {
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
type CurrentUser = Names & {
    id: string;
    isAdmin?: boolean | string;
    email: Email;
    stats?: {
        [game: string]: {
            wins: number;
            losses: number;
        };
    };
    seasons: string[];
    teams: string[];
    pastPlayerId?: Email;
};

declare const useFetchPastPlayerById: (playerId: Email | undefined) => react_query.UseQueryResult<PastPlayer | null, unknown>;
declare const useFetchCurrentUserById: (id: string | undefined) => react_query.UseQueryResult<CurrentUser | null, unknown>;
declare const useFetchPastPlayers: () => react_query.UseQueryResult<PastPlayer[], unknown>;
declare const useFetchCurrentUsers: () => react_query.UseQueryResult<CurrentUser[], unknown>;
/**
 * Fetches a PastPlayer object by ID from Firestore.
 *
 * @param playerId - The ID of the past player to fetch.
 * @returns A Promise resolving to the PastPlayer object if found, or null if not found.
 * @throws Error if ID is not provided.
 */
declare const fetchPastPlayerByIdRQ: (playerId: Email | undefined) => Promise<PastPlayer | null>;
/**
 * Fetches a CurrentUser object by ID from Firestore.
 *
 * @param id - The ID of the user to fetch.
 * @returns A Promise resolving to the CurrentUser object if found, or null if not found.
 * @throws Error if ID is not provided.
 */
declare const fetchCurrentUserById: (id: string | undefined) => Promise<CurrentUser | null>;

declare const useUpdateSeasonSchedule: (props?: HookProps<void>) => react_query.UseMutationResult<void, unknown, {
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

declare const useAddPlayerToTeam: () => react_query.UseMutationResult<void, unknown, {
    teamId: TeamId;
    role: TeamPlayerRole;
    playerData: TeamPlayer;
}, unknown>;
declare const useAddTeamToBothViaPlayer: () => react_query.UseMutationResult<void, unknown, string | undefined, unknown>;
declare const useAddTeamToBothViaUser: () => react_query.UseMutationResult<void, unknown, string | undefined, unknown>;
declare const useRemoveTeamFromBothViaPlayer: () => react_query.UseMutationResult<void, unknown, string | undefined, unknown>;
declare const useRemoveTeamFromBothViaUser: () => react_query.UseMutationResult<void, unknown, string | undefined, unknown>;
/**
 * Removes all players from a team by:
 * 1. Getting the team document.
 * 2. Getting the player IDs from the team document.
 * 3. Looping through each player ID:
 *   3a. Get the pastPlayer document.
 *   3b. Remove the team ID from the pastPlayer's teams array.
 *   3c. If the pastPlayer has a currentUserId, get that document.
 *   3d. Remove the team ID from the currentUser's teams array.
 *
 * This is done in a transaction to ensure consistency.
 */
declare const removeAllPlayersFromTeamRQ: (teamId: TeamId) => Promise<void>;

declare const createNewTeamData: (teamName: string, seasonId: SeasonName) => {
    teamName: string;
    seasonId: string;
    players: {
        captain: {};
        player2: {};
        player3: {};
        player4: {};
        player5: {};
    };
    wins: number;
    losses: number;
    points: number;
};
/**
 * Hook to remove a team from a season.
 *
 * Calls removeTeamFromSeasonRQ to remove the team ID from the season's
 * team array. Also deletes the team document and removes teamId players documents.
 *
 * @param props - Optional config props for useMutation
 * @returns Object with removeTeam function and mutation result/methods
 */
declare const useRemoveTeamFromSeason: (props?: HookProps<void>) => {
    data: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isLoading: false;
    isSuccess: false;
    status: "idle";
    mutate: react_query.UseMutateFunction<void, unknown, {
        seasonName: SeasonName;
        teamId: TeamId;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        teamId: TeamId;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        teamId: TeamId;
    }, unknown>;
    removeTeam: (seasonName: SeasonName, teamId: TeamId) => Promise<void>;
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
        teamId: TeamId;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        teamId: TeamId;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        teamId: TeamId;
    }, unknown>;
    removeTeam: (seasonName: SeasonName, teamId: TeamId) => Promise<void>;
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
        teamId: TeamId;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        teamId: TeamId;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        teamId: TeamId;
    }, unknown>;
    removeTeam: (seasonName: SeasonName, teamId: TeamId) => Promise<void>;
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
        teamId: TeamId;
    }, unknown>;
    reset: () => void;
    context: unknown;
    failureCount: number;
    isPaused: boolean;
    variables: {
        seasonName: SeasonName;
        teamId: TeamId;
    } | undefined;
    mutateAsync: react_query.UseMutateAsyncFunction<void, unknown, {
        seasonName: SeasonName;
        teamId: TeamId;
    }, unknown>;
    removeTeam: (seasonName: SeasonName, teamId: TeamId) => Promise<void>;
};
declare const useUpdateTeamData: (props?: HookProps<void>) => react_query.UseMutationResult<void, unknown, {
    teamId: TeamId;
    data: Team;
}, unknown>;
declare const useAddNewTeamToSeason: (props?: HookProps<void>) => react_query.UseMutationResult<void, unknown, {
    seasonName: SeasonName;
    teamName: string;
}, unknown>;

declare const useAuth: () => {
    user: User | null;
};

export { addSeasonRQ, createNewTeamData, fetchCurrentUserById, fetchPastPlayerByIdRQ, fetchSeasonRQ, fetchTeamByIdRQ, removeAllPlayersFromTeamRQ, updateSeasonRQ, updateSeasonScheduleRQ, useAddNewTeamToSeason, useAddPlayerToTeam, useAddSeason, useAddTeamToBothViaPlayer, useAddTeamToBothViaUser, useAuth, useFetchCurrentUserById, useFetchCurrentUsers, useFetchFinishedRoundRobin, useFetchPastPlayerById, useFetchPastPlayers, useFetchRoundRobin, useFetchSeason, useFetchSeasons, useFetchTeamById, useFetchTeamsFromSeason, useRemoveTeamFromBothViaPlayer, useRemoveTeamFromBothViaUser, useRemoveTeamFromSeason, useUpdateSeason, useUpdateSeasonSchedule, useUpdateTeamData };
