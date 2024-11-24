import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import WineMap from "../graphs/WineMap";

function Statistics4() {
  const [wineData, setWineData] = useState(null);
  const [selectedColor, setSelectedColor] = useState("Verde");
  const [selectedQuality, setSelectedQuality] = useState("Total");

  useEffect(() => {
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
      <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">
            Wine Type and Quantity Variation on a Map
          </h2>
          <div className="bg-gray-50 shadow-xl shadow-custom-green w-1/3 rounded-lg p-4 mb-8">
            <h3 className="text-xl text-darkgreen font-bold text-green-800 mb-2">
              What can you find here?
            </h3>
            <p className="text-lg text-gray-700">
              This map visualization shows the variation in wine types and
              quantities across different regions, highlighting the distribution
              patterns of wine production and type.
            </p>
          </div>
          {wineData ? (
            <div>
              <div className="flex space-x-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Cor:
                  </label>
                  <select
                    className="p-2 border rounded"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="Total">Total</option>
                    <option value="Verde">Verde</option>
                    <option value="Tinto">Tinto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Qualidade:
                  </label>
                  <select
                    className="p-2 border rounded"
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                  >
                    <option value="Total">Total</option>
                    <option value="Vinho licoroso com DOP">
                      Vinho licoroso com DOP
                    </option>
                    <option value="Vinho com DOP">Vinho com DOP</option>
                    <option value="Vinho com IGP">Vinho com IGP</option>
                    <option value="Vinho com indicação de casta">
                      Vinho com indicação de casta
                    </option>
                    <option value="Vinho sem certificação">
                      Vinho sem certificação
                    </option>
                  </select>
                </div>
              </div>

              {/* Legenda */}
              <div id="legend" className="mb-6"></div>

              <div className="w-1/3 mx-auto">

              <WineMap
                data={wineData}
                selectedColor={selectedColor}
                selectedQuality={selectedQuality}
              />
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Carregando dados...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics4;
