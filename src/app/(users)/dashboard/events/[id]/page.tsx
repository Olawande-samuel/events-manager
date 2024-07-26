"use client";

import DeleteEvent from "@/components/dashboards/events/DeleteEvent";
import EditEvent from "@/components/dashboards/events/EditEvent";
import Loader from "@/components/Loader";
import useEvent from "@/hooks/useEvent";
import { Calendar } from "lucide-react";
import moment from "moment";
import Image from "next/image";

interface Props {
	params: {
		id: string;
	};
}

const Event = ({ params }: Props) => {
	const { isLoading, response } = useEvent(params?.id);
	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">Event Details</h1>
			<div className="mb-8">
				<div className="relative h-[300px] w-full">
					<Image
						src="/images/banner.webp"
						alt="event banner"
						fill
						className="object-cover"
					/>
				</div>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className="space-y-6">
					<div className="space-y-3">
						<h1 className="text-3xl font-bold">{response?.event_title}</h1>
						<div className="flex items-center gap-1 text-slate-500">
							<span>
								<Calendar color="#FF6600" />
							</span>
							<span>
								{moment(response?.event_starts).format(
									"dddd DD MMMM, YYYY, hh:mm a"
								)}
							</span>
						</div>
					</div>
					<hr />
					<div>{response?.event_description}</div>
					<div className="flex flex-col sm:flex-row gap-4">
						<DeleteEvent id={params.id} />
						<EditEvent id={params.id} />
					</div>
				</div>
			)}
		</div>
	);
};
export default Event;
