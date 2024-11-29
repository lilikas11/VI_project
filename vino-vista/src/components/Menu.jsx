import { useState, useEffect } from "react";
import grape from "../assets/grape.png";
import { Link, useLocation } from "react-router-dom";
import "@flaticon/flaticon-uicons/css/all/all.css";

function Menu() {
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const location = useLocation();

  const toggleStatistics = () => {
    setIsStatisticsOpen(!isStatisticsOpen);
  };

  useEffect(() => {
    // Verifica se a URL atual corresponde a uma das páginas do dropdown Statistics
    const isStatisticsPage = location.pathname.startsWith("/statistics");
    if (isStatisticsPage) {
      setIsStatisticsOpen(true);
    } else {
      setIsStatisticsOpen(false);
    }
  }, [location]); // Esse efeito será executado sempre que o caminho da URL mudar

  return (
    <div className="h-full bg-lightgreen p-5 shadow-md rounded-md m-4">
      <ul className="space-y-6 ml-4">
        <li className="flex items-center font-bold text-3xl mt-4">
          <img src={grape} className="w-10 h-10 mr-2" alt="Grape Icon" />
          Vino&Vista
        </li>
        <div className="divider"></div>
        <li className="text-lg font-bold flex items-center hover:text-green-700">
          <i className="fi fi-rr-home mr-3 text-xl"></i>
          <Link to="/" className="flex-1">
            Home
          </Link>
        </li>
        <li className="text-lg">
          <button
            onClick={toggleStatistics}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <span className="flex items-center font-bold">
              <i className="fi fi-rr-stats mr-3 text-xl"></i>
              Statistics
            </span>
            <span
              className={`text-black transform transition-transform duration-200 ${
                isStatisticsOpen ? "rotate-90" : ""
              }`}
            >
              &#x25B8;
            </span>
          </button>
          {isStatisticsOpen && (
            <div className="ml-8 mt-2">
              <ul className="space-y-2">
                <li>
                  <Link to="/statistics-1" className="hover:underline">
                    Regional Wine Quantity Distribution by Type
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-2" className="hover:underline">
                    Wine Types Quantities Distributions by Region
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-3" className="hover:underline">
                    Wine Type Distribution by Region
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-4" className="hover:underline">
                    Wine Type and Quantity Variation on a Map
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-5" className="hover:underline">
                    Difference Between Both Wine Types
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className="text-lg font-bold flex items-center hover:text-green-700">
          <i className="fi fi-rr-search-alt mr-3 text-xl"></i>
          <Link to="/info" className="flex-1">
            Wine Info
          </Link>
        </li>
        <li className="text-lg font-bold flex items-center hover:text-green-700">
          <i className="fi fi-rr-info mr-3 text-xl"></i>
          <Link to="/about" className="flex-1">
            About Us
          </Link>
        </li>
        <li className="text-lg font-bold flex items-center hover:text-green-700">
          <i className="fi fi-rr-envelope mr-3 text-xl"></i>
          <Link to="/contacts" className="flex-1">
            Contacts
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
