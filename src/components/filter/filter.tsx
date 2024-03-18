import React from "react";
import FilterSwitch from "./filter-switch";
import TreeAgeButton from "./tree-age-button";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";

type FilterProps = {};

const Filter: React.FC<FilterProps> = ({}) => {
	return (
		<div
			className={`z-[2] flex h-fit w-full flex-col drop-shadow-md bg-white p-4 rounded-lg gap-4`}
		>
			<div className="font-bold text-xl">Filter</div>
			<div className="flex flex-col gap-2">
				<FilterSwitch
					name="Öffentliche Pumpen"
					onChange={() => {}}
				></FilterSwitch>
				<FilterSwitch
					name="Gießbedürftige Bäume"
					onChange={() => {}}
				></FilterSwitch>
			</div>

			<div className="font-bold text-xl">Baumalter</div>
			<div className="flex flex-row gap-2">
				<div className="w-[33%]">
					<TreeAgeButton
						onChange={() => {}}
						name={"0 - 3 Jahre"}
						padding="px-8"
					/>
				</div>
				<div className="w-[33%]">
					<TreeAgeButton
						onChange={() => {}}
						name={"4 - 40 Jahre"}
						padding="px-6"
					/>
				</div>
				<div className="w-[33%]">
					<TreeAgeButton
						onChange={() => {}}
						name={"40+ Jahre"}
						padding="px-4"
					/>
				</div>
			</div>

			<div className="flex flex-row justify-between">
				<SecondaryButton
					label={"Zurücksetzen"}
					onClick={() => {}}
				></SecondaryButton>
				<PrimaryButton label={"Anzeigen"}></PrimaryButton>
			</div>
		</div>
	);
};

export default Filter;
