import { openDb } from "@/lib/db";
import { hashPassword } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email, password, role } = await req.json();
	const db = await openDb();
	const hashedPassword = await hashPassword(password);
	try {
		// check if email exists
		const userExists = await db.get("SELECT * FROM users WHERE email = ?", [
			email,
		]);
		if (userExists) {
			return NextResponse.json(
				{ message: "User with that email already exist" },
				{ status: 400 }
			);
		}

		await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [
			email,
			hashedPassword,
			role,
		]);

		return NextResponse.json(
			{ message: "User Registered Successfully" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "User registration failed" },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	return NextResponse.json(
		{ error: "Error getting Server Error" },
		{ status: 500 }
	);
}