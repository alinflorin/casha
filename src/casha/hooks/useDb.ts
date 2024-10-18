import { SettingEntity } from "@/entities/setting.entity";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";

const initSql = `
CREATE TABLE IF NOT EXISTS cars (
	vin integer primary key NOT NULL UNIQUE,
	display_name TEXT NOT NULL,
	make TEXT NOT NULL,
	model TEXT NOT NULL,
	year INTEGER NOT NULL,
	km INTEGER,
	obd_adapter_data TEXT
);
CREATE TABLE IF NOT EXISTS service_items (
	id integer primary key NOT NULL UNIQUE,
	name TEXT NOT NULL,
	service_interval_months INTEGER,
	service_interval_km INTEGER
);
CREATE TABLE IF NOT EXISTS active_service_items (
	vin TEXT NOT NULL,
	service_item_id INTEGER NOT NULL,
	service_interval_months INTEGER,
	service_interval_km INTEGER,
FOREIGN KEY(vin) REFERENCES cars(vin),
FOREIGN KEY(service_item_id) REFERENCES service_items(id)
);
`;

const seedSql = `
SELECT 1;
`;

export const dbInternal = (db: SQLiteDatabase) => {
  const initDb = async () => {
    await db.execAsync(initSql);
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
