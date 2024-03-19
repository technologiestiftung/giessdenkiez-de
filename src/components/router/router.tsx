import React from "react";
import { Filter } from "../filter/filter";
import { useFilterStore } from "../filter/filter-store";
import Info from "../info/info";
import LocationSearch from "../location-search/location-search";
import Navbar from "../navbar/navbar";
import PageNotFound from "../page-not-found/page-not-found";
import Profile from "../profile/profile";
import { PasswordReset } from "../profile/profile-logged-in/password-reset";
import TreeDetail from "../tree-detail/tree-detail";
import { useLocationEventListener } from "./hooks/use-location-event-listener";
import { useUrlState } from "./store";

const Router: React.FC = () => {
	const url = useUrlState((state) => state.url);
	const setPathname = useUrlState((state) => state.setPathname);
	const treeId = url.searchParams.get("treeId");
	useLocationEventListener();

	const [isFilterVisible, setIsFilterVisible] = useFilterStore((store) => [
		store.isFilterViewVisible,
		store.setIsFilterViewVisible,
	]);

	switch (url.pathname) {
		case "/":
			setPathname("/map");
			return <></>;

		case "/map":
			return (
				<div
					className={`flex h-screen w-screen flex-col-reverse justify-between lg:flex-row ${treeId && "bg-white"} lg:bg-transparent`}
				>
					<div className={`${isFilterVisible && "bg-white lg:bg-transparent"}`}>
						<div className={`${treeId ? "hidden" : "block lg:hidden"}`}>
							{isFilterVisible && (
								<Filter
									onFilterChange={() => setIsFilterVisible(!isFilterVisible)}
								/>
							)}
						</div>
						<Navbar />
					</div>

					<div className="mt-2 flex w-full flex-row justify-center">
						<div
							className={`${treeId ? "w-[100%] md:[w-80%] lg:w-[70%] xl:w-[60%] 2xl:w-[30%]" : "w-[100%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[25%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[35%] xl:max-w-[25%]"} flex flex-col gap-4`}
						>
							<div className={`${treeId && "hidden lg:flex"}`}>
								<LocationSearch
									onToggleShowFilter={(show) => {
										const test = show ?? !isFilterVisible;
										setIsFilterVisible(test);
									}}
								/>
							</div>

							<div className={`hidden lg:block`}>
								{isFilterVisible && (
									<Filter
										onFilterChange={() => setIsFilterVisible(!isFilterVisible)}
									/>
								)}
							</div>
						</div>
					</div>
					{treeId && <TreeDetail />}
				</div>
			);
		case "/profile/reset-password":
			return (
				<div className="pointer-events-auto flex h-screen w-screen flex-col-reverse justify-between bg-white lg:flex-row">
					<Navbar />
					<PasswordReset />
				</div>
			);
		case "/profile":
			return (
				<div className="pointer-events-auto flex h-screen w-screen flex-col-reverse justify-between bg-white lg:flex-row">
					<Navbar />
					<Profile />
				</div>
			);
		case "/about":
			return (
				<div className="flex h-screen w-screen flex-col-reverse bg-white lg:flex-row">
					<Navbar />
					<Info />
				</div>
			);
		default:
			return (
				<div className="flex h-screen w-screen flex-col-reverse bg-white lg:flex-row">
					<Navbar />
					<PageNotFound />
				</div>
			);
	}
};

export default Router;
