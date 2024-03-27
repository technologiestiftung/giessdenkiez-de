import React, { useState } from "react";
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

export const Router: React.FC = () => {
	const url = useUrlState((state) => state.url);
	const setPathname = useUrlState((state) => state.setPathname);
	const treeId = url.searchParams.get("treeId");
	useLocationEventListener();

	const [isFilterVisible, setIsFilterVisible] = useFilterStore((store) => [
		store.isFilterViewVisible,
		store.setIsFilterViewVisible,
	]);

	const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

	switch (url.pathname) {
		case "/":
			setPathname("/map", { hasSameSearchParams: true, hasSameHash: true });
			return <></>;

		case "/map":
			return (
				<div
					className={`flex h-dvh w-screen flex-col-reverse justify-between lg:flex-row ${
						treeId && "bg-white"
					} lg:bg-transparent`}
				>
					<div className={`${isFilterVisible && "bg-white sm:bg-transparent"}`}>
						<div className={`${treeId ? "hidden" : "block sm:hidden"}`}>
							{isFilterVisible && (
								<Filter
									onFilterChange={() => setIsFilterVisible(!isFilterVisible)}
								/>
							)}
						</div>
						<Navbar />
					</div>

					{!isSplashScreenVisible && (
						<div className="mt-2 flex w-full flex-row justify-center">
							<div
								className={`${
									treeId ? "w-[100%] sm:w-[400px]" : "w-[100%] sm:w-[500px]"
								} flex flex-col gap-4`}
							>
								<div className={`${treeId && "hidden lg:flex"}`}>
									<LocationSearch
										onToggleShowFilter={(show) => {
											const test = show ?? !isFilterVisible;
											setIsFilterVisible(test);
										}}
									/>
								</div>

								<div
									className={`${treeId ? "hidden lg:flex" : "hidden sm:flex"}`}
								>
									{isFilterVisible && (
										<Filter
											onFilterChange={() =>
												setIsFilterVisible(!isFilterVisible)
											}
										/>
									)}
								</div>
							</div>
						</div>
					)}
					{treeId && <TreeDetail />}
					{isSplashScreenVisible && (
						<Splash onClose={() => setIsSplashScreenVisible(false)} />
					)}
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
