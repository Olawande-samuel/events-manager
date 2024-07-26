import { User } from "@/lib/types";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PRIVATE_JWT_SECRET;
export const generateToken = (user: User) => {
	return jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		SECRET_KEY as string,
		{ expiresIn: "24h" }
	);
};

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET_KEY as string);
	} catch (error) {
		return null;
	}
};
