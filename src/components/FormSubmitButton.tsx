"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

const SubmitButton = ({ title = "Save" }: { title?: string }) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			name={title}
			isLoading={pending}
			className="bg-accent text-white"
		/>
	);
};
export default SubmitButton;
