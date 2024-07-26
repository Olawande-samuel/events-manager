import Container from "@/components/Container";
import Header from "@/components/dashboards/Header";
import MobileSidebar from "@/components/dashboards/MobileSidebar";
import Sidebar from "@/components/dashboards/Sidebar";

interface Props {
	children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<div className="flex h-screen overflow-hidden">
			<aside className="w-60 hidden lg:block grow-0 shrink-0">
				<Sidebar />
			</aside>
			<MobileSidebar />
			<main className="flex-1 overflow-auto">
				<Header />
				<main className="py-4 md:py-10 bg-white">
					<Container>{children}</Container>
				</main>
			</main>
		</div>
	);
};
export default Layout;
