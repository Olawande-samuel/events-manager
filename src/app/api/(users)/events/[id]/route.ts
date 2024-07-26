import { openDb } from "@/lib/db";
import { verifyToken } from "@/utils/token";
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
	// connect to db
	const db = await openDb();

	// if user is admin return all
	const userInfo = isValidBearer as JwtPayload;
	if (userInfo?.role === "admin") {
		const events = await db.get("SELECT * FROM events");
		return NextResponse.json(
			{ message: "success", data: events ?? {} },
			{ status: 200 }
		);
	}

	const userEvents = await db.get(
		"SELECT * FROM events WHERE userId = ? AND id = ?",
		[userInfo.id, context.params.id]
	);
	if (!userEvents) {
		return NextResponse.json(
			{ message: "Could not find event", data: null },
			{ status: 200 }
		);
	}
	return NextResponse.json(
		{ message: "success", data: userEvents ?? {} },
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
	const db = await openDb();

	const userInfo = isValidBearer as JwtPayload;

	if (userInfo?.role === "admin") {
		const res = await db.run(
			"UPDATE events SET event_title = ?, event_location = ?, event_description = ?, event_starts = ?, event_ends = ? WHERE id = ?",
			[
				event_title,
				event_location,
				event_description,
				event_starts,
				event_ends,
				context.params.id,
			]
		);
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

	const userEvents = await db.get(
		"SELECT * FROM events WHERE userId = ? AND id = ?",
		[userInfo.id, context.params.id]
	);

	if (!userEvents) {
		return NextResponse.json(
			{ message: "Could not find event", data: null },
			{ status: 200 }
		);
	}
	const response = await db.run(
		"UPDATE events SET event_title = ?, event_location = ?, event_description = ?, event_starts = ?, event_ends = ? WHERE id = ?",
		[
			event_title,
			event_location,
			event_description,
			event_starts,
			event_ends,
			context.params.id,
		]
	);
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
	// connect to db
	const db = await openDb();

	if (userInfo?.role === "admin") {
		const res = await db.run("DELETE FROM events WHERE id = ?", [
			context.params.id,
		]);
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

	const userEvents = await db.get(
		"SELECT * FROM events WHERE userId = ? AND id = ?",
		[userInfo.id, context.params.id]
	);

	if (!userEvents) {
		return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
	}

	const response = await db.run("DELETE FROM events WHERE id = ?", [
		context.params.id,
	]);
	if (!response) {
		return NextResponse.json(
			{ message: "could not delete event" },
			{ status: 500 }
		);
	}
	return NextResponse.json(
		{ message: "Event deleted successfully", },
		{ status: 200 }
	);
}
