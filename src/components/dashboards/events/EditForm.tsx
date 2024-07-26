"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import useEvent from "@/hooks/useEvent";
import Endpoints from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../../FormSubmitButton";
import Loader from "@/components/Loader";

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

const EditForm = ({ id }: { id: string }) => {
	const API = new Endpoints();
	const queryClient = useQueryClient();

	const { isLoading, response } = useEvent(id);
	const [errors, setErrors] = useState<Partial<Errors> | null>();
	const [values, setValues] = useState({
		event_title: "",
		event_description: "",
		event_location: "",
		event_starts: "",
		event_ends: "",
	});

	useEffect(() => {
		if (response) {
			setValues(response);
		}
	}, [response]);

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

	const { mutate, isPending, data } = useMutation({
		mutationKey: ["edit event form"],
		mutationFn: API.editEvent,
	});

	useEffect(() => {
		if (data?.data) {
			// refetch data
			queryClient.invalidateQueries({
				queryKey: ["get event"],
			});
		}
	}, [data]);
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
		mutate(
			{ eventId: id, payload: isValidForm.data },
			{
				onSuccess: (res) => {
					if (res?.data.message) {
						toast.success(res.data.message);
					}
				},
				onError: (err) => {
					if (err.message) {
						toast.success(err.message);
					}
				},
			}
		);
	}

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<form className="space-y-4" onSubmit={onSubmit}>
					<div className="grid sm:grid-cols-2 gap-4">
						<FormInput
							formId="eventName"
							label="Event Title"
							name="event_title"
							value={values.event_title}
							onChange={handleValues}
							message={errors?.event_title?.[0] ?? ""}
						/>
						<FormInput
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
					<Button name="Save" type="submit" isLoading={isPending} />
				</form>
			)}
		</div>
	);
};
export default EditForm;
SubmitButton;
