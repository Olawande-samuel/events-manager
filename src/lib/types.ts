export interface EventType {
	event_title: string;
	event_description: string;
	event_location: string;
	event_starts: string;
	event_ends: string;
	id?: number;
	userId?: number;
}

export interface User {
	email: string;
	role: string;
	id: string;
	password: string;
}

export type registerResponse = {};
export type loginResponse = {
	message: string;
	data: {
		email: string;
		id: number;
		role: string;
		token: string;
	};
};
