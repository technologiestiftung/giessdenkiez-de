import React from "react";
import { useAuthStore } from "../../auth/auth-store";
import AuthCard from "./auth-card/auth-card";
import ProfileLoggedIn from "./profile-logged-in/profile-logged-in";

const Profile: React.FC = () => {
	const { isLoggedIn } = useAuthStore();

	switch (isLoggedIn()) {
		case undefined:
			return <div className="mx-auto my-auto">Loading...</div>;

		case false:
			return (
				<div className="h-full overflow-y-auto">
					<AuthCard />
				</div>
			);

		default:
			return <ProfileLoggedIn />;
	}
};

export default Profile;
