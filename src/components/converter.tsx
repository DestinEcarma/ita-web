import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { SelectImage } from "./select-image";
import { convertToAscii } from "@/lib/ita";
import { GoCopy } from "react-icons/go";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Converter = () => {
	const [image, setImage] = useState<File>();
	const [ascii, setAscii] = useState<string>();

	const onClick = () => {
		if (image === undefined) {
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			const img = new Image();

			img.src = reader.result as string;
			img.onload = () => setAscii(convertToAscii(img));
		};

		reader.readAsDataURL(image);
	};

	const onCopy = () => {
		if (ascii === undefined) {
			return;
		}

		navigator.clipboard
			.writeText(ascii)
			.then(() => {
				toast.success("Copied to clipboard");
			})
			.catch(() => {
				toast.error("Failed to copy");
			});
	};

	return (
		<>
			<SelectImage onSelectImage={setImage} />
			<Button disabled={image === undefined} onClick={onClick} className="cursor-pointer px-8">
				Convert
			</Button>
			{ascii && (
				<div className="flex w-full overflow-hidden border">
					<TransformWrapper limitToBounds={false} minScale={0.05}>
						<div className="tools">
							<Button variant="outline" onClick={onCopy} className="mx-2 mt-2">
								<GoCopy />
							</Button>
						</div>
						<TransformComponent>
							<pre className="rounded-lg font-mono leading-none">{ascii}</pre>
						</TransformComponent>
					</TransformWrapper>
				</div>
			)}
		</>
	);
};
