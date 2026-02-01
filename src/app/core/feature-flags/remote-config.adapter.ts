export interface RemoteConfigAdapter {
  isSupported(): boolean;
  fetchAndActivate(): Promise<void>;
  getBoolean(key: string): Promise<boolean>;
}
