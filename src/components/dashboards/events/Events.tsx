import moment from "moment";
import Card from "../Card";
import Link from "next/link";
import { EventType } from "@/lib/types";

const Events = ({ id, event_title, event_starts }: EventType) => {
	return (
		<Card className="shadow-sm hover:bg-accent hover:bg-opacity-50">
			<Link href={`/dashboard/events/${id}`}>
				<div>
					<p className="text-2xl font-bold mb-2">{event_title}</p>
					<p>{moment(event_starts).format("dddd DD MMMM, YYYY, hh:mm a")}</p>
				</div>
			</Link>
			<div></div>
		</Card>
	);
};
export default Events;
