import { useEffect, useRef } from "react";
import Menu from "../components/Menu";

function Statistics5() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Your D3.js chart logic for Statistics5 can go here
  }, []);

  return (
    <div className="min-h-screen bg-ghost-white flex">
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>

      <div className="flex-1 ml-[20%] p-8"> 
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
            Difference Between Both Wine Types
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8">
            This graph compares the differences between the two primary wine types, providing a detailed comparison of their
            characteristics, production, and regional variations.
          </p>
          <div className="flex justify-center">
            <svg ref={svgRef} width="800" height="500"></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics5;
