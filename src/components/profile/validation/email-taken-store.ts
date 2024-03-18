import React from "react";
import { create } from "zustand";

interface EmailTakenStore {
	isEmailTaken: boolean;
	setIsEmailTaken: (isVisible: boolean) => void;
	resetErrorMessages: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useEmailTakenStore = create<EmailTakenStore>()((set, get) => ({
	isEmailTaken: false,

	setIsEmailTaken: (isVisible) => {
		set({ isEmailTaken: isVisible });
	},

	resetErrorMessages: (e?) => {
		e?.target.setCustomValidity("");
		get().setIsEmailTaken(false);
	},
}));
