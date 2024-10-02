import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const databaseName = Constants.expoConfig!.extra!.databaseName;

class DbService {
  async init() {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const initSql = `
    SELECT 1
    `;
    await db.execAsync(initSql);
    const seedSql = `
    SELECT 1
    `;
    await db.execAsync(seedSql);
    await db.closeAsync();
    console.log('DB Init OK');
  }
}

export const dbService = new DbService();
export default dbService;