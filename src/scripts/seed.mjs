import { openDb } from "../lib/db.js";

async function seed() {
	const db = await openDb();
	await db.exec(
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL,
			role TEXT NOT NULL);

      CREATE TABLE IF NOT EXISTS events (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			event_title TEXT NOT NULL,
			event_location TEXT NOT NULL,
			event_description TEXT NOT NULL,
			event_starts TEXT NOT NULL,
			event_ends TEXT NOT NULL,
			userId INTEGER NOT NULL,
			FOREIGN KEY (userId) REFERENCES users (id)
		);
        `
	);
}
seed();
