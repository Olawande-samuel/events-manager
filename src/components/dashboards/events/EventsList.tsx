"use client";

import FormInput from "@/components/FormInput";
import UpComingEvents from "../UpcomingEvents";
import { useState } from "react";

const EventsList = () => {
	const [search, setSearch] = useState("");
	return (
		<div>
			<div className="flex mb-8">
				<FormInput
					type="search"
					name="search"
					value={search}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSearch(e.target.value)
					}
					label="Search"
					labelClassName="sr-only"
					placeholder="Search for an event"
					formId="eventSearch"
				/>
			</div>
			<UpComingEvents search={search} />
		</div>
	);
};
export default EventsList;
