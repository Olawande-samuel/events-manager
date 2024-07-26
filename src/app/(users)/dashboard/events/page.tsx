import AddEvent from "@/components/dashboards/events/AddEvent";
import EventCalendar from "@/components/dashboards/events/EventCalendar";

const Events = () => {
	return (
		<div>
			<p className="mb-4">Events</p>
			<div className="mb-8">
				<AddEvent />
			</div>
			<EventCalendar />
		</div>
	);
};
export default Events;
