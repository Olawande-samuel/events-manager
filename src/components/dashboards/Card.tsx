import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	children: React.ReactNode;
}
const Card = ({ className, children }: Props) => {
	return <div className={cn("rounded-lg bg-white shadow-md p-4 md:p-8", className)}>{children}</div>;
};
export default Card;
