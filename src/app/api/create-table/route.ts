import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const userTable = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'user'))
      );
    `;
		const eventsTable = await sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        event_title TEXT NOT NULL,
        event_location TEXT NOT NULL,
        event_description TEXT NOT NULL,
        event_starts TIMESTAMP NOT NULL,
        event_ends TIMESTAMP NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
		return NextResponse.json({ userTable, eventsTable }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
