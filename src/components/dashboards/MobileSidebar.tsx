"use client";

import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { useSidebarStore } from "@/stores/sidebar";

const MobileSidebar = () => {
	const { sidebar, toggleSidebar } = useSidebarStore();
	return (
		<article
			className={cn(
				"lg:hidden z-10 absolute inset-0",
				sidebar ? "lg:hidden flex" : "hidden"
			)}
		>
			<article className="basis-64">
				<Sidebar />
			</article>
			<div
				className="flex-1 bg-greyish opacity-20"
				onClick={() => toggleSidebar()}
				role="button"
				tabIndex={0}
				onKeyPress={toggleSidebar}
			></div>
		</article>
	);
};
export default MobileSidebar;
