import React, { useState } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import EditIcon from "../../../icons/edit-icon";
import { useAuthStore } from "../../../../auth/auth-store";
import EmailInputWithValidation from "../../validation/email-input-with-validation";

const EditEmail: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { updateEmail, getUserData } = useAuthStore();
	const [emailIsDisabled, setEmailDisabled] = useState(true);

	return (
		<div className="mt-7 flex flex-col">
			{emailIsDisabled ? (
				<>
					<p className="mb-2 font-semibold">
						{i18n.navbar.profile.settings.email}
					</p>
					<div className="flex flex-row justify-between gap-x-8">
						<p className="italic">{getUserData()?.email}</p>
						<button
							className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
							onClick={() => {
								setEmailDisabled(!emailIsDisabled);
							}}
						>
							<EditIcon />
						</button>
					</div>
				</>
			) : (
				<form
					className="flex flex-col justify-between gap-x-8"
					onSubmit={(e) => {
						e.preventDefault();
						updateEmail(e.currentTarget.email.value);
						setEmailDisabled(!emailIsDisabled);
					}}
				>
					<div className="flex flex-col justify-between gap-x-8 md:flex-row">
						<EmailInputWithValidation
							label={i18n.navbar.profile.settings.editEmail}
							defaultValue={getUserData()?.email}
						/>
						<button
							className={`mt-2 cursor-pointer self-end font-semibold 
              text-gdk-blue enabled:hover:text-gdk-light-blue md:mt-6 md:self-center `}
							type="submit"
						>
							{i18n.navbar.profile.settings.approve}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default EditEmail;
