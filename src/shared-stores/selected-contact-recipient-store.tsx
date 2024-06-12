import { create } from "zustand";

interface SelectedContactRecipientStoreProps {
	selectedContactRecipientUsername: string | undefined;
	setSelectedContactRecipientUsername: (
		selectedContactRecipientUsername: string | undefined,
	) => void;
}

export const useSelectedContactRecipientUsernameStore =
	create<SelectedContactRecipientStoreProps>((set) => ({
		selectedContactRecipientUsername: undefined,
		setSelectedContactRecipientUsername: (selectedContactRecipientUsername) =>
			set({
				selectedContactRecipientUsername: selectedContactRecipientUsername,
			}),
	}));
