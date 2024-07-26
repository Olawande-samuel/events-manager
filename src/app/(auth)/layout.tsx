import Container from "@/components/Container";
import Logo from "@/components/Logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="  min-w-screen min-h-screen flex flex-col">
			<div className=" bg-white shadow-lg">
				<Container>
					<div className="py-4"><Logo /></div>
				</Container>
			</div>

			<div className="flex-1 bg-white grid place-items-center">
				<Container>
					<div className="grid place-items-center h-full">
						<section className="w-full max-w-[600px] bg-white shadow-lg rounded-lg p-4 sm:p-8 md:px-20">
							{children}
						</section>
					</div>
				</Container>
			</div>
		</div>
	);
};
export default Layout;
