"use client";

import useEvents from "@/hooks/useEvents";
import moment from "moment";
import { Skeleton } from "../ui/skeleton";
import DashboardCard from "./DashboardCard";

const DashboardInfo = () => {
	const { response, isLoading } = useEvents();
	const today = moment().format("YYYY-MM-DD");

	const todaysEvents = response?.filter(
		(event) => moment(event.event_starts).format("YYYY-MM-DD") === today
	);
	const remoteEvents = response?.filter((event) =>
		event.event_location.includes("remote")
	);

	return (
		<div className="flex flex-wrap gap-4">
			{isLoading ? (
				Array(3)
					.fill("1")
					.map((_, i) => (
						<div className="flex-1 min-w-[200px]" key={i + 1}>
							<Skeleton className="w-full h-[200px]" />
						</div>
					))
			) : (
				<>
					<div className="flex-1 min-w-[200px]">
						<DashboardCard title="Total Events" value={response?.length ?? 0} />
					</div>
					<div className="flex-1 min-w-[200px]">
						<DashboardCard
							title="Today's Events"
							value={todaysEvents?.length ?? 0}
						/>
					</div>
					<div className="flex-1 min-w-[200px]">
						<DashboardCard
							title="Remote Events"
							value={remoteEvents?.length ?? 0}
						/>
					</div>
				</>
			)}
		</div>
	);
};
export default DashboardInfo;
