import React from "react";
import { useAuthStore } from "./auth/auth-store.tsx";
import { Map } from "./components/map/map";
import { Router } from "./components/router/router";
import { useErrorStore } from "./error/error-store.tsx";
import { ErrorToast } from "./error/error-toast.tsx";

export const App: React.FC = () => {
	useAuthStore();

	const error = useErrorStore().error;

	return (
		<>
			<div className="grid grid-cols-1">
				<div className="col-start-1 row-start-1 h-full w-full">
					<Map />
				</div>
				<div className="pointer-events-none z-[1000] col-start-1 row-start-1 h-full w-full">
					<Router />
				</div>
				{error && <ErrorToast error={error} />}
			</div>
		</>
	);
};
