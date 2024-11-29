import React from 'react';
import Menu from "../components/Menu";
import lia from "../assets/lia.png";
import liliana from "../assets/liliana.png";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-ghost-white">
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>

      <div className="max-w-8xl mx-8 px-4 pt-4 pl-[20%]">
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                Discover the world of wine through data and insights
              </h1>
              
              <p className="text-gray-600 text-lg">
                In an ever-evolving wine industry, understanding production trends and market dynamics is crucial. We provide comprehensive analytics and insights about global wine production, helping you make informed decisions.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Producers</h3>
                  <p className="text-gray-600">Access detailed statistics about production volumes, grape varieties, and harvest data across different regions.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Market Analysis</h3>
                  <p className="text-gray-600">Track market trends, consumption patterns, and export-import dynamics in the global wine trade.</p>
                </div>

              </div>

              <button className="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-900 transition-colors">
                Explore Wine Data
              </button>
            </div>

            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                <img 
                  src="https://img.freepik.com/free-photo/beautiful-view-vineyard-green-hills-sunset_181624-29312.jpg?t=st=1732495782~exp=1732499382~hmac=d9e764bf92b1947d2515bc3fd8ddc3ed7be1f4836a6b0a818debe0d736d95931&w=1380"
                  alt="Vineyard statistics visualization"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-800">11</h3>
                <p className="text-gray-600">Regions Tracked</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-800">2</h3>
                <p className="text-gray-600">Colors of Wine</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-2xl font-bold text-purple-800">5</h3>
                <p className="text-gray-600">Wine Qualities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Creators Card Section - Merged into a Single Row */}
        <div className="mt-4 bg-white shadow-lg rounded-lg p-4 max-h-[200px] overflow-hidden mb-5"> {/* Added mb-5 here for the bottom margin */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Meet the Creators</h2>
          <div className="flex items-center justify-evenly space-x-6">
            {/* First Creator: Lia Cardoso */}
            <div className="flex items-center space-x-4">
              <img
                src={lia} 
                alt="Lia Cardoso"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Lia Cardoso</h3>
                <p className="text-gray-600">Masters in Informatics Engineering</p>
              </div>
            </div>

            {/* Second Creator: Liliana Ribeiro */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-900">Liliana Ribeiro</h3>
                <p className="text-gray-600">Masters in Informatics Engineering</p>
              </div>
              <img
                src={liliana} 
                alt="Liliana Ribeiro"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
