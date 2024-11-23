import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const WineBarChart = ({ data }) => {
  const svgRef = useRef(null);
  const [selectedQuality, setSelectedQuality] = useState('Total');
  const [selectedColor, setSelectedColor] = useState('Total');
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  const margin = { top: 50, right: 50, bottom: 150, left: 100 };
  const width = 800;
  const height = 600;

  const colorScale = d3.scaleOrdinal()
    .domain(["Total", "Tinto", "Verde"])
    .range(["#4f8fa0", "#600010", "#007100"]);

  useEffect(() => {
    if (!data) return;

    const processedData = { ...data };
    delete processedData.Portugal;
    delete processedData.Continente;

    const chartData = Object.entries(processedData).map(([region, qualities]) => {
      const value = qualities[selectedQuality] && qualities[selectedQuality][selectedColor]
        ? +qualities[selectedQuality][selectedColor]
        : 0;
      return {
        region: region,
        value: isNaN(value) ? 0 : value,
      };
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3.scaleBand()
      .domain(Object.keys(processedData))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.value) || 5000])
      .range([height - margin.bottom, margin.top]);

    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "14px");

    // Add Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add bars
    svg.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.region))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom - y(d.value))
      .attr("fill", colorScale(selectedColor))
      .style("opacity", 0.8)
      .style("cursor", "pointer")
      .on("mouseenter", (event, d) => {
        setTooltip({
          show: true,
          content: `${d.region}: ${d.value}`,
          x: event.pageX,
          y: event.pageY
        });
      })
      .on("mouseleave", () => {
        setTooltip({ ...tooltip, show: false });
      });
  }, [data, selectedQuality, selectedColor]);

  return (
    <div className="w-full h-full">
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="quality-select" className="text-gray-700">Quality:</label>
          <select
            id="quality-select"
            className="border rounded p-2"
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
          >
            <option value="Total">Total</option>
            <option value="Vinho licoroso com DOP">Vinho licoroso com DOP</option>
            <option value="Vinho com DOP">Vinho com DOP</option>
            <option value="Vinho com IGP">Vinho com IGP</option>
            <option value="Vinho com indicação de casta">Vinho com indicação de casta</option>
            <option value="Vinho sem certificação">Vinho sem certificação</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="color-select" className="text-gray-700">Color:</label>
          <select
            id="color-select"
            className="border rounded p-2"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="Total">Total</option>
            <option value="Tinto">Red</option>
            <option value="Verde">White</option>
          </select>
        </div>
      </div>

      <div className="relative flex justify-center">
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
              left: tooltip.x + 10,
              top: tooltip.y - 20,
              transform: 'translateY(-100%)'
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default WineBarChart;