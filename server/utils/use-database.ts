import { setupDB } from '../lib/db-connection';

export const useDatabase = () => {
  return setupDB();
};
