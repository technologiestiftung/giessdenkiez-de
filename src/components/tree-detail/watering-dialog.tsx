import React, { useCallback } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import "../../index.css";
import { PrimaryButton } from "../buttons/primary";
import { SecondaryButton } from "../buttons/secondary";
import { useWaterTree } from "./hooks/use-water-tree";
import { TreeData } from "./tree-types";
import { useErrorStore } from "../../error/error-store";
import { format } from "date-fns";
interface WateringDialogProps {
	treeData: TreeData;
	close: () => void;
}

export const WateringDialog: React.FC<WateringDialogProps> = ({
	treeData,
	close,
}) => {
	const i18n = useI18nStore().i18n();
	const { waterTree } = useWaterTree(treeData.id);
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

			close();
		},
		[i18n],
	);

	const onDialogClick = useCallback(
		(event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
			const isClickOnBackground =
				event.target !== document.getElementById("water-dialog");

			console.log(event.target);
			console.log(isClickOnBackground);
			if (isClickOnBackground) {
				return;
			}

			close();
		},
		[],
	);

	return (
		<dialog
			id="water-dialog"
			className="flex-col rounded-lg "
			onClick={onDialogClick}
		>
			<form onSubmit={onSubmit}>
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
							placeholder={i18n.treeDetail.waterNeed.wateredHowMuchPlaceholder}
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
					<div className="flex flex-row justify-between gap-x-4">
						<SecondaryButton
							label={i18n.treeDetail.waterNeed.waterCancel}
							onClick={close}
						/>
						<PrimaryButton
							label={i18n.treeDetail.waterNeed.waterSave}
							type="submit"
						/>
					</div>
				</div>
			</form>
		</dialog>
	);
};
