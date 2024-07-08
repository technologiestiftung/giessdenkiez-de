import * as d3 from "d3";
import { formatDate } from "date-fns";
import React, { useEffect, useRef } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import {
	defaultLabelColor,
	defaultWaterFillColor,
	indicatorLineColor,
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
	const svgMargin = { top: 0, right: 30, bottom: 50, left: 30 };
	const { formatNumber } = useI18nStore();

	useEffect(() => {
		if (!yearlyData || yearlyData.length === 0) {
			return;
		}
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		svg.selectAll("*").remove();

		const x = d3
			.scaleTime()
			.domain(d3.extent(yearlyData, (d) => new Date(d.year)) as [Date, Date])
			.range([svgMargin.left, width - svgMargin.right]);

		const y = d3
			.scaleLinear()
			.domain([
				0,
				d3.max(yearlyData, (d) => d.averageAmountPerWatering) as number,
			])
			.nice()
			.range([height, svgMargin.bottom]);

		[firstYReferenceLineValue, secondYReferenceLineValue].forEach(
			(yReferenceLineValue) => {
				svg
					.append("line")
					.attr("x1", svgMargin.left)
					.attr("y1", y(yReferenceLineValue) + svgMargin.top - svgMargin.bottom)
					.attr("x2", width - svgMargin.right)
					.attr("y2", y(yReferenceLineValue) + svgMargin.top - svgMargin.bottom)
					.attr("stroke", indicatorLineColor)
					.attr("stroke-width", 1);

				svg
					.append("text")
					.attr("x", width - svgMargin.right)
					.attr(
						"y",
						y(yReferenceLineValue) + svgMargin.top - svgMargin.bottom + 2.5,
					)
					.attr("text-anchor", "start")
					.attr("fill", defaultLabelColor)
					.text(`${formatNumber(yReferenceLineValue)} l`)
					.attr("font-size", "12px");
			},
		);

		const area = d3
			.area<Yearly>()
			.x(function (d) {
				return x(new Date(d.year));
			})
			.y0((d) => y(d.averageAmountPerWatering) - svgMargin.bottom)
			.y1(function () {
				return y(0) - svgMargin.bottom;
			})
			.curve(d3.curveBumpX);

		const g = svg.append("g");

		g.append("path")
			.datum(yearlyData)
			.attr("class", "area")
			.attr("d", area)
			.attr("fill", defaultWaterFillColor);

		const tickValues = yearlyData.map((d) => new Date(d.year));

		const xAxis = svg
			.append("g")
			.attr("transform", `translate(0, ${height - svgMargin.bottom})`)
			.call(
				d3
					.axisBottom(x)
					.tickValues(tickValues)
					.tickSizeOuter(0)
					.tickFormat((d) => formatDate(d as Date, "yyyy")),
			);

		xAxis
			.append("text")
			.attr("x", width / 2)
			.attr("y", svgMargin.bottom - 10)
			.attr("fill", defaultLabelColor)
			.attr("text-anchor", "middle")
			.text("Monatswerte in Liter")
			.attr("font-size", "14px");

		svg
			.selectAll("text")
			.attr("font-family", "IBM")
			.attr("fill", defaultLabelColor);
	}, [yearlyData, width, height]);

	return <svg ref={svgRef}></svg>;
};
