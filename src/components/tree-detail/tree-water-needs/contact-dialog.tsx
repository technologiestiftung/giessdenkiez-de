/* eslint-disable max-lines */
import React, { useCallback, useState } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { AlertDialog } from "../../alert-dialog/alert-dialog";
import { PrimaryButton } from "../../buttons/primary";
import { TertiaryButton } from "../../buttons/tertiary";
import { CheckIcon } from "../../icons/check-icon";
import { CloseIcon } from "../../icons/close-icon";
import Markdown from "react-markdown";
import { supabaseClient } from "../../../auth/supabase-client";

const closeContactDialog = () => {
	(document.getElementById("contact-dialog") as HTMLDialogElement).close();
};

interface ContactDialogProps {
	contactUsername: string;
}
export const ContactDialog: React.FC<ContactDialogProps> = ({
	contactUsername,
}) => {
	const [message, setMessage] = useState("");
	const [isContactRequestLoading, setIsContactRequestLoading] = useState(false);
	const [alreadySentContact, setAlreadySentContact] = useState(false);
	const [error, setError] = useState("");
	const [
		alreadySentMoreThan3RequestsInLast24Hours,
		setAlreadySentMoreThan3RequestsInLast24Hours,
	] = useState(false);

	const i18n = useI18nStore().i18n();

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
			setAlreadySentContact(false);
			setAlreadySentMoreThan3RequestsInLast24Hours(false);
			setIsContactRequestLoading(true);

			e.preventDefault();
			const data = await supabaseClient.functions.invoke(
				"submit_contact_request",
				{
					body: {
						userContactName: contactUsername,
						message: message,
					},
				},
			);

			setIsContactRequestLoading(false);

			if (data.data?.code === "already_sent_contact_request") {
				setAlreadySentContact(true);
				return;
			}

			if (data.data?.code === "already_sent_more_than_3_contact_requests") {
				setAlreadySentMoreThan3RequestsInLast24Hours(true);
				return;
			}

			if (data.data?.code === "contact_request_sent") {
				showContactSuccessDialog();
				closeContactDialog();
				return;
			}

			if (!data.data || data.error) {
				setError(i18n.contact.genericError);
			}
		},
		[i18n, contactUsername, message, setIsContactRequestLoading],
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
								<Markdown>{i18n.contact.dialogTitle(contactUsername)}</Markdown>
							</div>
							<div className="flex flex-col gap-6">
								<label className="text-lg" htmlFor="amount">
									<Markdown>
										{i18n.contact.dialogDetail(contactUsername)}
									</Markdown>
								</label>
								<textarea
									value={message}
									className="rounded-lg border-2 p-4"
									placeholder={i18n.contact.dialogPlaceholder}
									required
									name="message"
									rows={4}
									onChange={(e) => {
										setMessage(e.target.value);
									}}
								/>
							</div>
							{alreadySentContact && (
								<div>
									<label
										htmlFor="contact-error"
										className="text-red-500 font-bold"
									>
										<Markdown>
											{i18n.contact.dialogAlreadyContactedError(
												contactUsername,
											)}
										</Markdown>
									</label>
								</div>
							)}
							{alreadySentMoreThan3RequestsInLast24Hours && (
								<div>
									<label
										htmlFor="contact-error"
										className="text-red-500 font-bold"
									>
										<Markdown>
											{
												i18n.contact
													.alreadySentMoreThan3RequestsInLast24HoursError
											}
										</Markdown>
									</label>
								</div>
							)}
							{error && (
								<div>
									<label
										htmlFor="contact-error"
										className="text-red-500 font-bold"
									>
										<Markdown>{i18n.contact.genericError}</Markdown>
									</label>
								</div>
							)}
							<div className="flex flex-col-reverse sm:flex-row justify-between gap-x-4">
								<div className="p-y-3.5 flex self-center">
									<TertiaryButton
										label={i18n.contact.dialogCancel}
										onClick={closeContactDialog}
									/>
								</div>
								<PrimaryButton
									label={i18n.contact.dialogSubmit}
									isLoading={isContactRequestLoading}
									type="submit"
									disabled={false}
								/>
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
						<Markdown>{i18n.contact.dialogSuccess(contactUsername)}</Markdown>
						<div className="w-1/8 self-center">
							<CheckIcon />
						</div>
					</>
				}
				isButtonDisabled={false}
			/>
		</>
	);
};
