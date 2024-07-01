import React, { useRef, useEffect } from "react";
import { formatDate } from "date-fns";
import * as d3 from "d3";
import { useI18nStore } from "../../i18n/i18n-store";

interface LineChartProps {
	data: { month: Date; value: number }[];
	width: number;
	height: number;
}

export const LineChart: React.FC<LineChartProps> = ({
	data,
	width,
	height,
}) => {
	const firstYReferenceLineValue = 30;
	const secondYReferenceLineValue = 50;

	const last3Years = data.slice(-3 * 12);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const svgMargin = { top: 0, right: 30, bottom: 50, left: 30 };
	const { formatNumber } = useI18nStore();

	useEffect(() => {
		if (!last3Years || last3Years.length === 0) {
			return;
		}
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		svg.selectAll("*").remove(); // Clear any previous content

		const x = d3
			.scaleTime()
			.domain(d3.extent(last3Years, (d) => d.month) as [Date, Date])
			.range([svgMargin.left, width - svgMargin.right]);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(last3Years, (d) => d.value) as number])
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
					.attr("stroke", "#CECECE")
					.attr("stroke-width", 1);

				svg
					.append("text")
					.attr("x", svgMargin.left)
					.attr(
						"y",
						y(yReferenceLineValue) + svgMargin.top - 3 - svgMargin.bottom,
					)
					.attr("text-anchor", "start")
					.attr("fill", "#0A4295")
					.text(`${formatNumber(yReferenceLineValue)} Liter`)
					.attr("font-size", "12px");
			},
		);

		const area = d3
			.area<{ month: Date; value: number }>()
			.x(function (d) {
				return x(d.month);
			})
			.y0((d) => y(d.value) - svgMargin.bottom)
			.y1(function (d) {
				return y(0) - svgMargin.bottom;
			})
			.curve(d3.curveBasis);

		const g = svg.append("g");

		g.append("path")
			.datum(last3Years)
			.attr("class", "area")
			.attr("d", area)
			.attr("fill", "#336CC0");

		const tickValues = [
			last3Years[0].month,
			last3Years[Math.floor(last3Years.length / 2)].month,
			last3Years[last3Years.length - 1].month,
		];

		const xAxis = svg
			.append("g")
			.attr("transform", `translate(0, ${height - svgMargin.bottom})`)
			.call(
				d3
					.axisBottom(x)
					.tickValues(tickValues)
					.tickSizeOuter(0)
					.tickFormat((d) => formatDate(d as Date, "MM.yyyy")),
			);

		xAxis
			.append("text")
			.attr("x", width / 2)
			.attr("y", svgMargin.bottom - 10)
			.attr("fill", "black")
			.attr("text-anchor", "middle")
			.text("Monatswerte in Liter");
	}, [last3Years, data, width, height]);

	return <svg ref={svgRef}></svg>;
};
