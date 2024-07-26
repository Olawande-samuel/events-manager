import { useEffect } from "react";
import { toast } from "sonner";

const useNotification = (state: any) => {
	useEffect(() => {
		if (state?.status >= 200 && state?.status < 300) {
			toast.success(state.data.message);
		}
		if (state?.status >= 400) {
			toast.error(state.data.message);
		}
	}, [state]);
};

export default useNotification;
