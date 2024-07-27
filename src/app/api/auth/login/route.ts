import { openDb } from "@/lib/db";
import { comparePassword } from "@/utils/hash";
import { generateToken } from "@/utils/token";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { User } from "@/lib/types";

export async function POST(request: Request) {
	const { email, password } = await request.json();
	const users = await sql`SELECT * FROM users WHERE email = ${email}`;
	const user = users.rows[0] as User;
	if (user && (await comparePassword(password, user.password))) {
		const userToken = generateToken(user);
		return NextResponse.json(
			{
				message: "Login successful",
				data: {
					email: user.email,
					id: user.id,
					role: user.role,
					token: userToken,
				},
			},
			{ status: 200 }
		);
	}
	return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
}
