"use client";

import { links } from "@/data";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = (typeof links)[0];

const SidebarLinks = ({ id, name, link }: Props) => {
	const pathname = usePathname();
	const { toggleSidebar } = useSidebarStore();

	const path = pathname.split("/")[2];
	const linkPath = link.split("/")[2];
	return (
		<Link
			href={link}
			onClick={() => toggleSidebar()}
			className={cn(
				"flex items-center px-4 py-2 ps-8 text-grayish hover:bg-accent",
				path === linkPath && "bg-accent text-white font-medium"
			)}
		>
			<span>{name}</span>
		</Link>
	);
};
export default SidebarLinks;
