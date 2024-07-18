/* eslint-disable max-lines */
import * as d3 from "d3";
import { formatDate } from "date-fns";
import React, { useEffect, useRef } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import {
	defaultLabelColor,
	defaultWaterFillColor,
	indicatorLineColor,
	hoverWaterFillColor,
} from "./chart-colors";
import { Yearly } from "./stats";

interface LineChartProps {
	yearlyData: Yearly[];
	width: number;
	height: number;
}

export const LineChart: React.FC<LineChartProps> = ({
	yearlyData,
	width,
	height,
}) => {
	const firstYReferenceLineValue = 30;
	const secondYReferenceLineValue = 50;

	const svgRef = useRef<SVGSVGElement | null>(null);
	const svgMargin = { top: 25, right: 25, bottom: 30, left: 20 };
	const { formatNumber } = useI18nStore();

	const [hovered, setHovered] = React.useState<Yearly>();

	const mouseMoveHandler = (e: MouseEvent) => {
		const containerDiv = document.getElementById("area-container");
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
		if (!yearlyData || yearlyData.length === 0) {
			return;
		}

		// SVG size setup
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		svg.selectAll("*").remove();

		// Scaling functions for average watering amount data
		const xScale = d3
			.scaleTime()
			.domain(d3.extent(yearlyData, (d) => new Date(d.year)) as [Date, Date])
			.range([svgMargin.left, width - svgMargin.right]);
		const yScale = d3
			.scaleLinear()
			.domain([
				0,
				d3.max(yearlyData, (d) => d.averageAmountPerWatering) as number,
			])
			.nice()
			.range([height, svgMargin.bottom]);

		// Reference line for average watered amount
		[firstYReferenceLineValue, secondYReferenceLineValue].forEach(
			(yReferenceLineValue) => {
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
					.attr("x", width - svgMargin.right + 5)
					.attr(
						"y",
						yScale(yReferenceLineValue) +
							svgMargin.top -
							svgMargin.bottom +
							2.5,
					)
					.attr("text-anchor", "start")
					.attr("fill", defaultLabelColor)
					.text(`${formatNumber(yReferenceLineValue)} l`)
					.attr("font-size", "12px");
			},
		);

		// Area chart setup
		const area = d3
			.area<Yearly>()
			.x(function (d) {
				return xScale(new Date(d.year));
			})
			.y0(
				(d) =>
					yScale(d.averageAmountPerWatering) - svgMargin.bottom + svgMargin.top,
			)
			.y1(function () {
				return yScale(0) - svgMargin.bottom;
			})
			.curve(d3.curveBumpX);

		// Add area chart to svg
		svg
			.append("path")
			.datum(yearlyData)
			.attr("class", "area")
			.attr("d", area)
			.attr("fill", defaultWaterFillColor);

		// Add x-axis labels and ticks to svg
		const tickValues = yearlyData.map((d) => new Date(d.year));
		svg
			.append("g")
			.attr("transform", `translate(0, ${height - svgMargin.bottom})`)
			.call(
				d3
					.axisBottom(xScale)
					.tickValues(tickValues)
					.tickSizeOuter(0)
					.tickFormat((d) => formatDate(d as Date, "yyyy")),
			);

		svg
			.selectAll("text")
			.attr("font-family", "IBM")
			.attr("fill", defaultLabelColor);

		// add bar for hover effect to svg
		svg
			.selectAll(".barHover")
			.data(yearlyData)
			.enter()
			.append("rect")
			.attr("class", "barHover")
			.attr("x", (d) => xScale(new Date(d.year)) - 1.5)
			.attr(
				"y",
				(d) =>
					yScale(d.averageAmountPerWatering) - svgMargin.bottom + svgMargin.top,
			)
			.attr("width", 3)
			.attr(
				"height",
				(d) => height - yScale(d.averageAmountPerWatering) - svgMargin.top,
			)
			.attr("fill", (d) => {
				if (hovered && hovered.year === d.year) {
					return hoverWaterFillColor;
				}
				return "transparent";
			})
			.attr("opacity", 0.5)
			.attr("stroke", "transparent")
			.attr("stroke-width", 70)
			.on("mouseout", mouseOutHandler)
			.on("mousemove", mouseMoveHandler)
			.on("click", mouseClickHandler);

		// add value over bar for hover effect to svg
		svg
			.selectAll(".bar-title")
			.data(yearlyData)
			.enter()
			.append("text")
			.classed("bar-title", true)
			.attr("text-anchor", "middle")
			.attr("x", (d) => xScale(new Date(d.year)))
			.attr(
				"y",
				(d) => yScale(d.averageAmountPerWatering) - svgMargin.bottom + 13,
			)
			.text((d) => `${Math.round(d.averageAmountPerWatering)} l`)
			.attr("fill", (d) => {
				if (hovered && hovered.year === d.year) {
					return defaultLabelColor;
				}
				return "transparent";
			});
	}, [yearlyData, width, height, hovered]);

	return (
		<div className="relative" id="area-container">
			<svg ref={svgRef}></svg>
		</div>
	);
};
