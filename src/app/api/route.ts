import { openDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	const db = await openDb();
	const response = await db.all("SELECT * FROM users");
	return NextResponse.json(
		{ message: "All Users Fetched", data: response },
		{ status: 200 }
	);
}
