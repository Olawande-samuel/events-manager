"use client";

import useEvents from "@/hooks/useEvents";
import { EventType } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import Card from "./Card";
import Events from "./events/Events";

const UpComingEvents = ({ search = "" }: { search?: string }) => {
	const { response, isLoading } = useEvents();
	return (
		<div className="">
			<h2 className="font-semibold text-lg mb-4">Upcoming Events</h2>
			<Card className="min-h-[300px]">
				<div className="space-y-4">
					{isLoading ? (
						Array(3)
							.fill("1")
							.map(() => (
								<div className="flex-1 min-w-[200px]">
									<Skeleton className="w-full h-[200px]" />
								</div>
							))
					) : response && response.length > 0 ? (
						response
							?.filter((item: EventType) =>
								item.event_title
									.toLowerCase()
									.includes(search?.toLowerCase() as string)
							)
							.map((event: EventType) => <Events {...event} key={event.id} />)
					) : (
						<p className="text-center font-semibold">No Events</p>
					)}
				</div>
			</Card>
		</div>
	);
};
export default UpComingEvents;
