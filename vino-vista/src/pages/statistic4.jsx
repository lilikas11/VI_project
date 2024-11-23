import { useEffect, useRef } from "react";
import Menu from "../components/Menu";

function Statistics4() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Your D3.js chart logic for Statistics4 can go here
  }, []);

  return (
    <div className="min-h-screen bg-ghost-white flex">
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>
      <div className="flex-1 ml-[20%] p-8"> 
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
            Wine Type and Quantity Variation on a Map
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8">
            This map visualization shows the variation in wine types and quantities across different regions, highlighting
            the distribution patterns of wine production and type.
          </p>
          <div className="flex justify-center">
            <svg ref={svgRef} width="800" height="500"></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics4;
