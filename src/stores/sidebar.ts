import { create } from "zustand";

interface ISidebar {
	sidebar: boolean;
}
interface SidebarActions {
	toggleSidebar: () => void;
}

type SidebarStore = ISidebar & SidebarActions;

export const useSidebarStore = create<SidebarStore>()((set) => ({
	sidebar: false,
	toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
}));
