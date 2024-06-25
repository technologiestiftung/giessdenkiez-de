import React, { useEffect, useRef } from "react";
import {
	axisBottom,
	axisLeft,
	ScaleBand,
	scaleBand,
	ScaleLinear,
	scaleLinear,
	select,
} from "d3";

export interface IData {
	label: string;
	value: number;
}

export interface IGroupedData {
	label: string;
	values: number[];
}

interface BarChartProps {
	data: IData[];
}

interface AxisBottomProps {
	scale: ScaleBand<string>;
	transform: string;
}

interface AxisLeftProps {
	scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
	data: BarChartProps["data"];
	height: number;
	scaleX: AxisBottomProps["scale"];
	scaleY: AxisLeftProps["scale"];
}

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
	return (
		<>
			{data.map(({ value, label }) => (
				<rect
					key={`bar-${label}`}
					x={scaleX(label)}
					y={scaleY(value)}
					width={scaleX.bandwidth()}
					height={height - scaleY(value)}
					fill="#0A4295"
				/>
			))}
		</>
	);
}

export function BarChart({ data }: BarChartProps) {
	const margin = { top: 0, right: 0, bottom: 0, left: 0 };
	const width = 260 - margin.left - margin.right;
	const height = 200 - margin.top - margin.bottom;

	const scaleX = scaleBand()
		.domain(data.map(({ label }) => label))
		.range([0, width])
		.padding(0.5);

	const scaleY = scaleLinear()
		.domain([0, Math.max(...data.map(({ value }) => value))])
		.range([height, 0]);

	const average = data.reduce((acc, { value }) => acc + value, 0) / data.length;

	return (
		<svg
			width={width + margin.left + margin.right}
			height={height + margin.top + margin.bottom}
		>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
				<rect
					key={`bar-horizontal`}
					x={0}
					y={scaleY(average)}
					width={width}
					height={1}
					fill="#0A4295"
				/>
			</g>
		</svg>
	);
}
