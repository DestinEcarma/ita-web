import { PiSelectionLight } from "react-icons/pi";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export interface SelectImageProps {
	onSelectImage?: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export const SelectImage = ({ onSelectImage }: SelectImageProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [image, setImage] = useState<File>();

	const onClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			if (file.type.startsWith("image/")) {
				setImage(file);

				if (onSelectImage !== undefined) {
					onSelectImage(file);
				}
			} else {
				toast.error("Please select a valid image file.");
			}
		}
	};

	return (
		<>
			<input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
			<Button
				variant="outline"
				onClick={onClick}
				className="mx-8 flex aspect-[16/9] h-full w-[400px] max-w-[calc(100%-4rem)] cursor-pointer flex-col items-center justify-center border-2 border-dashed"
			>
				<PiSelectionLight
					className="text-4xl"
					style={{
						width: "auto",
						height: "auto",
					}}
				/>
				<span className="w-full overflow-hidden text-ellipsis">
					{image === undefined ? "Select Image" : image.name}
				</span>
			</Button>
		</>
	);
};
