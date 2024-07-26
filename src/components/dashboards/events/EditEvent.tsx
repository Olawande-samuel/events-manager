"use client";
import Button from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EditForm from "./EditForm";

const EditEvent = ({ id }: { id: string }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					name="Edit Event"
					className="bg-slate-500 w-full sm:w-fit  text-white font-semibold"
				/>
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Event</DialogTitle>
					<DialogDescription>
						Add new events here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="overflow-y-auto"><EditForm id={id} /></div>
			</DialogContent>
		</Dialog>
	);
};
export default EditEvent;
