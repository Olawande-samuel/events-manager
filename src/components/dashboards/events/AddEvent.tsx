import Button from "../../Button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";
import EventForm from "./EventForm";

const AddEvent = () => {
	return (
		<div className="flex justify-end">
			<Dialog>
				<DialogTrigger asChild>
					<Button type="button" name="Add New Event" className="bg-accent text-white" />
				</DialogTrigger>
				<DialogContent className="max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Add Event</DialogTitle>
						<DialogDescription>
							Add new events here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-y-auto">
						<EventForm />
					</div>
					
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default AddEvent;
