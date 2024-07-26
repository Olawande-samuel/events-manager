"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import Button from "../Button";

const Logout = () => {
	const router = useRouter();
	const { removeItem } = useLocalStorage();

	function onClick() {
		removeItem("authToken");
		removeItem("user");
		router.replace("/login");
	}
	return (
		<Button
			onClick={onClick}
			name="Log out"
			type="button"
			className=" text-grayish w-full bg-transparent hover:underline hover:bg-transparent hover:text-white"
		/>
	);
};
export default Logout;
