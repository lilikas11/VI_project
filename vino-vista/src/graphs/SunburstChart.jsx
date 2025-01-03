import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const prepareSunburstData = (regionData) => ({
      name: "Vinhos",
      children: [
        {
          name: "Branco",
          children: Object.entries(regionData)
            .filter(([quality]) => quality !== "Total")
            .map(([quality, values]) => ({
              name: quality,
              value: +values["Verde"] || 0,
            })),
        },
        {
          name: "Tinto",
          children: Object.entries(regionData)
            .filter(([quality]) => quality !== "Total")
            .map(([quality, values]) => ({
              name: quality,
              value: +values["Tinto"] || 0,
            })),
        },
      ],
    });

    const width = 928;
    const height = width;
    const radius = width / 6;

    const color = d3.scaleOrdinal()
      .domain(["Tinto", "Branco"])
      .range(["#600010", "#007100"]);

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, width])
      .style("font", "11px sans-serif");

    const hierarchy = d3.hierarchy(prepareSunburstData(data))
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const root = d3.partition()
      .size([2 * Math.PI, hierarchy.height + 1])(hierarchy);

    root.each(d => d.current = d);

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius(d => d.y0 * radius)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

    // Center text
    const centerText = svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-size", "15px")
      .style("font-weight", "bold")
      .text("Click on the wine color to see more");

    const path = svg.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
      .attr("d", d => arc(d.current));

    // Add hover tooltip
    path.on("mouseover", function(event, d) {
      const percentage = ((d.value / root.value) * 100).toFixed(2);
      d3.select("body").selectAll(".tooltip").data([d]).join("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 20}px`)
        .html(`<strong>${d.data.name}:</strong> ${d.value} (${percentage}%)`);
    })
    .on("mouseout", () => d3.selectAll(".tooltip").remove());

    // Add click handling
    path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    const label = svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => d.data.name);

    const parent = svg.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(event, p) {
      if (p.depth === 1) {
        centerText.text("Click here to go back");
      } else {
        centerText.text("Click on the wine color to see more");
      }

      parent.datum(p.parent || root);

      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth),
      });

      const t = svg.transition().duration(750);

      path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")
        .attrTween("d", d => () => arc(d.current));

      label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default SunburstChart;