import { cn } from "@/lib/utils";

interface Props {
	formId: string;
	labelClassName?: string;
	label: string;
	type?: "email" | "password" | "text" | "datetime-local";
	placeholder?: string;
	inputClassName?: string;
	name: string;
	required?: boolean;
	message?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInput = ({
	formId,
	labelClassName,
	label,
	type = "text",
	placeholder,
	inputClassName,
	name,
	required = false,
	message,
	value,
	onChange,
}: Props) => {
	return (
		<div className="relative flex flex-col gap-3">
			<label htmlFor={formId} className={cn("", labelClassName)}>
				{label}
			</label>
			<input
				required={required}
				id={formId}
				name={name}
				type={type}
				placeholder={placeholder}
				className={cn(
					"border border-slate-500 rounded-lg p-3 ",
					inputClassName
				)}
				value={value}
				onChange={onChange}
			/>
			{message && <p className="text-xs text-red-500">{message}</p>}
		</div>
	);
};
export default FormInput;
