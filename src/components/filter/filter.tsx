import React from "react";
import FilterSwitch from "./filter-switch";
import TreeAgeButton from "./tree-age-button";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";

const Filter: React.FC = () => {
	return (
		<div className="flex flex-row w-full justify-center pointer-events-auto">
			<div
				className={`flex flex-col lg:drop-shadow-md bg-white rounded-lg p-4 lg:p-8 gap-6 w-full`}
			>
				<div className="flex flex-col gap-2">
					<div className="font-bold text-xl">Filter</div>
					<div className="flex flex-col gap-2">
						<FilterSwitch name="Öffentliche Pumpen" onChange={() => {}} />
						<FilterSwitch name="Gießbedürftige Bäume" onChange={() => {}} />
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="font-bold text-xl">Baumalter</div>
					<div className="flex flex-row gap-2">
						<div className="w-[33%]">
							<TreeAgeButton
								onChange={() => {}}
								name={"0 - 3 Jahre"}
								padding="p-3 lg:p-4"
							/>
						</div>
						<div className="w-[33%]">
							<TreeAgeButton
								onChange={() => {}}
								name={"4 - 40 Jahre"}
								padding="p-2 lg:p-3"
							/>
						</div>
						<div className="w-[33%]">
							<TreeAgeButton
								onChange={() => {}}
								name={"40+ Jahre"}
								padding="p-1 lg:p-2"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-row justify-between gap-4">
					<SecondaryButton label={"Zurücksetzen"} onClick={() => {}} />
					<PrimaryButton label={"Anzeigen"} />
				</div>
			</div>
		</div>
	);
};

export default Filter;
