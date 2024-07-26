import { authInstance } from "./apiCreator";
import { EventType, User } from "./types";

class Endpoints {
	async register(data: Omit<User, "id">): Promise<any> {
		try {
			const response = await authInstance.post(`/auth/register`, data);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async login(data: Omit<User, "role" | "id">): Promise<any> {
		try {
			const response = await authInstance.post(`/auth/login`, data);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async createEvent(data: EventType): Promise<any> {
		try {
			const response = await authInstance.post(`/events`, data);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async editEvent(data: {
		eventId: string;
		payload: Partial<EventType>;
	}): Promise<any> {
		try {
			const response = await authInstance.patch(
				`/events/${data.eventId}`,
				data.payload
			);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async deleteEvent(eventId: number): Promise<any> {
		try {
			const response = await authInstance.delete(`/events/${eventId}`);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getEvents(): Promise<any> {
		try {
			const response = await authInstance.get(`/events`);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async getEvent(eventId: number): Promise<any> {
		try {
			const response = await authInstance.get(`/events/${eventId}`);
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

export default Endpoints;
