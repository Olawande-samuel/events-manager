import useUserdata from "@/hooks/useUserdata";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

const withAuth = <P extends object>(Component: ComponentType<P>) => {
	return (props: P) => {
		const router = useRouter();

		useEffect(() => {
			const user = localStorage.getItem("user");
			if (!user) {
				router.push("/login");
			}
		}, []);
		return <Component {...props} />;
	};
};

export default withAuth;
