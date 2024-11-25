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
      {/* Menu lateral */}
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 ml-[20%] p-4">
        <div className="bg-white shadow-md rounded-xl p-6">
          {/* Título */}
          <h2 className="text-3xl font-semibold text-green-800 mb-6">
            Wine Type and Quantity Variation on a Map
          </h2>

          {/* Conteúdo principal em linha */}
          <div className="flex gap-8">
            {/* Coluna esquerda: Cards de informação e filtros */}
            <div className="w-1/3 space-y-8">
              {/* Card descritivo */}
              <div className="bg-gray-50 shadow-xl shadow-custom-green rounded-lg p-6">
                <h3 className="text-xl text-darkgreen font-bold text-green-800 mb-2">
                  What can you find here?
                </h3>
                <p className="text-lg text-gray-700">
                  This map visualization shows the variation in wine types and
                  quantities across different regions, highlighting the distribution
                  patterns of wine production and type.
                </p>
              </div>

              {/* Card dos seletores */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h4 className="text-xl font-bold text-darkgreen mb-4">
                  Filter your search
                </h4>

                {/* Filtro de cor */}
                <div className="mb-4">
                  <label
                    htmlFor="color-select"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Cor:
                  </label>
                  <select
                    id="color-select"
                    className="p-2 border border-darkgreen rounded w-full"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="Total">Total</option>
                    <option value="Verde">Verde</option>
                    <option value="Tinto">Tinto</option>
                  </select>
                </div>

                {/* Filtro de qualidade */}
                <div>
                  <label
                    htmlFor="quality-select"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Qualidade:
                  </label>
                  <select
                    id="quality-select"
                    className="p-2 border border-darkgreen rounded w-full"
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
            </div>
              <div className="flex justify-center items-center bg-white rounded-lg -mt-16 ml-48 h-screen w-1/3">
                <WineMap
                  data={wineData}
                  selectedColor={selectedColor}
                  selectedQuality={selectedQuality}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics4;
