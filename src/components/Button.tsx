import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";

interface Props {
	type: "submit" | "button";
	name: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	isLoading?: boolean;
}

const Button = ({ type, name, onClick, className, isLoading }: Props) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={cn(
				"flex gap-2 items-center bg-slate-500 text-white rounded-lg px-8 py-2 font-semibold hover:bg-slate-200 hover:text-slate-500",
				className
			)}
			disabled={isLoading}
		>
			{isLoading && (
				<span className="flex items-center">
					<RotateCw className="mr-2 h-4 w-4 animate-spin " />
				</span>
			)}
			{name}
		</button>
	);
};
export default Button;
