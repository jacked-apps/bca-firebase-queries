import * as Shared from './sharedTypes';

// Represents a player (archive) in pastPlayers collection
// Names includes: firstName, lastName, nickName
export type PastPlayer = Shared.Names & {
  id: Shared.Email; // the Email of the player also the id of the document
  currentUserId?: Shared.PlayerId;
  email: Shared.Email; // Email of the player
  dob: string; // Date of birth of the player
  address: string; // The players Address
  city: string; // The city the player lives in
  state: string; // The state the player lives in
  zip: string; // That cities zip code
  phone: string; // The players phone number
  // archived wins and losses for the last 3 seasons if available
  stats: PastPlayerStats;
  seasons?: string[];
  teams?: string[];
};

export type PastPlayerStats = {
  [dateString: string]: PastPlayerSeasonStat;
};

export type PastPlayerSeasonStat = {
  wins: number;
  losses: number;
  seasonName: Shared.SeasonName;
  seasonEnd?: Shared.Timestamp;
  game: Shared.Game;
};

// Represents a player that has logged into the app with minimal information
// needed to run most of the seasons data.
// export type CurrentUser = Shared.Names & {
//   id: string;
//   isAdmin?: boolean | string;
//   email: Shared.Email;
//   stats?: { [game: string]: { wins: number; losses: number } };
//   seasons: string[];
//   teams: string[];
//   pastPlayerId?: Shared.Email;
// };

//

export type BarePlayer = Shared.Names & {
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: Shared.Email;
  dob: string;
};

export type Player = BarePlayer & {
  id: string;
  leagues: PlayerLeague[];
  seasons: PlayerSeason[];
  teams: PlayerTeam[];
  isAdmin: boolean;
};

export type PlayerLeague = {
  id: string;
  locationName: string;
  name: string;
  playerHandicap: number;
};

export type PlayerSeason = {
  leagueId: string;
  name: string;
  seasonHandicap: number;
  rank: number;
  losses: number;
  wins: number;
};

export type PlayerTeam = {
  teamId: string;
  name: string;
};
