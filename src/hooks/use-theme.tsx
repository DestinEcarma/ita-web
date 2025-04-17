import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export function getSystemTheme(): Theme {
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
	document.body.classList.toggle("dark", theme === "dark");
}

export function useTheme(): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === "undefined") return "system";

		const stored = localStorage.getItem("theme");

		if (stored === "light" || stored === "dark") {
			return stored;
		}

		return "system";
	});

	useEffect(() => {
		if (theme === "system") {
			applyTheme(getSystemTheme());
		} else {
			applyTheme(theme);
			localStorage.setItem("theme", theme);
		}
	}, [theme]);

	useEffect(() => {
		if (theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => applyTheme(getSystemTheme());

		mediaQuery.addEventListener("change", handleChange);

		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	return [theme, setTheme];
}
