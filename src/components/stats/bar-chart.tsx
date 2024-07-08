/* eslint-disable max-lines */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useI18nStore } from "../../i18n/i18n-store";
import { Monthly, MonthlyWeather } from "./stats";
import {
	defaultLabelColor,
	defaultWaterFillColor,
	hoverWaterFillColor,
	indicatorLineColor,
	temperatureFillColor,
} from "./chart-colors";

interface BarChartProps {
	monthlyData: Monthly[];
	weatherData: MonthlyWeather[];
	width: number;
	height: number;
}

export const BarChart: React.FC<BarChartProps> = ({
	monthlyData,
	weatherData,
	width,
	height,
}) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const svgMargin = { top: 0, right: 30, bottom: 50, left: 30 };
	const [hovered, setHovered] = React.useState<Monthly>();
	const last3Years = monthlyData.slice(-3 * 12);
	const yReferenceLineValue = 100000;
	const { formatNumber } = useI18nStore();

	const formatMonth = (date: string) => {
		return `${date.split("-")[1]}.${date.split("-")[0]}`;
	};

	const mouseMoveHandler = (e: MouseEvent) => {
		const containerDiv = document.getElementById("bar-container");
		if (!containerDiv || !e.target) {
			return;
		}
		//@ts-expect-error __data__ is a d3 property
		setHovered(e.target.__data__);
	};

	const mouseOutHandler = () => {
		setHovered(undefined);
	};

	const mouseClickHandler = (e: MouseEvent) => {
		mouseMoveHandler(e);
	};

	useEffect(() => {
		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		svg
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${svgMargin.left},${svgMargin.top})`);

		const xScale = d3
			.scaleBand()
			.domain(last3Years.map((d) => formatMonth(d.month)))
			.range([svgMargin.left, width - svgMargin.right])
			.padding(0.2);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(last3Years, (d) => d.totalSum) || 0])
			.nice()
			.range([height, svgMargin.bottom]);

		svg
			.append("line")
			.attr("x1", svgMargin.left)
			.attr(
				"y1",
				yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom,
			)
			.attr("x2", width - svgMargin.right)
			.attr(
				"y2",
				yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom,
			)
			.attr("stroke", indicatorLineColor)
			.attr("stroke-width", 1);

		svg
			.append("text")
			.attr("x", width - svgMargin.right + 3)
			.attr(
				"y",
				yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom + 3,
			)
			.attr("text-anchor", "start")
			.attr("fill", defaultLabelColor)
			.text(`${formatNumber(yReferenceLineValue / 1000)}k l`)
			.attr("font-size", "12px");

		svg
			.selectAll(".bar")
			.data(last3Years)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d) => xScale(formatMonth(d.month)) || 0)
			.attr("y", (d) => yScale(d.totalSum) - svgMargin.bottom)
			.attr("rx", 3)
			.attr("ry", 3)
			.attr("width", xScale.bandwidth())
			.attr("height", (d) => height - yScale(d.totalSum))
			.attr("fill", (d) => {
				if (hovered && hovered.month === d.month) {
					return hoverWaterFillColor;
				}
				return defaultWaterFillColor;
			})
			.on("mouseout", mouseOutHandler)
			.on("mousemove", mouseMoveHandler)
			.on("click", mouseClickHandler);

		const xAxis = svg
			.append("g")
			.attr("transform", `translate(0, ${height - svgMargin.bottom})`)
			.call(
				d3
					.axisBottom(xScale)
					.tickValues(
						xScale.domain().filter(function (_, i) {
							return (
								i === 0 ||
								i === last3Years.length - 1 ||
								i === Math.floor(last3Years.length / 2)
							);
						}),
					)
					.tickSizeOuter(0),
			);

		xAxis
			.append("text")
			.attr("x", width / 2)
			.attr("y", svgMargin.bottom - 10)
			.attr("fill", defaultLabelColor)
			.attr("text-anchor", "middle")
			.text("Monatswerte in Liter")
			.attr("font-size", "14px");

		const temperatureXScale = d3
			.scaleTime()
			.domain(d3.extent(weatherData, (d) => new Date(d.month)) as [Date, Date])
			.range([svgMargin.left, width - svgMargin.right]);

		const temperatureYScale = d3
			.scaleLinear()
			.domain([0, d3.max(weatherData, (d) => d.averageTemperatureCelsius)] as [
				number,
				number,
			])
			.range([height / 2, 0]);

		svg
			.append("path")
			.datum(weatherData)
			.attr("fill", "none")
			.attr("stroke", temperatureFillColor)
			.attr("stroke-width", 1.5)
			.attr("opacity", 0.5)
			.attr(
				"d",
				d3
					.line<MonthlyWeather>()
					.x((d) => temperatureXScale(new Date(d.month)))
					.y(
						(d) =>
							height / 2 -
							svgMargin.bottom +
							temperatureYScale(d.averageTemperatureCelsius),
					),
			);

		const maxTemperature =
			d3.max(weatherData, (d) => d.averageTemperatureCelsius) || 0;
		svg
			.append("line")
			.attr("x1", svgMargin.left)
			.attr(
				"y1",
				height / 2 - svgMargin.bottom + temperatureYScale(maxTemperature),
			)
			.attr("x2", width - svgMargin.right)
			.attr(
				"y2",
				height / 2 - svgMargin.bottom + temperatureYScale(maxTemperature),
			)
			.attr("stroke", temperatureFillColor)
			.attr("opacity", 0.5)
			.attr("stroke-width", 1);

		svg
			.append("text")
			.attr("x", width - svgMargin.right + 3)
			.attr(
				"y",
				height / 2 - svgMargin.bottom + temperatureYScale(maxTemperature) + 3,
			)
			.attr("text-anchor", "start")
			.text(`${formatNumber(Math.round(maxTemperature))}°C`)
			.attr("font-size", "12px")
			.attr("fill", temperatureFillColor);

		svg
			.selectAll("text")
			.attr("font-family", "IBM")
			.attr("fill", defaultLabelColor);
	}, [last3Years, hovered, weatherData]);

	return (
		<div className="relative" id="bar-container">
			<svg ref={svgRef}></svg>
			{hovered && (
				<div className="absolute right-0 top-0 p-2 bg-gdk-lighter-blue shadow-md rounded-md">
					<div className="flex flex-col text-sm ">
						<div className="font-bold">{formatMonth(hovered.month)}</div>
						<div>{formatNumber(hovered.totalSum)} Liter</div>
					</div>
				</div>
			)}
		</div>
	);
};
