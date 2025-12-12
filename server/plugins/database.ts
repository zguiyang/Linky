import { setupDB } from '../lib/db-connection';

export default defineNitroPlugin(() => {
  setupDB();
});
