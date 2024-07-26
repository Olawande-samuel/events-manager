"use client";

import Button from "@/components/Button";
import AddEvent from "@/components/dashboards/events/AddEvent";
import EventCalendar from "@/components/dashboards/events/EventCalendar";
import EventsList from "@/components/dashboards/events/EventsList";
import { Calendar, List } from "lucide-react";
import { useState } from "react";

const Events = () => {
	const [calendarView, setCalendarView] = useState(false);
	return (
		<div>
			<div className="flex justify-between items-center flex-wrap gap-4 mb-8">
				<p className="font-semibold">Events</p>
				<div className="flex justify-end items-center gap-6">
					<div
						className="flex items-center"
						onClick={() => setCalendarView(!calendarView)}
					>
						{calendarView ? (
							<List size={32} className="cursor-pointer" />
						) : (
							<Calendar size={32} className="cursor-pointer" />
						)}
					</div>

					<AddEvent />
				</div>
			</div>
			{calendarView ? <EventCalendar /> : <EventsList />}
		</div>
	);
};
export default Events;
