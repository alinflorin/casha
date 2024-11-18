export const v1Sql = `CREATE TABLE IF NOT EXISTS cars (
	id integer primary key NOT NULL UNIQUE,
	vin TEXT NOT NULL UNIQUE,
	display_name TEXT NOT NULL,
	make TEXT NOT NULL,
	model TEXT NOT NULL,
	year INTEGER NOT NULL,
	km INTEGER,
	obd_adapter_data TEXT,
  uses_imperial INTEGER NOT NULL DEFAULT '0'
);
CREATE TABLE IF NOT EXISTS service_items (
	id integer primary key NOT NULL UNIQUE,
	car_id INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE,
	service_interval_months INTEGER,
	service_interval_km INTEGER,
FOREIGN KEY(car_id) REFERENCES cars(id)
);
CREATE TABLE IF NOT EXISTS settings (
	key TEXT NOT NULL UNIQUE,
	value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS shops (
	id integer primary key NOT NULL UNIQUE,
	name TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS service_visits (
	id integer primary key NOT NULL UNIQUE,
	car_id INTEGER NOT NULL,
	shop_id INTEGER NOT NULL,
	visit_date REAL NOT NULL,
	total_spent INTEGER NOT NULL DEFAULT '0',
FOREIGN KEY(car_id) REFERENCES cars(id),
FOREIGN KEY(shop_id) REFERENCES shops(id)
);
CREATE TABLE IF NOT EXISTS service_visits_service_items (
	id integer primary key NOT NULL UNIQUE,
	service_visit_id INTEGER NOT NULL,
	service_item_id INTEGER NOT NULL,
FOREIGN KEY(service_visit_id) REFERENCES service_visits(id),
FOREIGN KEY(service_item_id) REFERENCES service_items(id)
);
CREATE TABLE IF NOT EXISTS common_service_items (
	id integer primary key NOT NULL UNIQUE,
	name TEXT NOT NULL UNIQUE,
	service_interval_months INTEGER,
	service_interval_km INTEGER
);`;
