import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function greet(time: number) {
	if (time) {
		if (time < 12) {
			return "Good Morning ";
		}
		if (time >= 12 && time < 18) {
			return "Good Afternoon";
		}
		return "Good Evening ";
	}
	return "Hello ";
}

export const getToken = () => {
	if (typeof window !== "undefined") {
		return localStorage.getItem("authToken");
	}
	return null;
};
