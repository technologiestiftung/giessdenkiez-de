/* eslint-disable complexity */
import React, { useEffect } from "react";
import { Filter } from "../filter/filter";
import { useFilterStore } from "../filter/filter-store";
import { Info } from "../info/info";
import { LocationSearch } from "../location-search/location-search";
import { Navbar } from "../navbar/navbar";
import { PageNotFound } from "../page-not-found/page-not-found";
import { Profile } from "../profile/profile";
import { PasswordReset } from "../profile/profile-logged-in/password-reset";
import { TreeDetail } from "../tree-detail/tree-detail";
import { useLocationEventListener } from "./hooks/use-location-event-listener";
import { useUrlState } from "./store";
import { Splash } from "../splash/splash";
import { useMapStore } from "../map/map-store";
import { LegendButton } from "../buttons/legend-button";
import { useSplashStore } from "../splash/splash-store";

export const Router: React.FC = () => {
	const url = useUrlState((state) => state.url);
	const setPathname = useUrlState((state) => state.setPathname);
	const treeId = url.searchParams.get("treeId");
	useLocationEventListener();

	const { isMapLoaded } = useMapStore();

	const { isFilterViewVisible, recoverUrlParams } = useFilterStore();
	const { isSplashScreenVisible } = useSplashStore();

	useEffect(() => {
		if (url.pathname === "/map") {
			recoverUrlParams();
		}
	}, [url.pathname]);

	switch (url.pathname) {
		case "/":
			setPathname("/map", { hasSameSearchParams: true, hasSameHash: true });
			return <></>;

		case "/map":
			return (
				<div
					className={`flex h-svh w-screen flex-col-reverse justify-between lg:flex-row ${
						treeId && "bg-white"
					} lg:bg-transparent ${isSplashScreenVisible() && "backdrop-brightness-90"}`}
				>
					<div
						className={`${isFilterViewVisible && "bg-white rounded-t-lg sm:bg-transparent"}`}
					>
						<div className={`${treeId ? "hidden" : "block sm:hidden"}`}>
							{isFilterViewVisible && <Filter />}
						</div>
						<Navbar />
					</div>

					{!isSplashScreenVisible() && isMapLoaded && (
						<>
							<div className="mt-3 flex w-full flex-row justify-center">
								<div
									className={`${
										treeId ? "w-[100%] sm:w-[400px]" : "w-[100%] sm:w-[500px]"
									} flex flex-col gap-4`}
								>
									<div className={`${treeId && "hidden lg:flex"}`}>
										<LocationSearch />
									</div>

									<div
										className={`${treeId ? "hidden lg:flex" : "hidden sm:flex"}`}
									>
										{isFilterViewVisible && <Filter />}
									</div>
								</div>
							</div>

							<div
								className={`left-[10px] bottom-[175px] absolute
							md:bottom-[306px] lg:bottom-[242px] lg:left-[90px] ${(treeId || isFilterViewVisible) && "hidden lg:block"}`}
							>
								<LegendButton />
							</div>
						</>
					)}
					{treeId && isMapLoaded && <TreeDetail />}
					{isSplashScreenVisible() && <Splash />}
				</div>
			);
		case "/profile/reset-password":
			return (
				<div className="pointer-events-auto flex h-dvh w-screen flex-col-reverse justify-between bg-white lg:flex-row">
					<Navbar />
					<PasswordReset />
				</div>
			);
		case "/profile":
			return (
				<div className="pointer-events-auto flex h-dvh w-screen flex-col-reverse justify-between bg-white lg:flex-row">
					<Navbar />
					<Profile />
				</div>
			);
		case "/about":
			return (
				<div className="flex h-dvh w-screen flex-col-reverse bg-white lg:flex-row">
					<Navbar />
					<Info />
				</div>
			);
		default:
			return (
				<div className="flex h-dvh w-screen flex-col-reverse bg-white lg:flex-row">
					<Navbar />
					<PageNotFound />
				</div>
			);
	}
};
