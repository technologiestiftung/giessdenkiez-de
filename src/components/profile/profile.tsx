import React from "react";
import { useAuthStore } from "../../auth/auth-store";
import { AuthCard } from "./auth-card/auth-card";
import { ProfileLoggedIn } from "./profile-logged-in/profile-logged-in";
import { LanguageToggle } from "../router/languageToggle";

export const Profile: React.FC = () => {
	const { isLoggedIn } = useAuthStore();

	switch (isLoggedIn()) {
		case undefined:
			return <div className="mx-auto my-auto">Loading...</div>;

		case false:
			return (
				<div className="w-full h-full overflow-y-auto px-5 py-5 md:py-11">
					<div className="flex flex-col items-center justify-center  ">
						<div
							className={`
							h-full w-full px-5 pt-10 lg:mx-auto lg:my-auto
							lg:max-w-[42rem] lg:rounded-2xl lg:border-2  lg:p-14 lg:shadow-sm relative`}
						>
							<div className="lg:hidden absolute top-7 right-4">
								<LanguageToggle />
							</div>
							<AuthCard />
						</div>
					</div>
				</div>
			);

		default:
			return <ProfileLoggedIn />;
	}
};
