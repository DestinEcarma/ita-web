import { useTheme, getSystemTheme } from "@/hooks/use-theme";
import { TbMoon, TbSun, TbSunMoon } from "react-icons/tb";
import { Button } from "./ui/button";

function toggleTheme(theme: string) {
	return theme === "dark" ? "light" : "dark";
}

export const ThemeButton = () => {
	const [theme, setTheme] = useTheme();

	const icon = theme === "system" ? <TbSunMoon /> : theme === "dark" ? <TbMoon /> : <TbSun />;

	const onClick = () => {
		setTheme((prev) => {
			if (prev === "dark" || prev === "light") {
				return toggleTheme(prev);
			}

			return toggleTheme(getSystemTheme());
		});
	};

	const onContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setTheme("system");
		localStorage.removeItem("theme");
	};

	return (
		<Button variant="outline" onClick={onClick} onContextMenu={onContextMenu} className="cursor-pointer">
			{icon}
		</Button>
	);
};
