import Container from "@/components/Container";
import DashboardInfo from "@/components/dashboards/DashboardInfo";
import UpcomingEvents from "@/components/dashboards/UpcomingEvents";

interface Props {}
const Admin = (props: Props) => {
	return (
		<div className="space-y-8">
			<section>
				<DashboardInfo />
			</section>
			<section>
				<UpcomingEvents />
			</section>
		</div>
	);
};
export default Admin;
