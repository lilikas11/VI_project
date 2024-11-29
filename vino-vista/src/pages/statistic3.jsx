import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import SunburstChart from "../graphs/SunburstChart";

function Statistics3() {
  const [wineData, setWineData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetch("DataSet_wine.json")
      .then((response) => response.json())
      .then((data) => {
        setWineData(data);
        setSelectedRegion(Object.keys(data)[0] || null); // Set first region as default
      })
      .catch((error) => console.error("Error loading wine data:", error));
  }, []);

  // Verifique se wineData está carregado antes de acessar o Object.keys
  const regions = wineData ? Object.keys(wineData) : [];

  return (
    <div className="min-h-screen bg-ghost-white flex">
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>

      <div className="flex-1 ml-[20%] p-8">
        <div className="flex flex-row gap-8">
          {/* Card com título e Select */}
          <div className="flex flex-col w-1/3 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-3xl font-semibold text-green-800 mb-6">
              Wine Type Distribution by Region
            </h2>
            {/* Select dentro de um card */}
            {wineData && selectedRegion && (
              <div className="bg-gray-50 shadow-xl shadow-custom-green w-full h-auto rounded-lg p-4 mb-8">
                <h3 className="text-xl text-darkgreen font-bold text-green-800 mb-2">
                  What can you find here?
                </h3>
                <p className="text-lg text-gray-700">
                  This graph illustrates the percentage distribution of
                  different wine types within each region, showcasing the
                  relative share of each type of wine produced.
                </p>
              </div>
            )}

            <div className="bg-white shadow-md rounded-xl p-4">
              <h2 className="text-xl text-darkgreen font-bold text-green-800 mb-2">Choose a Region</h2>
              <div className="flex items-center mb-4">
                <select
                  className="w-full p-2 border border-darkgreen rounded"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Gráfico ao lado */}
          <div className="flex-grow bg-white shadow-md rounded-xl p-6">
            {wineData && selectedRegion ? (
              <div className="w-full h-[800px]">
                <SunburstChart data={wineData[selectedRegion]} />
              </div>
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
