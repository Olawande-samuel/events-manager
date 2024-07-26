import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";

const Loader = ({ className }: { className?: string }) => {
	return (
		<span className="flex items-center justify-center">
			<RotateCw className={cn("mr-2 h-4 w-4 animate-spin", className)} />
		</span>
	);
};
export default Loader;
