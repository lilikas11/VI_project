import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import WineBarChart from "../graphs/WineBarChart";

function Statistics1() {
  const [wineData, setWineData] = useState(null);

  useEffect(() => {
    fetch('DataSet_wine.json')
      .then(response => response.json())
      .then(data => setWineData(data))
      .catch(error => console.error('Error loading wine data:', error));
  }, []);

  return (
    <div className="min-h-screen bg-ghost-white flex">
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>

      <div className="flex-1 ml-[20%] p-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
            Regional Wine Quantity Distribution by Type
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8">
            This graph represents the regional distribution of wines by type, including Red, White, and Rose wines.
            The data visualizes how each region performs with its wine production.
          </p>
          <div className="w-full h-[600px]">
            {wineData ? (
              <WineBarChart data={wineData} />
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

export default Statistics1;