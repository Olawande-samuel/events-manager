"use client";

import Link from "next/link";
import Button from "../Button";
import FormInput from "../FormInput";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/app/actions/auth";
import { useEffect } from "react";
import { toast } from "sonner";
import SubmitButton from "../FormSubmitButton";
import useNotification from "@/hooks/useNotification";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState = {
	errors: {
		email: [""],
		password: [""],
		role: [""],
	},
};

const SignUp = () => {
	const [state, formAction] = useFormState(createUser, initialState);
	const router = useRouter();
	const { setItem } = useLocalStorage();

	useNotification(state);

	useEffect(() => {
		if (state?.status >= 200 && state?.status < 300) {
			setItem("authToken", state.data.data.token);
			setItem("user", state.data.data);
			router.replace("/dashboard");
		}
	}, [state]);

	return (
		<form action={formAction}>
			<div className="space-y-3 mb-8">
				<FormInput
					formId="LoginEmail"
					label="Email"
					name="email"
					type="email"
					message={state?.errors?.email?.[0] ?? ""}
				/>
				<FormInput
					formId="loginPassword"
					label="Password"
					name="password"
					type="password"
					message={state?.errors?.password?.[0] ?? ""}
				/>
				<div className="flex flex-col gap-3">
					<label htmlFor="role">Role</label>
					<select
						className="border border-slate-500 rounded-lg p-3"
						name="role"
					>
						<option disabled>Role</option>
						<option value="admin">Admin</option>
						<option value="user">User</option>
					</select>
					{state?.errors?.role?.[0] && (
						<p className="text-xs text-red-500">{state?.errors?.role?.[0]}</p>
					)}
				</div>
			</div>
			<SubmitButton title="Sign Up" />

			<div>
				<p className="text-xs font-medium text-end">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-red-400 hover:underline hover:underline-offset-1"
					>
						Login
					</Link>
				</p>
			</div>
		</form>
	);
};
export default SignUp;
