import React, { useCallback } from "react";
import { useUrlState } from "../../router/store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useAuthStore } from "../../../auth/auth-store";
import { Overview } from "./overview";
import { AdoptedTrees } from "./adopted-trees/adopted-trees";
import { ProfileDetails } from "./profile-details/profile-details";
import { SecondaryButton } from "../../buttons/secondary";
import { PasswordReset } from "./password-reset";
import { useErrorStore } from "../../../error/error-store";
import { LanguageToggle } from "../../router/languageToggle";

export const ProfileLoggedIn: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { logout } = useAuthStore();
	const { url, setSearchParams } = useUrlState();
	const authType = url.searchParams.get("mode");
	const { handleError } = useErrorStore();

	const onClick = useCallback(async () => {
		try {
			await logout();
			setSearchParams(new URLSearchParams());
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage);
		}
	}, []);

	if (authType === "reset-password") {
		return <PasswordReset />;
	}

	return (
		<div className="w-full overflow-y-auto px-5 md:pt-8">
			<div className="flex flex-col items-center justify-center ">
				<div className="flex w-[100%] flex-col gap-4 px-0 py-8 md:w-[70%] md:px-4 lg:w-[70%] xl:w-[60%] relative">
					<div className="lg:hidden  absolute top-7 right-0 md:pr-4">
						<LanguageToggle />
					</div>
					<h1 className="text-4xl font-semibold">
						{i18n.navbar.profile.title}
					</h1>

					<Overview />

					<AdoptedTrees />

					<ProfileDetails />

					<div className="self-center">
						<SecondaryButton
							onClick={onClick}
							label={i18n.navbar.profile.logOut}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
