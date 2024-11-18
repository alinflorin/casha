import { CarEntity } from "@/entities/car.entity";
import { SettingEntity } from "@/entities/setting.entity";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { v1Sql } from "@/migrations/v1.migration.ts";

const migrations = [
  {
    name: "v1",
    sql: v1Sql
  }
];

export const dbInternal = (db: SQLiteDatabase) => {
  const initDb = async () => {
    const currentVersion = await getSetting("dbversion");
    if (!currentVersion) {
      for (let mig of migrations) {
        await db.execAsync(mig.sql);
      }
      await setSetting("dbversion", migrations.length + "");
      return;
    }
    const currentVersionNumber = +currentVersion;
    if (currentVersionNumber < migrations.length) {
      for (let i = currentVersionNumber - 1; i < migrations.length; i++) {
        await db.execAsync(migrations[i].sql);
      }
      await setSetting("dbversion", migrations.length + "");
      return;
    }
  };

  const reset = async () => {
    for (let table of [
      "service_visits_service_items",
      "service_visits",
      "shops",
      "settings",
      "service_items",
      "cars"
    ]) {
      await db.execAsync(`DELETE FROM ${table}`);
    }
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

  const getAllCars = async () => {
    return await db.getAllAsync<CarEntity>(`SELECT * FROM cars`);
  };

  const deleteCar = async (id: number) => {
    return await db.runAsync(`DELETE FROM cars WHERE id=?`, id);
  };

  const getCar = async (id: number) => {
    return await db.getFirstAsync<CarEntity>(
      `SELECT * FROM cars WHERE id=? LIMIT 1`,
      id
    );
  };

  const addCar = async (car: CarEntity) => {
    return await db.runAsync(
      `INSERT INTO cars(vin, display_name, make, model, year, km, obd_adapter_data, uses_imperial)
    VALUES (?,?,?,?,?,?,?,?)`,
      car.vin,
      car.display_name,
      car.make,
      car.model,
      car.year,
      car.km ? car.km : null,
      car.obd_adapter_data ? car.obd_adapter_data : null,
      car.uses_imperial
    );
  };

  const editCar = async (id: number, car: CarEntity) => {
    return await db.runAsync(
      `UPDATE cars SET vin=?, display_name=?, make=?, model=?, year=?, km=?, obd_adapter_data=?, uses_imperial=?
      WHERE id=?`,
      car.vin,
      car.display_name,
      car.make,
      car.model,
      car.year,
      car.km ? car.km : null,
      car.obd_adapter_data ? car.obd_adapter_data : null,
      car.uses_imperial,
      id
    );
  };

  return {
    initDb,
    reset,
    setSetting,
    getSetting,
    getAllCars,
    deleteCar,
    getCar,
    addCar,
    editCar
  };
};

export const useDb = () => {
  const db = useSQLiteContext();

  const internal = useMemo(() => {
    return dbInternal(db);
  }, [db]);

  return { ...internal };
};

export default useDb;
