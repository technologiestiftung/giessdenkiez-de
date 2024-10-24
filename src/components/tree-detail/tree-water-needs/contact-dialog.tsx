import React, { useCallback, useMemo, useState } from "react";
import Markdown from "react-markdown";
import { useAuthStore } from "../../../auth/auth-store";
import { supabaseClient } from "../../../auth/supabase-client";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useSelectedContactRecipientUsernameStore } from "../../../shared-stores/selected-contact-recipient-store";
import { AlertDialog } from "../../alert-dialog/alert-dialog";
import { WarningDialog } from "../../alert-dialog/warning-dialog";
import { PrimaryButton } from "../../buttons/primary";
import { TertiaryButton } from "../../buttons/tertiary";
import { CheckIcon } from "../../icons/check-icon";
import { CloseIcon } from "../../icons/close-icon";
import { useTreeStore } from "../stores/tree-store";

export const ContactDialog: React.FC = () => {
	const MAX_MESSAGE_LENGTH = 200;

	const { selectedContactRecipientUsername } =
		useSelectedContactRecipientUsernameStore();

	const recipientContactName = selectedContactRecipientUsername ?? "";

	const selectedTreeId = useTreeStore().selectedTreeId;
	const user = useAuthStore().session?.user;

	const [message, setMessage] = useState("");
	const [isContactRequestLoading, setIsContactRequestLoading] = useState(false);
	const [error, setError] = useState("");

	const i18n = useI18nStore().i18n();

	const closeContactDialog = () => {
		setMessage("");
		setIsContactRequestLoading(false);
		setError("");
		(document.getElementById("contact-dialog") as HTMLDialogElement).close();
	};

	const containsLinks = useMemo(() => {
		// Note: This does not cover all possible URls, but we don't want it to be too strict
		// Having a complete list of domain endings is not possible, because it is constantly evolving.
		// Using a pattern like `.[a-zA-Z]{2,24}` would be too strict, because it would catch typos like 'Hallo.Wie gehts' as a URL.
		const urlRegex =
			/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|de|it|net|org|edu|gov|mil|co|uk|us|info|biz|io|ai|ca|fr|es|nl|ru|jp|cn|in))/g;
		return message.match(urlRegex) !== null;
	}, [message]);

	const messageTooLong = useMemo(() => {
		return message.length > MAX_MESSAGE_LENGTH;
	}, [message]);

	const showContactSuccessDialog = () => {
		(
			document.getElementById("contact-successful-alert") as HTMLDialogElement
		).showModal();
		setTimeout(() => {
			(
				document.getElementById("contact-successful-alert") as HTMLDialogElement
			).close();
		}, 2000);
	};

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			setError("");
			setIsContactRequestLoading(true);

			e.preventDefault();
			let data;
			try {
				data = await supabaseClient.functions.invoke("submit_contact_request", {
					body: {
						recipientContactName: recipientContactName,
						message: message,
					},
				});
			} catch (err) {
				console.error(err);
				setError(i18n.contact.genericError);
				return;
			} finally {
				setIsContactRequestLoading(false);
			}

			if (data.data?.code === "already_contacted_the_recipient_before") {
				closeContactDialog();
				(
					document.getElementById(
						"already-contacted-alert",
					) as HTMLDialogElement
				).showModal();
				return;
			}

			if (data.data?.code === "already_sent_more_than_3_contact_requests") {
				closeContactDialog();
				(
					document.getElementById("daily-limit-alert") as HTMLDialogElement
				).showModal();
				return;
			}

			if (!data.data || data.error) {
				setError(i18n.contact.genericError);
				return;
			}

			if (data.data?.code === "contact_request_sent") {
				showContactSuccessDialog();
				closeContactDialog();
				return;
			}
		},
		[i18n, recipientContactName, message, setIsContactRequestLoading],
	);

	const onDialogClick = useCallback(
		(event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
			const isClickOnBackground =
				event.target !== document.getElementById("contact-dialog");

			if (isClickOnBackground) {
				return;
			}
			closeContactDialog();
		},
		[],
	);

	const errorLabel = (errorMessage: string) => {
		return (
			<div>
				<label htmlFor="contact-error" className="text-red-500 font-bold">
					<Markdown>{errorMessage}</Markdown>
				</label>
			</div>
		);
	};

	return (
		<>
			<dialog
				id="contact-dialog"
				className="flex-col rounded-lg w-11/12 sm:w-[800px] backdrop:backdrop-brightness-90"
				onClick={onDialogClick}
			>
				<div className="grid grid-cols-1">
					<form
						onSubmit={onSubmit}
						className="col-start-1 row-start-1 h-full w-full"
					>
						<div className="flex flex-col gap-6 p-8">
							<div className="text-xl">
								<Markdown>
									{i18n.contact.dialogTitle(recipientContactName)}
								</Markdown>
							</div>
							<div className="flex flex-col gap-6">
								<label className="text-lg" htmlFor="amount">
									<Markdown>
										{i18n.contact.dialogDetail(
											recipientContactName,
											user?.email ?? "",
										)}
									</Markdown>
								</label>
								<textarea
									autoFocus={false}
									value={message}
									className="rounded-lg border-2 p-4"
									placeholder={i18n.contact.dialogPlaceholder}
									required
									name="message"
									rows={4}
									onChange={(e) => {
										setMessage(e.target.value.slice(0, 200));
									}}
								/>
							</div>

							<div className="text-sm">
								{i18n.contact.messageRestrictionsHint(
									MAX_MESSAGE_LENGTH,
									message,
								)}
								<span className={containsLinks ? "text-red-500" : ""}>
									{i18n.contact.containsUrlHint}
								</span>
							</div>

							{error && errorLabel(i18n.contact.genericError)}

							<div className="flex flex-col-reverse sm:flex-row justify-between gap-x-4">
								<div className="p-y-3.5 flex self-center">
									<TertiaryButton
										label={i18n.contact.dialogCancel}
										onClick={closeContactDialog}
									/>
								</div>
								<div className="flex flex-col items-start sm:items-end">
									<PrimaryButton
										label={i18n.contact.dialogSubmit}
										isLoading={isContactRequestLoading}
										type="submit"
										disabled={containsLinks || messageTooLong || !user}
									/>
								</div>
							</div>
						</div>
					</form>
					<div className="pointer-events-none col-start-1 row-start-1">
						<div className="flex w-full justify-end">
							<button
								className="pointer-events-auto p-2"
								onClick={closeContactDialog}
							>
								<CloseIcon />
							</button>
						</div>
					</div>
				</div>
			</dialog>

			<AlertDialog
				id="contact-successful-alert"
				alertTitleWithIcon={
					<>
						<Markdown>
							{i18n.contact.dialogSuccess(recipientContactName)}
						</Markdown>
						<div className="w-1/8 self-center">
							<CheckIcon />
						</div>
					</>
				}
				isButtonDisabled={false}
			/>

			<WarningDialog
				id="already-contacted-alert"
				title={i18n.contact.dialogAlreadyContactedError(recipientContactName)}
				alertMessage={i18n.contact.dialogAlreadyContactedExplanation}
				confirmTitle={i18n.contact.confirm}
			/>

			<WarningDialog
				id="daily-limit-alert"
				title={i18n.contact.dailyLimitError}
				alertMessage={i18n.contact.dailyLimitExplanation}
				confirmTitle={i18n.contact.confirm}
			/>

			<WarningDialog
				id="login-first-alert"
				title={i18n.contact.loginFirst}
				alertMessage={i18n.contact.loginFirstReason}
				confirmTitle={i18n.contact.loginFirstAction}
				href={`/profile?redirectTo=/map?treeId=${selectedTreeId}&zoom=20`}
			/>

			<WarningDialog
				id="generic-contact-error-alert"
				title={i18n.contact.genericErrorTitle}
				alertMessage={i18n.contact.genericError}
				confirmTitle={i18n.contact.confirm}
			/>
		</>
	);
};
