import { SettingEntity } from "@/entities/setting.entity";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";

export const dbInternal = (db: SQLiteDatabase) => {
  const initDb = async () => {
    const initSql = `
    CREATE TABLE IF NOT EXISTS settings (key TEXT NOT NULL PRIMARY KEY, value TEXT)
    `;
    await db.execAsync(initSql);
    const seedSql = `
    SELECT 1
    `;
    await db.execAsync(seedSql);
  };

  const getSetting = async (key: string) => {
    return (
      await db.getFirstAsync<SettingEntity>(
        `SELECT * FROM settings WHERE key=?`,
        key
      )
    )?.value;
  };

  const setSetting = async (key: string, value: string) => {
    const result = await db.getFirstAsync<SettingEntity>(
      `SELECT * FROM settings WHERE key=?`,
      key
    );
    if (result) {
      await db.runAsync("UPDATE settings SET value=? WHERE key=?", value, key);
    } else {
      await db.runAsync(
        `INSERT INTO settings(key, value) VALUES (?,?)`,
        key,
        value
      );
    }
  };

  return { initDb, setSetting, getSetting };
};

export const useDb = () => {
  const db = useSQLiteContext();

  const internal = useMemo(() => {
    return dbInternal(db);
  }, [db]);

  return { ...internal };
};

export default useDb;
