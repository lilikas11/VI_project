import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const WineBarChart = ({ data }) => {
  const svgRef = useRef(null);
  const [selectedQuality, setSelectedQuality] = useState("Total");
  const [selectedColor, setSelectedColor] = useState("Total");
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    x: 0,
    y: 0,
  });

  const margin = { top: 50, right: 50, bottom: 150, left: 100 };
  const width = 800;
  const height = 600;

  const colorScale = d3
    .scaleOrdinal()
    .domain(["Total", "Tinto", "Verde"])
    .range(["#4f8fa0", "#600010", "#007100"]);

  useEffect(() => {
    if (!data) return;

    const processedData = { ...data };
    delete processedData.Portugal;
    delete processedData.Continente;

    const chartData = Object.entries(processedData).map(
      ([region, qualities]) => {
        const value =
          qualities[selectedQuality] &&
          qualities[selectedQuality][selectedColor]
            ? +qualities[selectedQuality][selectedColor]
            : 0;
        return {
          region: region,
          value: isNaN(value) ? 0 : value,
        };
      }
    );

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(Object.keys(processedData))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value) || 5000])
      .range([height - margin.bottom, margin.top]);

    // X axis with transition and labels with white background
    const xAxis = d3.axisBottom(x);
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .transition()
      .duration(750)
      .call(xAxis);

    // Apply background to X-axis labels
    svg
      .selectAll(".tick text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "14px")
      .style("fill", "black")
      .each(function () {
        const textNode = d3.select(this);
        const bbox = this.getBBox();
        textNode
          .insert("rect", ":first-child")
          .attr("x", bbox.x - 2)
          .attr("y", bbox.y - 2)
          .attr("width", bbox.width + 4)
          .attr("height", bbox.height + 4)
          .attr("fill", "white")
          .attr("stroke", "none");
      });

    // Y axis with transition and labels with white background
    const yAxis = d3.axisLeft(y);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .transition()
      .duration(750)
      .call(yAxis);

    // Apply background to Y-axis labels
    svg
      .selectAll(".tick text")
      .style("font-size", "14px")
      .style("fill", "black")
      .each(function () {
        const textNode = d3.select(this);
        const bbox = this.getBBox();
        textNode
          .insert("rect", ":first-child")
          .attr("x", bbox.x - 2)
          .attr("y", bbox.y - 2)
          .attr("width", bbox.width + 4)
          .attr("height", bbox.height + 4)
          .attr("fill", "white")
          .attr("stroke", "none");
      });

    // Add or update bars
    const bars = svg.selectAll(".bar").data(chartData);

    // Enter new bars
    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.region))
      .attr("y", height - margin.bottom) // Start bars at bottom
      .attr("width", x.bandwidth())
      .attr("height", 0) // Start bars with height 0
      .attr("fill", colorScale(selectedColor))
      .merge(bars) // Merge new and existing bars for transition
      .transition() // Add transition
      .duration(750)
      .attr("y", (d) => y(d.value)) // Smoothly move to new height
      .attr("height", (d) => height - margin.bottom - y(d.value)) // Smoothly adjust height
      .attr("fill", colorScale(selectedColor)) // Smoothly adjust color
      .style("opacity", 0.8)
      .style("cursor", "pointer");

    // Remove old bars
    bars.exit().remove();

    // Tooltip handlers
    svg
      .selectAll(".bar")
      .on("mouseenter", (event, d) => {
        setTooltip({
          show: true,
          content: `${d.region}: ${d.value}`,
          x: event.clientX,
          y: event.clientY,
        });
      })
      .on("mouseleave", () => {
        setTooltip({ ...tooltip, show: false });
      });
  }, [data, selectedQuality, selectedColor]);

  return (
    <div className="w-full h-full flex flex-row">
      <div className="relative flex">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="max-w-full"
        />
        {tooltip.show && (
          <div
            className="absolute bg-white border border-gray-200 p-2 rounded shadow-lg pointer-events-none"
            style={{
              left: `${tooltip.x - 400}px`,
              top: `${tooltip.y - 400}px`,
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
      <div className="w-1/4 p-4">
        <div className="bg-white rounded shadow-xl p-4">
          <h2 className="text-lg font-bold mb-4 text-darkgreen">Filters</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="quality-select" className="text-gray-700">
                Quality:
              </label>
              <select
                id="quality-select"
                className="border border-darkgreen rounded p-2 w-full"
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
              >
                <option value="Total">Total</option>
                <option value="Vinho licoroso com DOP">
                  Vinho licoroso com DOP
                </option>
                <option value="Vinho com DOP">Vinho com DOP</option>
                <option value="Vinho com IGP">Vinho com IGP</option>
                <option value="Vinho com indicação de casta">
                  Vinho com indicação de casta
                </option>
                <option value="Vinho sem certificação">
                  Vinho sem certificação
                </option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="color-select" className="text-gray-700">
                Color:
              </label>
              <select
                id="color-select"
                className="border border-darkgreen rounded p-2 w-full"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="Total">Total</option>
                <option value="Tinto">Red</option>
                <option value="Verde">White</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineBarChart;
