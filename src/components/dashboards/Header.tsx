"use client";

import { greet } from "@/lib/utils";
import { Menu, UserCircle2 } from "lucide-react";
import moment from "moment";
import Container from "../Container";
import { useSidebarStore } from "@/stores/sidebar";
import useUserdata from "@/hooks/useUserdata";

const Header = () => {
	const { toggleSidebar } = useSidebarStore();
	const user = useUserdata();
	return (
		<header className="bg-white py-5 shadow-md">
			<Container>
				<div className="flex items-center justify-between">
					<div className="flex justify-between items-center">
						<div className="flex gap-2 items-center">
							<Menu
								onClick={() => toggleSidebar()}
								className="block lg:hidden"
							/>
							<UserCircle2 size={42} />
							<div>
								<p className="text-[10px]">
									{greet(parseInt(moment().format("H")))}
								</p>
								<h1 className="font-semibold">{user?.email}</h1>
							</div>
						</div>
					</div>
					<div className="hidden sm:block uppercase font-bold text-accent">
						{user?.role}
					</div>
				</div>
			</Container>
		</header>
	);
};
export default Header;
