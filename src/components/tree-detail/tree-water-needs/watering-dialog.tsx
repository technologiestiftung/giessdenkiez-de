import React, { useCallback } from "react";
import { useI18nStore } from "../../../i18n/i18n-store";
import { PrimaryButton } from "../../buttons/primary";
import { useWaterTree } from "./../hooks/use-water-tree";
import { useErrorStore } from "../../../error/error-store";
import { format } from "date-fns";
import { TertiaryButton } from "../../buttons/tertiary";
import { CloseIcon } from "../../icons/close-icon";

const closeWateringDialog = () => {
	(document.getElementById("water-dialog") as HTMLDialogElement).close();
};

export const WateringDialog: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { waterTree } = useWaterTree();
	const { handleError } = useErrorStore();

	const formattedToday = format(new Date(), "yyyy-MM-dd");

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const amount = Number(e.currentTarget.amount.value);
			const date = new Date(e.currentTarget.date.value);

			try {
				await waterTree(amount, date);
			} catch (error) {
				handleError(i18n.common.defaultErrorMessage, error);
			}

			closeWateringDialog();
		},
		[i18n],
	);

	const onDialogClick = useCallback(
		(event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
			const isClickOnBackground =
				event.target !== document.getElementById("water-dialog");

			if (isClickOnBackground) {
				return;
			}

			closeWateringDialog();
		},
		[],
	);

	return (
		<dialog
			id="water-dialog"
			className="flex-col rounded-lg w-11/12 sm:w-[400px] backdrop:backdrop-brightness-90"
			onClick={onDialogClick}
		>
			<div className="grid grid-cols-1">
				<form
					onSubmit={onSubmit}
					className="col-start-1 row-start-1 h-full w-full"
				>
					<div className="flex flex-col gap-6 p-8">
						<div className="text-xl font-bold">
							{i18n.treeDetail.waterNeed.submitWatering}
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-lg font-semibold" htmlFor="amount">
								{i18n.treeDetail.waterNeed.wateredHowMuch}
							</label>
							<input
								className="rounded-lg border-2 p-4"
								type="number"
								inputMode="numeric"
								placeholder={
									i18n.treeDetail.waterNeed.wateredHowMuchPlaceholder
								}
								required
								name="amount"
								min="1"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-lg font-semibold" htmlFor="date">
								{i18n.treeDetail.waterNeed.wateredWhen}
							</label>
							<input
								className="rounded-lg border-2 p-4"
								type="date"
								name="date"
								required
								defaultValue={formattedToday}
								max={formattedToday}
							/>
						</div>
						<div className="flex flex-col-reverse sm:flex-row justify-between gap-x-4">
							<div className="p-y-3.5 flex self-center">
								<TertiaryButton
									label={i18n.treeDetail.waterNeed.waterCancel}
									onClick={close}
								/>
							</div>
							<PrimaryButton
								label={i18n.treeDetail.waterNeed.waterSave}
								type="submit"
							/>
						</div>
					</div>
				</form>
				<div className="pointer-events-none col-start-1 row-start-1">
					<div className="flex w-full justify-end">
						<button className="pointer-events-auto p-2" onClick={close}>
							<CloseIcon />
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
};
