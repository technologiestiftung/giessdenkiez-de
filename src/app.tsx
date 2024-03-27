import React from "react";
import { useAuthStore } from "./auth/auth-store";
import { Map } from "./components/map/map";
import { Router } from "./components/router/router";
import { useErrorStore } from "./error/error-store";
import { ErrorToast } from "./error/error-toast";
import { Loading } from "./components/loading/loading";
import { useMapStore } from "./components/map/map-store";
import { useI18nStore } from "./i18n/i18n-store";

export const App: React.FC = () => {
	useAuthStore();
	const i18n = useI18nStore().i18n();
	const error = useErrorStore().error;
	const { isMapLoaded } = useMapStore();
	return (
		<>
			<div className="grid grid-cols-1">
				<div className="col-start-1 row-start-1 h-full w-full">
					<Map />
				</div>
				<div className="z-[1000] col-start-1 row-start-1 h-full w-full">
					{!isMapLoaded && (
						<Loading
							loadingText={i18n.loading.mapLoading}
							isImprintPrivacyVisible={true}
						/>
					)}
				</div>
				<div className="pointer-events-none z-[1000] col-start-1 row-start-1 h-full w-full">
					<Router />
				</div>
				{error && <ErrorToast error={error} />}
			</div>
		</>
	);
};
