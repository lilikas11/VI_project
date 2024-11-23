import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import SunburstChart from "../graphs/SunburstChart";

function Statistics3() {
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
            Wine Types Quantity Percentage for Region
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8">
            This graph illustrates the percentage distribution of different wine types within each region, showcasing
            the relative share of each type of wine produced.
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
          
          <div className="w-full h-[600px]">
            {wineData && selectedRegion ? (
              <SunburstChart data={wineData[selectedRegion]} />
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

export default Statistics3;
