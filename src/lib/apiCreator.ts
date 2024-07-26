import axios from "axios";
import { getToken } from "./utils";

const baseInstance = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

const authInstance = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

authInstance.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		const authToken = JSON.parse(token);
		config.headers.Authorization = "Bearer " + authToken;
	}
	return config;
});

export { authInstance, baseInstance };
