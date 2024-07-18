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
	const svgMargin = { top: 0, right: 30, bottom: 30, left: 20 };
	const [hovered, setHovered] = React.useState<Monthly>();
	const last3Years = monthlyData.slice(-3 * 12);
	const yReferenceLineValue = 100000;
	const { formatNumber } = useI18nStore();
	const i18n = useI18nStore().i18n();

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
		// SVG size setup
		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();
		svg
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${svgMargin.left},${svgMargin.top})`);

		// Scaling functions for watered data
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

		// Reference line for watered amount
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
				yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom - 2,
			)
			.attr("text-anchor", "start")
			.attr("fill", defaultLabelColor)
			.text(`${formatNumber(yReferenceLineValue / 1000)}k l`)
			.attr("font-size", "12px");
		svg
			.append("text")
			.attr("x", width - svgMargin.right + 3)
			.attr(
				"y",
				yScale(yReferenceLineValue) + svgMargin.top - svgMargin.bottom + 11,
			)
			.attr("text-anchor", "start")
			.attr("fill", defaultLabelColor)
			.text(`${i18n.stats.wateringBehaviorStat.unit}`)
			.attr("font-size", "12px");

		// Full height bar for hover effect
		svg
			.selectAll(".barHover")
			.data(last3Years)
			.enter()
			.append("rect")
			.attr("class", "barHover")
			.attr("x", (d) => xScale(formatMonth(d.month)) || 0)
			.attr("y", -svgMargin.bottom)
			.attr("width", xScale.bandwidth() + 1.5)
			.attr("height", height)
			.attr("fill", (d) => {
				if (hovered && hovered.month === d.month) {
					return hoverWaterFillColor;
				}
				return "transparent";
			})
			.attr("opacity", 0.1)
			.on("mouseout", mouseOutHandler)
			.on("mousemove", mouseMoveHandler)
			.on("click", mouseClickHandler);

		// Scaling functions for weather data
		const weatherXScale = d3
			.scaleTime()
			.domain(d3.extent(weatherData, (d) => new Date(d.month)) as [Date, Date])
			.range([svgMargin.left, width - svgMargin.right]);

		const rainYScale = d3
			.scaleLinear()
			.domain([0, d3.max(weatherData, (d) => d.totalRainfallLiters)] as [
				number,
				number,
			])
			.range([height / 2, 0]);

		const temperatureYScale = d3
			.scaleLinear()
			.domain([0, d3.max(weatherData, (d) => d.averageTemperatureCelsius)] as [
				number,
				number,
			])
			.range([height / 2, 0]);

		// line graph for rain
		svg
			.append("path")
			.datum(weatherData)
			.attr("fill", "none")
			.attr("stroke", defaultWaterFillColor)
			.attr("stroke-width", 1.5)
			.attr("stroke-dasharray", "2")
			.attr("opacity", 0.3)
			.attr(
				"d",
				d3
					.line<MonthlyWeather>()
					.x((d) => weatherXScale(new Date(d.month)) + 3)
					.y(
						(d) =>
							height / 2 + rainYScale(d.totalRainfallLiters) - svgMargin.bottom,
					),
			);

		// line graph for temperature
		svg
			.append("path")
			.datum(weatherData)
			.attr("fill", "none")
			.attr("stroke", temperatureFillColor)
			.attr("stroke-width", 1.5)
			.attr("opacity", 0.3)
			.attr(
				"d",
				d3
					.line<MonthlyWeather>()
					.x((d) => weatherXScale(new Date(d.month)) + 3)
					.y(
						(d) =>
							height / 2 +
							temperatureYScale(d.averageTemperatureCelsius) -
							svgMargin.bottom,
					),
			);

		// bars for watered data
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

		// x-axis labels and ticks
		svg
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

		// styling for x-axis labels
		svg
			.selectAll("text")
			.attr("font-family", "IBM")
			.attr("fill", defaultLabelColor);
	}, [last3Years, hovered, weatherData]);

	return (
		<div className="relative" id="bar-container">
			<svg ref={svgRef}></svg>
			{hovered && (
				<div className="absolute left-0 top-1.5 p-1.5 bg-white/75 border shadow-sm rounded-md">
					<div className="flex flex-col text-sm ">
						<div className="font-bold">{formatMonth(hovered.month)}</div>
						<div className="text-gdk-dark-blue">
							{formatNumber(hovered.totalSum)} l{" "}
							{i18n.stats.wateringBehaviorStat.watered}
						</div>
						<div className="text-gdk-dark-blue opacity-40">
							{Math.round(
								weatherData.filter((d) => d.month === hovered.month)[0]
									.totalRainfallLiters,
							)}
							{" mm "}
							{i18n.stats.wateringBehaviorStat.rain}
						</div>
						<div className="text-gdk-orange opacity-80">
							Ø{" "}
							{Math.round(
								weatherData.filter((d) => d.month === hovered.month)[0]
									.averageTemperatureCelsius,
							)}
							{" °C"}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
