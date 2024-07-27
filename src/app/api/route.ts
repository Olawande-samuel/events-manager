import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
	const response = await sql`SELECT * FROM users`;
	return NextResponse.json(
		{ message: "All Users Fetched", data: response },
		{ status: 200 }
	);
}
