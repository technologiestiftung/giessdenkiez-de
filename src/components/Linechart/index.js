import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LineChartWrapper = styled.div`
  width: 100%;
  height: 150px;
  background: red;
`;

import {
  select as d3Select,
  scaleLinear,
  area as d3Area,
  line as d3Line,
  scaleTime as d3ScaleTime,
  path as d3Path,
  transition as d3Transition,
  easeCubicInOut,
  select,
  axisLeft,
  axisBottom
} from "d3";

const Linechart = p => {
  const { data } = p;
  const [scaleTime, setScaleTime] = useState(null);
  const [scaleRain, setScaleRain] = useState(null);

  const margin = {
    top: 50,
    right: 80,
    bottom: 50,
    left: 80
  };

  let svg = null;
  let width = null;
  let height = null;
  let xAxis = null;
  let yAxis = null;
  let line = null;
  let lineShape = null;

  useEffect(() => {
    init(data);
  }, [])

  const init = data => {
    const wrapper = select("#linechart");
    width = wrapper.node().clientWidth;
    height = wrapper.node().clientHeight;
    
    svg = wrapper
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const today = new Date()
    const priorDate = new Date().setDate(today.getDate()-30)

    // const scaleTime = d3ScaleTime()
    //   .domain([today, priorDate]) // @TODO: check the hours of the day
    //   .range([0, width - margin.left - margin.right]);
    // setScaleTime(() => scaleTime)

    const scaleTime = scaleLinear()
      .domain([0, 719]) // @TODO: check the hours of the day
      .range([0, width - margin.left - margin.right]);
    setScaleTime(() => scaleTime)

    const scaleRain = scaleLinear()
      .domain([0, 20]) // @TODO: check the hours of the day
      .range([height - margin.top - margin.bottom, 0]);
    setScaleRain(() => scaleRain)

    yAxis = axisLeft(scaleRain);
    xAxis = axisBottom(scaleTime);

// y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    // x-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis);

    line = d3Line()
      .x((d,i) => {console.log(scaleTime(i)); return scaleTime(i)})
      .y((d,i) => {console.log(scaleRain(d)); return scaleRain(d)})

    lineShape = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      // .attr('id', `-pathShape-${index}`)
      .attr("stroke", 'black')
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line)

  }

  return (
    <LineChartWrapper id="linechart">
    </LineChartWrapper>
  )
}

export default Linechart;