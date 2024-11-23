import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import RadarChart from "../graphs/RadarChart";

function Statistics5() {
  const [wineData, setWineData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetch('DataSet_wine.json')
      .then(response => response.json())
      .then(data => {
        setWineData(data);
        setSelectedRegion(Object.keys(data)[0]); // Set first region as default
      })
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
            Difference Between Both Wine Types
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8">
            This graph compares the differences between the two primary wine types, providing a detailed comparison of their
            characteristics, production, and regional variations.
          </p>
          
          {wineData && selectedRegion && (
            <div className="mb-4">
              <select 
                className="w-full p-2 border rounded"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {Object.keys(wineData).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="w-full h-[800px]">
            {wineData && selectedRegion ? (
              <RadarChart data={wineData[selectedRegion]} />
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
export default Statistics5;
