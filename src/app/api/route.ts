import { openDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export async function GET() {
	const db = await openDb();
	// const response = await db.all("SELECT * FROM users");
	const response = await sql`SELECT * FROM posts`;
	return NextResponse.json(
		{ message: "All Users Fetched", data: response },
		{ status: 200 }
	);
}
