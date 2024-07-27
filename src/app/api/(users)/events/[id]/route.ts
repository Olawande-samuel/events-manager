import { openDb } from "@/lib/db";
import { verifyToken } from "@/utils/token";
import { sql } from "@vercel/postgres";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

type Context = { params: { id: string } };

export async function GET(request: Request, context: Context) {
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
		const events =
			await sql`SELECT * FROM events WHERE id = ${context.params.id}`;

		if (events.rows.length < 1) {
			return NextResponse.json(
				{ message: "Could not find event", data: null },
				{ status: 200 }
			);
		}
		return NextResponse.json(
			{ message: "success", data: events.rows[0] ?? {} },
			{ status: 200 }
		);
	}

	const userEvents =
		await sql`SELECT * FROM events WHERE userId = ${userInfo.id} AND id = ${context.params.id}`;
	if (userEvents.rows.length < 1) {
		return NextResponse.json(
			{ message: "Could not find event", data: null },
			{ status: 200 }
		);
	}
	return NextResponse.json(
		{ message: "success", data: userEvents.rows[0] ?? {} },
		{ status: 200 }
	);
}
export async function PATCH(request: Request, context: Context) {
	const {
		event_description,
		event_ends,
		event_starts,
		event_location,
		event_title,
	} = await request.json();

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

	if (userInfo?.role === "admin") {
		const res =
			await sql`UPDATE events SET event_title = ${event_title}, event_location = ${event_location}, event_description = ${event_description}, event_starts = ${event_starts}, event_ends = ${event_ends} WHERE id = ${context.params.id}`;

		if (!res) {
			return NextResponse.json(
				{ message: "could not update event" },
				{ status: 500 }
			);
		}
		return NextResponse.json(
			{ message: "Event updated successfully" },
			{ status: 200 }
		);
	}

	const userEvents =
		await sql`SELECT * FROM events WHERE userId = ${userInfo.id} AND id = ${context.params.id}`;
	if (userEvents.rows.length < 1) {
		return NextResponse.json(
			{ message: "Could not find event", data: null },
			{ status: 200 }
		);
	}
	const response =
		await sql`UPDATE events SET event_title = ${event_title}, event_location = ${event_location}, event_description = ${event_description}, event_starts = ${event_starts}, event_ends = ${event_ends} WHERE id = ${context.params.id} AND userId = ${userInfo.id}`;
	if (!response) {
		return NextResponse.json(
			{ message: "could not update event" },
			{ status: 500 }
		);
	}
	return NextResponse.json(
		{ message: "Event updated successfully", data: userEvents ?? {} },
		{ status: 200 }
	);
}
export async function DELETE(request: Request, context: Context) {
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

	if (userInfo?.role === "admin") {
		const res = await sql`DELETE FROM events WHERE id = ${context.params.id}`;
		if (!res) {
			return NextResponse.json(
				{ message: "could not delete event" },
				{ status: 500 }
			);
		}
		return NextResponse.json(
			{ message: "Event deleted successfully" },
			{ status: 200 }
		);
	}

	const userEvents =
		await sql`SELECT * FROM events WHERE userId = ${userInfo.id} AND id = ${context.params.id}`;

	if (userEvents.rows.length < 1) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const response =
		await sql`DELETE FROM events WHERE id = ${context.params.id}`;
	console.log(response);
	if (!response) {
		return NextResponse.json(
			{ message: "could not delete event" },
			{ status: 500 }
		);
	}
	return NextResponse.json(
		{ message: "Event deleted successfully" },
		{ status: 200 }
	);
}
