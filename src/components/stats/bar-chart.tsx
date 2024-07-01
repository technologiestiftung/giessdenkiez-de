import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useI18nStore } from "../../i18n/i18n-store";

interface BarChartProps {
	data: { month: string; value: number }[];
	width: number;
	height: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const svgMargin = { top: 0, right: 30, bottom: 50, left: 30 };
	const [hovered, setHovered] = React.useState<string | null>(null);
	const last3Years = data.slice(-3 * 12);
	const yReferenceLineValue = 100000;
	const { formatNumber } = useI18nStore();

	const formatMonth = (date: string) => {
		return `${date.split("-")[1]}.${date.split("-")[0]}`;
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
			.domain([0, d3.max(last3Years, (d) => d.value) || 0])
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
			.attr("stroke", "#CECECE")
			.attr("stroke-width", 1);

		svg
			.append("text")
			.attr("x", width - svgMargin.right)
			.attr(
				"y",
				yScale(yReferenceLineValue) + svgMargin.top - 3 - svgMargin.bottom,
			)
			.attr("text-anchor", "end")
			.attr("fill", "#0A4295")
			.text(`${formatNumber(yReferenceLineValue)} Liter`)
			.attr("font-size", "12px");

		svg
			.selectAll(".bar")
			.data(last3Years)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d) => xScale(formatMonth(d.month)) || 0)
			.attr("y", (d) => yScale(d.value) - svgMargin.bottom)
			.attr("rx", 3)
			.attr("ry", 3)
			.attr("width", xScale.bandwidth())
			.attr("height", (d) => height - yScale(d.value))
			.attr("fill", (d) => {
				if (hovered && hovered === formatMonth(d.month)) {
					return "#96BCF4";
				}
				return "#336CC0";
			})
			.on("mouseover", function (e) {
				const month = formatMonth(e.srcElement.__data__.month);
				setHovered(month);
				d3.select(".hover-label")
					.attr("x", width - svgMargin.right)
					.attr("y", 0 + 20)
					.attr("text-anchor", "end")
					.text(`${month}: ${formatNumber(e.srcElement.__data__.value)} Liter`);
			})
			.on("mouseout", function () {
				setHovered(null);
			})
			.on("click", function (e) {
				const month = formatMonth(e.srcElement.__data__.month);
				setHovered(month);
			});

		svg.on("click", function () {
			setHovered(null);
		});

		const xAxis = svg
			.append("g")
			.attr("transform", `translate(0, ${height - svgMargin.bottom})`)
			.call(
				d3
					.axisBottom(xScale)
					.tickValues(
						xScale.domain().filter(function (d, i) {
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
			.attr("fill", "#0A4295")
			.attr("text-anchor", "middle")
			.text("Monatswerte in Liter");

		svg
			.append("text")
			.attr("class", "hover-label")
			.attr("fill", "#0A4295")
			.attr("font-size", "12px");

		svg.selectAll("text").attr("font-family", "IBM").attr("fill", "#0A4295");
	}, [yReferenceLineValue, last3Years, height, width]);

	return <svg ref={svgRef}></svg>;
};
