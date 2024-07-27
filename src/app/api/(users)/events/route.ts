import { openDb } from "@/lib/db";
import { verifyToken } from "@/utils/token";
import { sql } from "@vercel/postgres";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const bearer = request.headers.get("Authorization");
	if (!bearer) {
		return NextResponse.json(
			{ message: "User is unauthorized" },
			{ status: 401 }
		);
	}
	// verifyToken
	const token = bearer.split(" ")[1];
	const isValidBearer = verifyToken(token);

	if (!isValidBearer) {
		return NextResponse.json(
			{ message: "User is unauthorized" },
			{ status: 401 }
		);
	}

	// if user is admin return all
	const userInfo = isValidBearer as JwtPayload;

	if (userInfo?.role === "admin") {
		const events = await sql`SELECT * FROM events`;
		return NextResponse.json(
			{ message: "success", data: events.rows ?? [] },
			{ status: 200 }
		);
	}

	const userEvents =
		await sql`SELECT * FROM events WHERE userId = ${userInfo.id}`;
	return NextResponse.json(
		{ message: "success", data: userEvents.rows ?? [] },
		{ status: 200 }
	);
}

export async function POST(request: Request) {
	const {
		event_description,
		event_ends,
		event_starts,
		event_location,
		event_title,
	} = await request.json();
	if (
		!event_ends ||
		!event_starts ||
		!event_description ||
		!event_location ||
		!event_title
	) {
		return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
	}
	const bearer = request.headers.get("Authorization");
	if (!bearer) {
		return NextResponse.json(
			{ message: "User is unauthorized" },
			{ status: 401 }
		);
	}
	// verifyToken
	const token = bearer.split(" ")[1];
	const isValidBearer = verifyToken(token);

	if (!isValidBearer) {
		return NextResponse.json(
			{ message: "User is unauthorized" },
			{ status: 401 }
		);
	}
	const userInfo = isValidBearer as JwtPayload;

	const event =
		await sql`INSERT INTO events (event_title, event_location, event_description, event_starts, event_ends, userId) VALUES (${event_title}, ${event_location}, ${event_description}, ${event_starts}, ${event_ends}, ${userInfo.id})`;

	if (!event) {
		return NextResponse.json({ message: "An Error Occurred" }, { status: 500 });
	}
	return NextResponse.json(
		{ message: "Event added successfully" },
		{ status: 201 }
	);
}
