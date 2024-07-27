import { openDb } from "@/lib/db";
import { hashPassword } from "@/utils/hash";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
	const { email, password, role } = await req.json();
	const hashedPassword = await hashPassword(password);
	try {
		const userExists = await sql`SELECT * FROM users WHERE email = ${email}`;
		if (userExists.rows.length > 0) {
			return NextResponse.json(
				{ message: "User with that email already exist" },
				{ status: 400 }
			);
		}

		await sql`INSERT INTO users (email, password, role) VALUES (${email}, ${hashedPassword}, ${role})`;

		return NextResponse.json(
			{ message: "User Registered Successfully" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "User registration failed", error: JSON.stringify(error) },
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
