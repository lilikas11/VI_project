import { useEffect, useRef } from "react";
import * as d3 from "d3";

const RadarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Constants
    const width = 800;
    const height = 800;
    const radius = Math.min(width, height) / 2 - 100;
    const center = { x: width / 2, y: height / 2 };
    const qualities = [
      "Vinho licoroso com DOP",
      "Vinho com DOP",
      "Vinho com IGP",
      "Vinho sem certificação",
      "Vinho com indicação de casta",
    ];

    // Select the SVG element and ensure it has the proper size
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Process data
    const prepareRadarData = (regionData) => ({
      Tinto: qualities.map((quality) => +regionData[quality]?.Tinto || 0),
      Verde: qualities.map((quality) => +regionData[quality]?.Verde || 0),
    });

    const radarData = prepareRadarData(data);

    // Scales
    const maxValue = Math.max(...radarData.Tinto, ...radarData.Verde);
    const scale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);

    const angleSlice = (2 * Math.PI) / qualities.length;

    // Calculate radar points
    const calculatePoints = (data) =>
      data.map((value, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const r = scale(value);
        return [
          center.x + Math.cos(angle) * r,
          center.y + Math.sin(angle) * r,
        ];
      });

    const tintoPoints = calculatePoints(radarData.Tinto);
    const verdePoints = calculatePoints(radarData.Verde);

    // Update or create radial grid
    const gridLevels = 5;
    const grid = svg.selectAll(".grid").data([null]);
    grid.enter()
      .append("g")
      .attr("class", "grid")
      .merge(grid)
      .selectAll("circle")
      .data(d3.range(1, gridLevels + 1))
      .join("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", (d) => (radius / gridLevels) * d)
      .style("fill", "none")
      .style("stroke", "lightgray")
      .style("stroke-dasharray", "2,2")
      .style("stroke-width", 0.5);

    // Add/update level labels
    const labels = svg.selectAll(".level-label").data(d3.range(1, gridLevels + 1));
    labels
      .enter()
      .append("text")
      .attr("class", "level-label")
      .merge(labels)
      .attr("x", center.x)
      .attr("y", (d) => center.y - (radius / gridLevels) * d)
      .attr("dy", "-0.3em")
      .style("font-size", "10px")
      .style("text-anchor", "middle")
      .text((d) => Math.round((maxValue / gridLevels) * d));

    // Update or create axes and labels
    const axes = svg.selectAll(".axis").data(qualities);
    axes
      .enter()
      .append("line")
      .attr("class", "axis")
      .merge(axes)
      .attr("x1", center.x)
      .attr("y1", center.y)
      .attr("x2", (_, i) => center.x + Math.cos(angleSlice * i - Math.PI / 2) * radius)
      .attr("y2", (_, i) => center.y + Math.sin(angleSlice * i - Math.PI / 2) * radius)
      .style("stroke", "gray")
      .style("stroke-width", 0.5);

    const axisLabels = svg.selectAll(".axis-label").data(qualities);
    axisLabels
      .enter()
      .append("text")
      .attr("class", "axis-label")
      .merge(axisLabels)
      .attr("x", (_, i) => center.x + Math.cos(angleSlice * i - Math.PI / 2) * (radius + 20))
      .attr("y", (_, i) => center.y + Math.sin(angleSlice * i - Math.PI / 2) * (radius + 20))
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .text((d) => d);

    // Function to update radar areas with transitions
    const updateArea = (className, points, color) => {
      const area = svg.selectAll(`.${className}`).data([points]);
      area
        .enter()
        .append("polygon")
        .attr("class", className)
        .merge(area)
        .transition()
        .duration(750)
        .attr("points", (d) => d.map((p) => p.join(",")).join(" "))
        .style("fill", color)
        .style("fill-opacity", 0.3)
        .style("stroke", color)
        .style("stroke-width", 2);
    };

    // Update "Tinto" area
    updateArea("tinto-area", tintoPoints, "red");

    // Update "Verde" area
    updateArea("verde-area", verdePoints, "green");
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default RadarChart;
