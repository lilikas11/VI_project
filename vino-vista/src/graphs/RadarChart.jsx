import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Process data
    const prepareRadarData = (regionData) => ({
      Tinto: qualities.map(quality => +regionData[quality]?.Tinto || 0),
      Verde: qualities.map(quality => +regionData[quality]?.Verde || 0),
    });

    const radarData = prepareRadarData(data);

    // Scales
    const maxValue = Math.max(...radarData.Tinto, ...radarData.Verde);
    const scale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);

    const angleSlice = (2 * Math.PI) / qualities.length;

    // Draw radial grid
    const gridLevels = 5;
    for (let i = 0; i <= gridLevels; i++) {
      const level = (radius / gridLevels) * i;

      svg.append("circle")
        .attr("cx", center.x)
        .attr("cy", center.y)
        .attr("r", level)
        .style("fill", "none")
        .style("stroke", "lightgray")
        .style("stroke-dasharray", "2,2")
        .style("stroke-width", 0.5);

      // Add level labels
      if (i > 0) {
        const value = Math.round((maxValue / gridLevels) * i);
        svg.append("text")
          .attr("x", center.x)
          .attr("y", center.y - level)
          .attr("dy", "-0.3em")
          .style("font-size", "10px")
          .style("text-anchor", "middle")
          .text(value);
      }
    }

    // Add axes and labels
    qualities.forEach((quality, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x2 = center.x + Math.cos(angle) * radius;
      const y2 = center.y + Math.sin(angle) * radius;

      // Axis lines
      svg.append("line")
        .attr("x1", center.x)
        .attr("y1", center.y)
        .attr("x2", x2)
        .attr("y2", y2)
        .style("stroke", "gray")
        .style("stroke-width", 0.5);

      // Labels with padding
      const padding = 20;
      const labelX = center.x + Math.cos(angle) * (radius + padding);
      const labelY = center.y + Math.sin(angle) * (radius + padding);

      svg.append("text")
        .attr("x", labelX)
        .attr("y", labelY)
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")
        .text(quality);
    });

    // Calculate radar points
    const calculatePoints = (data) => {
      return data.map((value, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const r = scale(value);
        return [
          center.x + Math.cos(angle) * r,
          center.y + Math.sin(angle) * r,
        ];
      });
    };

    // Draw radar areas
    const tintoPoints = calculatePoints(radarData.Tinto);
    const verdePoints = calculatePoints(radarData.Verde);

    // Add tooltips
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid #ddd")
      .style("border-radius", "5px");

    // Draw "Tinto" area
    svg.append("polygon")
      .attr("points", tintoPoints.map(d => d.join(",")).join(" "))
      .style("fill", "red")
      .style("fill-opacity", 0.3)
      .style("stroke", "red")
      .style("stroke-width", 2)
      .on("mouseover", (event) => {
        tooltip
          .style("visibility", "visible")
          .html("Vinho Tinto")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Draw "Verde" area
    svg.append("polygon")
      .attr("points", verdePoints.map(d => d.join(",")).join(" "))
      .style("fill", "green")
      .style("fill-opacity", 0.3)
      .style("stroke", "green")
      .style("stroke-width", 2)
      .on("mouseover", (event) => {
        tooltip
          .style("visibility", "visible")
          .html("Vinho Verde")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Cleanup function
    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default RadarChart;