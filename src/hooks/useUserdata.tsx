import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { User } from "@/lib/types";

const useUserdata = () => {
	const [userdata, setUserdata] = useState<User | null>(null);
	const { getItem } = useLocalStorage();

	useEffect(() => {
		const user: User | null = getItem("user");
		if (user?.email) {
			setUserdata(user);
		}
	}, []);

	return userdata;
};
export default useUserdata;
