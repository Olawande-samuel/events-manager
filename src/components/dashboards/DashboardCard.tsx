interface Props {
	title: string;
	value: string | number;
}
const DashboardCard = ({ title, value }: Props) => {
	return (
		<div className="rounded-lg p-6 md:p-8 bg-white shadow-lg space-y-3">
			<p className="text-slate-400">{title}</p>
			<p className=" text-3xl md:text-5xl font-bold">{value}</p>
			<div>Last Week: 0</div>
		</div>
	);
};
export default DashboardCard;
