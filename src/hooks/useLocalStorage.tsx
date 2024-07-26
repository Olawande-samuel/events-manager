"use client";

const useLocalStorage = () => {
	const getItem = (name: string) => {
		if (typeof window !== "undefined") {
			const data = localStorage.getItem(name);
			if (data) {
				return JSON.parse(data);
			}
		}
		return null;
	};
	const setItem = (name: string, value: any) => {
		localStorage.setItem(name, JSON.stringify(value));
	};
	const removeItem = (name: string) => {
		localStorage.removeItem(name);
	};
	return { getItem, setItem, removeItem };
};
export default useLocalStorage;
