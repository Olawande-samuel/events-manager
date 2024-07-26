import Endpoints from "@/lib/endpoints";
import { EventType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useEvents = (): { response: EventType[] | null; isLoading: boolean } => {
    const API = new Endpoints();
	const [response, setResponse] = useState<EventType[]>([]);
    
	const { data, isLoading } = useQuery({
		queryKey: ["get events"],
		queryFn: () => API.getEvents(),
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
export default useEvents;
