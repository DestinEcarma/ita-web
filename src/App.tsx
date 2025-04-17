import { ThemeButton } from "./components/theme-button";
import { Converter } from "./components/converter";

export default () => {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="mt-8 flex gap-4">
				<h1 className="text-2xl font-bold">Image To ASCII Converter</h1>
				<ThemeButton />
			</div>
			<Converter />
		</div>
	);
};
