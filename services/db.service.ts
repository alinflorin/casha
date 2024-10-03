import { SettingEntity } from "@/entities/setting.entity";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const databaseName = Constants.expoConfig!.extra!.databaseName;

class DbService {
  async init() {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const initSql = `
    CREATE TABLE IF NOT EXISTS settings (key TEXT NOT NULL PRIMARY KEY, value TEXT)
    `;
    await db.execAsync(initSql);
    const seedSql = `
    SELECT 1
    `;
    await db.execAsync(seedSql);
    await db.closeAsync();
    console.log("DB Init OK");
  }

  async getSetting(key: string) {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const result = await db.getFirstAsync<SettingEntity>(
      `SELECT * FROM settings WHERE key=?`,
      key,
    );
    await db.closeAsync();
    return result;
  }

  async setSetting(key: string, value: string) {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const result = await db.getFirstAsync<SettingEntity>(
      `SELECT * FROM settings WHERE key=?`,
      key,
    );
    if (result) {
      await db.runAsync("UPDATE settings SET value=? WHERE key=?", value, key);
    } else {
      await db.runAsync(
        `INSERT INTO settings(key, value) VALUES (?,?)`,
        key,
        value,
      );
    }
    await db.closeAsync();
  }
}

export const dbService = new DbService();
export default dbService;
