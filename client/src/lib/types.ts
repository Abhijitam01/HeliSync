export interface DatabaseCredentials {
  hostname: string;
  port: string;
  username: string;
  password: string;
  databaseName: string;
  isValidated?: boolean;
}

export interface IndexingPreferences {
  nftBids: boolean;
  tokenPrices: boolean;
  borrowableTokens: boolean;
}

export enum LogType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export interface IndexingLog {
  id: string;
  timestamp: string;
  message: string;
  type: LogType;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  credentials?: DatabaseCredentials;
  preferences?: IndexingPreferences;
}
