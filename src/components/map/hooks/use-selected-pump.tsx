import { create } from "zustand";
import { Pump } from "./use-hovered-pump";

interface SelectedPumpState {
	selectedPump: Pump | undefined;
	setSelectedPump: (pump: Pump | undefined) => void;
}

export const useSelectedPump = create<SelectedPumpState>((set) => ({
	selectedPump: undefined,
	setSelectedPump: (pump) => set({ selectedPump: pump }),
}));
