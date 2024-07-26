"use client";

import Button from "@/components/Button";
import Endpoints from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";
import FormInput from "../../FormInput";
import { toast } from "sonner";

type Errors = {
	event_title: string[];
	event_location: string[];
	event_starts: string[];
	event_ends: string[];
	id: string[];
	event_description: string[];
};

const formSchema = z.object({
	event_title: z.string().min(2, { message: "Field is required" }),
	event_description: z.string().min(2, { message: "Field is required" }),
	event_location: z.string().min(2, { message: "Field is required" }),
	event_starts: z.string().min(2, { message: "Field is required" }),
	event_ends: z.string().min(2, { message: "Field is required" }),
});

const EventForm = () => {
	const API = new Endpoints();
	const queryClient = useQueryClient();

	const [errors, setErrors] = useState<Partial<Errors> | null>();
	const [values, setValues] = useState({
		event_title: "",
		event_description: "",
		event_location: "",
		event_starts: "",
		event_ends: "",
	});
	const { mutate, isPending, data } = useMutation({
		mutationKey: ["add event"],
		mutationFn: API.createEvent,
	});

	useEffect(() => {
		if (data?.status ) {
			// refetch data
			queryClient.invalidateQueries({
				queryKey: ["get events"],
			});
		}
	}, [data]);

	function handleValues(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setValues((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// check content validity
		const isValidForm = formSchema.safeParse(values);

		if (!isValidForm.success) {
			setErrors(isValidForm.error.flatten().fieldErrors);
			return;
		}
		// if form is valid, clear errors
		setErrors(null);

		// submit form
		mutate(isValidForm.data, {
			onSuccess: (res) => {
				if (res?.data.message) {
					toast.success(res.data.message);
					setValues({
						event_title: "",
						event_description: "",
						event_location: "",
						event_starts: "",
						event_ends: "",
					});
				}
			},
		});
	}
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="grid sm:grid-cols-2 gap-4">
				<FormInput
					// required
					formId="eventName"
					label="Event Title"
					name="event_title"
					value={values.event_title}
					onChange={handleValues}
					message={errors?.event_title?.[0] ?? ""}
				/>
				<FormInput
					// required
					formId="eventLocation"
					label="Event Location"
					name="event_location"
					value={values.event_location}
					onChange={handleValues}
					message={errors?.event_location?.[0] ?? ""}
				/>
				<FormInput
					formId="eventStarts"
					label="Starts"
					name="event_starts"
					type="datetime-local"
					value={values.event_starts}
					onChange={handleValues}
					message={errors?.event_starts?.[0] ?? ""}
				/>
				<FormInput
					formId="eventEnds"
					label="Ends"
					name="event_ends"
					type="datetime-local"
					value={values.event_ends}
					onChange={handleValues}
					message={errors?.event_ends?.[0] ?? ""}
				/>
			</div>
			<div className="flex flex-col gap-3">
				<label htmlFor="description">Description</label>
				<textarea
					name="event_description"
					className="border border-slate-500 rounded-lg p-3 "
					rows={4}
					value={values.event_description}
					onChange={handleValues}
				></textarea>
				{errors?.event_description?.[0] && (
					<p className="text-xs text-red-500">
						{errors?.event_description?.[0] ?? ""}
					</p>
				)}
			</div>
			<Button type="submit" name="Save" isLoading={isPending} />
		</form>
	);
};
export default EventForm;
