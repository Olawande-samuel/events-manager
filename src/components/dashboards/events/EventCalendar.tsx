"use client";

import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useEvents from "@/hooks/useEvents";
import { EventType as IEvent } from "@/lib/types";
const localizer = momentLocalizer(moment);

interface EventType {
	id: number;
	title: string;
	start: Date;
	end: Date;
	desc?: string;
}

const EventCalendar = () => {
	const { response } = useEvents();
	const router = useRouter();
	const [view, setView] = useState<
		"month" | "week" | "work_week" | "day" | "agenda"
	>("month");
	const [selectedDate, setSelectedData] = useState(new Date());

	const events: EventType[] = useMemo(() => {
		return (
			response?.map((curr) => ({
				id: curr.id as number,
				title: curr.event_title,
				desc: curr.event_description,
				start: new Date(curr.event_starts),
				end: new Date(curr.event_ends),
			})) || []
		);
	}, [response]);

	function onEventClick(event: EventType) {
		router.push(`/dashboard/events/${event.id}`);
	}

	return (
		<div className="overflow-x-auto sm:overflow-x-hidden">
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				view={view}
				onView={setView}
				date={selectedDate}
				onNavigate={setSelectedData}
				onSelectEvent={onEventClick}
			/>
		</div>
	);
};
export default EventCalendar;
