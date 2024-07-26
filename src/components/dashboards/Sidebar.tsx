import { links } from "@/data";
import Logo from "../Logo";
import Logout from "./Logout";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
	// get user
	return (
		<div className="bg-black h-screen flex flex-col">
			<div className="p-4">
				<div className="flex mb-10 text-white h-24">
					<Logo src="/images/logo-white.png" />
				</div>
			</div>
			<div>
				{links.map((link) => (
					<SidebarLinks {...link} key={link.id} />
				))}
			</div>
			<div className="mt-auto">
				<Logout />
			</div>
		</div>
	);
};
export default Sidebar;
