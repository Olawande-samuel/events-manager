import { openDb } from "../lib/db.js";

(async () => {
	const db = await openDb();
	const events = [
		{
			title: "DNC Rally",
			description:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			location: "Oregon",
			starts: "2024-08-01T10:00",
			ends: "2024-08-01T12:00",
			userId: 1,
		},
		{
			title: "RNC Rally",
			description:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			location: "Washington Park",
			starts: "2024-08-02T14:00",
			ends: "2024-08-02T16:00",
			userId: 1,
		},
		{
			title: "General's Birthday Party",
			description:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			location: "Mykonos, Greece",
			starts: "2024-08-03T09:00",
			ends: "2024-08-03T11:00",
			userId: 2,
		},
		{
			title: "Global Fiesta",
			description:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			location: "Location 4",
			starts: "2024-08-04T13:00",
			ends: "2024-08-04T15:00",
			userId: 2,
		},
		{
			title: "Programmers' Workshop",
			description:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			location: "Remote",
			starts: "2024-08-05T10:00",
			ends: "2024-08-05 12:00",
			userId: 1,
		},
		{
			title: "End of the Session Party",
			description:
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			location: "All Schools",
			starts: "2024-08-06T10:00",
			ends: "2024-08-06T16:00",
			userId: 1,
		},
	];
	for (const event of events) {
		await db.run(
			"INSERT INTO events (event_title, event_location, event_starts, event_ends, event_description, userId) VALUES (?, ?, ?, ?, ?, ?)",
			[
				event.title,
				event.location,
				event.starts,
				event.ends,
				event.description,
				event.userId,
			]
		);
	}
	console.log("data inserted successfully");
})();
