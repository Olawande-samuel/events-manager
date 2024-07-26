import Endpoints from "@/lib/endpoints";
import { EventType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useEvent = (
	id: string
): { response: EventType | null; isLoading: boolean } => {
	const [response, setResponse] = useState<EventType | null>(null);
	const API = new Endpoints();

	const eventId = Number(id);

	const { data, isLoading } = useQuery({
		queryKey: ["get event", eventId],
		queryFn: () => API.getEvent(eventId),
	});

	useEffect(() => {
		if (data?.data?.data) {
			setResponse(data?.data?.data);
		}
	}, [data]);
	return {
		response,
		isLoading,
	};
};
export default useEvent;
