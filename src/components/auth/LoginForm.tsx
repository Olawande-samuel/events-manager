"use client";

import Link from "next/link";
import FormInput from "../FormInput";
import SubmitButton from "../FormSubmitButton";
import { useFormState } from "react-dom";
import { login } from "@/app/actions/auth";
import useNotification from "@/hooks/useNotification";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState = {
	errors: {
		email: [""],
		password: [""],
	},
};
const LoginForm = () => {
	const [state, formAction] = useFormState(login, initialState);
	const router = useRouter();
	const { setItem } = useLocalStorage();
	
    useNotification(state);

	useEffect(() => {
		if (state?.status === 200) {
			setItem("authToken", state.data.data.token);
			setItem("user", state.data.data);
			router.replace("/dashboard");
		}
	}, [state]);

	return (
		<form action={formAction}>
			<div className="space-y-4 mb-8">
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
			</div>
			<SubmitButton title="Login" />
			<div>
				<p className="text-xs font-medium text-end">
					Don't have an account?{" "}
					<Link
						href="/signup"
						className="text-red-400 hover:underline hover:underline-offset-1"
					>
						Sign Up
					</Link>
				</p>
			</div>
		</form>
	);
};
export default LoginForm;
