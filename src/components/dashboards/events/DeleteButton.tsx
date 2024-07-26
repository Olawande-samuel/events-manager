"use client";

import Button from "@/components/Button";
import Endpoints from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const DeleteButton = ({ id }: { id: string }) => {
	const router = useRouter();
	const API = new Endpoints();
	const queryClient = useQueryClient();

	const { mutate, isPending, data } = useMutation({
		mutationKey: ["delete event"],
		mutationFn: API.deleteEvent,
	});

	useEffect(() => {
		if (data?.data) {
			queryClient.invalidateQueries({
				queryKey: ["get events"],
			});
			toast.success(data.data?.message);
			router.push("/dashboard");
		}
	}, [data]);

	function onDelete() {
		const eventId = Number(id);
		mutate(eventId);
	}

	return (
		<Button
			className="bg-accent w-full sm:w-fit rounded-md text-sm text-white font-semibold"
			name="Delete Event"
			type="button"
			isLoading={isPending}
			onClick={onDelete}
		/>
	);
};
export default DeleteButton;
