import React from "react";
import Info from "../info/info";
import LocationSearch from "../location-search/location-search";
import Navbar from "../navbar/navbar";
import PageNotFound from "../page-not-found/page-not-found";
import Profile from "../profile/profile";
import TreeDetail from "../tree-detail/tree-detail";
import { useLocationEventListener } from "./hooks/use-location-event-listener";
import { useUrlState } from "./store";
import PasswordReset from "../profile/profile-logged-in/password-reset";
import Filter from "../filter/filter";

const Router: React.FC = () => {
	const url = useUrlState((state) => state.url);
	const setPathname = useUrlState((state) => state.setPathname);
	const treeId = url.searchParams.get("treeId");
	useLocationEventListener();

	switch (url.pathname) {
		case "/":
			setPathname("/map");
			return <></>;

		case "/map":
			return (
				<div
					className={`flex h-screen w-screen flex-col-reverse justify-between lg:flex-row ${treeId && "bg-white"} sm:bg-transparent`}
				>
					<Navbar />
					<div className={`mt-2 w-full flex justify-center`}>
						<div className="flex flex-col gap-2 w-[100%] sm:w-[50%]  md:w-[40%] lg:w-[35%] xl:w-[25%]">
							<LocationSearch />
							<Filter />
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
