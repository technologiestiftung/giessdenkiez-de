import React, { useRef, useEffect } from "react";
import { formatDate } from "date-fns";
import * as d3 from "d3";

interface LineChartProps {
	data: { date: Date; value: number }[];
	width: number;
	height: number;
}

export const LineChart: React.FC<LineChartProps> = ({
	data,
	width,
	height,
}) => {
	const avg = Math.round(
		data
			.filter((d) => d.date.getFullYear() === 2024)
			.reduce((acc, m) => acc + m.value, 0) / data.length,
	);

	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		svg.selectAll("*").remove(); // Clear any previous content

		const x = d3
			.scaleTime()
			.domain(d3.extent(data, (d) => d.date) as [Date, Date])
			.range([0, width]);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) as number])
			.nice()
			.range([height, 0]);

		const area = d3
			.area<{ date: Date; value: number }>()
			.x(function (d) {
				return x(d.date);
			})
			.y0((d) => y(d.value))
			.y1(function (d) {
				return y(0);
			})
			.curve(d3.curveBasis);

		const g = svg.append("g");

		// add the area
		g.append("path")
			.datum(data)
			.attr("class", "area")
			.attr("d", area)
			.attr("fill", "#336CC0");
	}, [data, width, height]);

	return (
		<div className="flex flex-col">
			<svg ref={svgRef}></svg>
			{data && data.length > 0 && (
				<div className="border-t-2 w-full border-[#9D9C9C]">
					<div className="flex flex-row justify-between text-[#9D9C9C]">
						<div className="text-sm flex flex-col justify-center">
							<div className="w-[2px] h-2 bg-[#9D9C9C]"></div>
							<div>{formatDate(data[0].date, "MM.yy")}</div>
						</div>
						<div className="text-sm flex flex-col justify-center items-center">
							<div className="w-[2px] h-2 bg-[#9D9C9C]"></div>
							<div>
								{formatDate(data[Math.floor(data.length / 2)].date, "MM.yy")}
							</div>
						</div>
						<div className="text-sm flex flex-col justify-center items-end">
							<div className="w-[2px] h-2 bg-[#9D9C9C]"></div>
							<div>{formatDate(data[data.length - 1].date, "MM.yy")}</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
