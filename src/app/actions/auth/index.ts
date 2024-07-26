import Endpoints from "@/lib/endpoints";
import axios, { isAxiosError } from "axios";
import { z } from "zod";

const userSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
	role: z.enum(["user", "admin"]),
});

export async function createUser(prevState: any, formData: FormData) {
	const validated = userSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		role: formData.get("role"),
	});

	if (!validated.success) {
		return {
			errors: validated.error.flatten().fieldErrors,
		};
	}

	const API = new Endpoints();

	try {
		const response = await API.register(validated.data);
		console.log(response)
		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.response;
		}
		if (error instanceof Error) {
			return { message: error.message };
		}
		return { message: "An Error occurred" };
	}
}

const loginSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
	password: z.string().min(2, { message: "Password is required" }),
});
export async function login(prevState: any, formData: FormData) {
	const API = new Endpoints();
	const validateForm = loginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validateForm.success) {
		return {
			errors: validateForm.error.flatten().fieldErrors,
		};
	}
	try {
		const response = await API.login(validateForm.data);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.response;
		}
		if (error instanceof Error) {
			return { message: error.message };
		}
		return { message: "An Error occurred" };
	}
}
