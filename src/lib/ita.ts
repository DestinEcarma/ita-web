const PIXELS = " .,:;i1tfLCGO8@";

export const convertToAscii = (image: HTMLImageElement) => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	const width = image.width;
	const height = image.height;

	canvas.width = width;
	canvas.height = height;

	ctx?.drawImage(image, 0, 0, width, height);
	const imageData = ctx?.getImageData(0, 0, width, height).data;

	const ascii = imageToAscii(imageData!, width, height);

	canvas.remove();

	return ascii;
};

export const imageToAscii = (data: Uint8ClampedArray, width: number, height: number) => {
	let ascii = "";

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const offset = (y * width + x) * 4;

			const r = data[offset];
			const g = data[offset + 1];
			const b = data[offset + 2];

			const brightness = 0.2126 * r + 0.2126 * g + 0.0722 * b;
			const index = Math.floor((brightness / 255) * (PIXELS.length - 1));

			ascii += PIXELS[index];
		}

		ascii += "\n";
	}

	return ascii;
};
