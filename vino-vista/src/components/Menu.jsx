import { useState } from "react";
import grape from "../assets/grape.png";
import { Link } from "react-router-dom";
import "@flaticon/flaticon-uicons/css/all/all.css";

function Menu() {
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);

  const toggleStatistics = () => {
    setIsStatisticsOpen(!isStatisticsOpen);
  };

  return (
    <div className="h-full bg-lightgreen p-5 shadow-md rounded-md m-4">
      <ul className="space-y-6 ml-4">
        <li className="flex items-center font-bold text-3xl mt-4">
          <img src={grape} className="w-10 h-10 mr-2" alt="Grape Icon" />
          VinoVista
        </li>
        <div className="divider"></div>
        <li className="text-lg font-bold flex items-center hover:text-green-700">
          <i className="fi fi-rr-home mr-3 text-xl"></i>
          <Link to="/" className="flex-1">Home</Link>
        </li>
        <li className="text-lg font-bold">
          <button
            onClick={toggleStatistics}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <span className="flex items-center">
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
                    Statistics 1
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-2" className="hover:underline">
                    Statistics 2
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-3" className="hover:underline">
                    Statistics 3
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-4" className="hover:underline">
                    Statistics 4
                  </Link>
                </li>
                <li>
                  <Link to="/statistics-5" className="hover:underline">
                    Statistics 5
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className="text-lg font-bold flex items-center hover:text-green-700">
          <i className="fi fi-rr-info mr-3 text-xl"></i>
          <Link to="/about" className="flex-1">About Us</Link>
        </li>
        <li className="text-lg font-bold flex items-center hover:text-green-700">
          <i className="fi fi-rr-envelope mr-3 text-xl"></i>
          <Link to="/contacts" className="flex-1">Contacts</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

