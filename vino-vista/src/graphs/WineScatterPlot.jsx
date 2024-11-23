import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const WineScatterPlot = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [visibleTypes, setVisibleTypes] = useState({
    "Tinto Total": true,
    "Verde Total": true
  });

  useEffect(() => {
    if (!data) {
      console.log("No data provided to WineScatterPlot");
      return;
    }

    // Clean up previous rendering
    d3.select(svgRef.current).selectAll("*").remove();

    // SVG setup
    const svg = d3.select(svgRef.current);
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;
    const margin = { top: 50, right: 250, bottom: 100, left: 100 }; // Increased right margin for legend

    // Remove Portugal and Continente from data
    const filteredData = { ...data };
    delete filteredData["Portugal"];
    delete filteredData["Continente"];

    // Scales
    const x = d3.scalePoint()
      .domain(Object.keys(filteredData))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(Object.keys(filteredData).flatMap(location =>
        Object.values(filteredData[location]).flatMap(type => [+type.Verde, +type.Tinto])
      ))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Color scale
    const typeNames = [
      "Tinto Total", "Tinto Vinho licoroso com DOP", "Tinto Vinho com DOP",
      "Tinto Vinho com IGP", "Tinto Vinho com indicação de casta",
      "Tinto Vinho sem certificação", "Verde Total", "Verde Vinho licoroso com DOP",
      "Verde Vinho com DOP", "Verde Vinho com IGP", "Verde Vinho com indicação de casta",
      "Verde Vinho sem certificação"
    ];

    const color = d3.scaleOrdinal()
      .domain(typeNames)
      .range([
        "#600010", "#B00B1B", "#EA0D2D", "#FF4F4E", "#FF7A7A", "#FFA5A5",
        "#007100", "#279C1F", "#41C32A", "#8AE46A", "#BFF1A0", "#DFF1C0"
      ]);

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add labels
    svg.append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .text("Wine Regions");

    svg.append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", margin.left - 60)
      .text("Quantidade de Vinho");

    // Prepare data for plotting
    const plotData = [];
    for (const location in filteredData) {
      for (const type in filteredData[location]) {
        plotData.push({
          location: location,
          type: `Tinto ${type}`,
          value: +filteredData[location][type]["Tinto"]
        });
        plotData.push({
          location: location,
          type: `Verde ${type}`,
          value: +filteredData[location][type]["Verde"]
        });
      }
    }

    // Add points
    const points = svg.selectAll("circle")
      .data(plotData)
      .join("circle")
      .attr("cx", d => x(d.location))
      .attr("cy", d => y(d.value))
      .attr("r", 7)
      .attr("fill", d => color(d.type))
      .attr("class", d => `circle-${d.type.replace(/\s+/g, "-")}`)
      .style("display", d => visibleTypes[d.type] ? null : "none")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.location} - ${d.type}:</strong><br>${d.value.toFixed(1)}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", () => {
        d3.select(tooltipRef.current).style("opacity", 0);
      });

    // Add grid
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickSize(-width + margin.left + margin.right)
        .tickFormat(""));

    // Add legend with checkboxes
    const legendContainer = svg.append("foreignObject")
      .attr("x", width - margin.right + 20)
      .attr("y", margin.top)
      .attr("width", margin.right - 30)
      .attr("height", height - margin.top - margin.bottom);

    const legendDiv = legendContainer.append("xhtml:div")
      .style("max-height", "100%")
      .style("overflow-y", "auto");

    typeNames.forEach((type, i) => {
      const legendItem = legendDiv.append("div")
        .style("margin-bottom", "8px")
        .style("display", "flex")
        .style("align-items", "center");

      legendItem.append("input")
        .attr("type", "checkbox")
        .attr("id", `checkbox-${type.replace(/\s+/g, "-")}`)
        .property("checked", visibleTypes[type] || false)
        .on("change", function() {
          const checked = this.checked;
          setVisibleTypes(prev => ({ ...prev, [type]: checked }));
          svg.selectAll(`.circle-${type.replace(/\s+/g, "-")}`)
            .style("display", checked ? null : "none");
        });

      const label = legendItem.append("label")
        .attr("for", `checkbox-${type.replace(/\s+/g, "-")}`)
        .style("margin-left", "8px")
        .style("display", "flex")
        .style("align-items", "center")
        .style("cursor", "pointer");

      label.append("span")
        .style("display", "inline-block")
        .style("width", "15px")
        .style("height", "15px")
        .style("background-color", color(type))
        .style("margin-right", "8px");

      label.append("span")
        .text(type)
        .style("font-size", "12px");
    });

  }, [data, visibleTypes]);

  return (
    <div className="relative w-full h-full">
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        className="overflow-visible"
      />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none bg-white px-2 py-1 rounded shadow-lg opacity-0 transition-opacity"
        style={{
          border: '1px solid #ddd',
          fontSize: '12px'
        }}
      />
    </div>
  );
};

export default WineScatterPlot;