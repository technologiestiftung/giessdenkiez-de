import { useEffect } from "react";
import { useEmailTakenStore } from "../email-taken-store.ts";

export const useResetIsEmailTakenOnUnmount = () => {
	const { resetErrorMessages } = useEmailTakenStore();

	useEffect(() => {
		return () => {
			resetErrorMessages();
		};
	}, []);

	return undefined;
};
