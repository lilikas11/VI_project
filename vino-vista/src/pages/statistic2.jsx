import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import WineScatterPlot from "../graphs/WineScatterPlot";

function Statistics2() {
  const [wineData, setWineData] = useState(null);

  useEffect(() => {
    // Fetch the data
    fetch("DataSet_wine.json")
      .then((response) => response.json())
      .then((data) => setWineData(data))
      .catch((error) => console.error("Error loading wine data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-ghost-white flex">
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>

      <div className="flex-1 ml-[20%] p-8">
        <div className=" shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">
            Wine Types Quantities Distributions by Region
          </h2>
          <div className="bg-gray-50 shadow-md w-1/3 rounded-lg p-4 mb-8">
            <h3 className="text-xl text-darkgreen font-bold text-green-800 mb-2">
              What can you find here?
            </h3>
            <p className="text-lg text-gray-700">
              This graph displays the distribution of wine quantities by type in
              different regions, highlighting the performance of each wine type
              across various regions.
            </p>
          </div>
          <div className="w-full h-[600px]">
            {wineData ? (
              <WineScatterPlot data={wineData} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading data...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics2;
