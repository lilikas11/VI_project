import React from "react";
import Menu from "../components/Menu";
import FlipCard from "../components/FlipCard"; 

function Info() {
  const services = [
    {
      name: "Vinho Licoroso com DOP",
      description: "A fortified wine with Denomination of Origin Protected (DOP), offering rich, sweet flavors and regional authenticity.",
      imageUrl: "https://img.freepik.com/free-photo/vertical-shot-person-holding-glass-wine-vineyard-sunlight_181624-31406.jpg?t=st=1732481963~exp=1732485563~hmac=387e5e0d109f5fa797c5d9bcaa722b57ab08d4b72432da167627eca595bf6ff1&w=740"
    },
    {
      name: "Vinho com DOP",
      description: "A wine with Denomination of Origin Protected (DOP), ensuring quality and authenticity from a specific region, with strict production standards.",
      imageUrl: "https://img.freepik.com/free-photo/selective-vertical-closeup-shot-female-holding-wine-glass-filled-with-dark-red-wine_181624-2017.jpg?t=st=1732482029~exp=1732485629~hmac=25ba53d7a6356a537a8e19b17f274028cf82f694252a14717f76d93fa45979ab&w=740"
    },
    {
      name: "Vinho com IGP",
      description: "A wine with Protected Geographical Indication (IGP), representing regional uniqueness and production methods that are protected by geographical boundaries.",
      imageUrl: "https://img.freepik.com/free-photo/young-hipster-company-friends-sitting-city-street-cafe_285396-3320.jpg?t=st=1732482223~exp=1732485823~hmac=aa40b7b113e1d13026259e5e05cb969df22456655e7eea5d071d69054ca16d06&w=1380"
    },
    {
      name: "Vinho com Indicação de Casta",
      description: "A wine made from a specific variety of grape, offering distinctive flavors and characteristics inherent to the grape variety used.",
      imageUrl: "https://img.freepik.com/free-photo/vertical-shot-bartender-pouring-wine-glass_181624-3187.jpg?t=st=1732482308~exp=1732485908~hmac=9664af68d2aabe8ab001d0db6276cb27bda5668f276323cf10af527f22120095&w=740"
    },
    {
      name: "Vinho sem Certificação",
      description: "A wine without any specific certification, often produced without official recognition or quality standards, allowing for a wider variety of production methods.",
      imageUrl: "https://img.freepik.com/free-photo/bartender-holding-glass-red-wine_107420-65841.jpg?t=st=1732482342~exp=1732485942~hmac=666de2f78a7fb1ec62fc1077be4a24f30c839a6d467b6632dad9879fc910e4c1&w=1380"
    }    
  ];

  return (
    <div className="min-h-screen bg-ghost-white flex">
      {/* Menu */}
      <div className="w-1/5 h-full fixed top-0 left-0 z-10">
        <Menu />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-col flex-1 ml-[20%] m-4">
        <div className="card bg-gradient-to-r from-lightgreen to-lightblue shadow-xl rounded-md h-1/5 flex items-center justify-center">
          <h2 className="text-3xl font-semibold text-center mb-6">
            You are not sure what each acronym means? Let us help you!
          </h2>
        </div>

        {/* Grid de FlipCards */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {/* 1ª Linha com 4 cards */}
          {services.slice(0, 4).map((service) => (
            <FlipCard
              key={service.name}
              name={service.name}
              description={service.description}
              imageUrl={service.imageUrl}
            />
          ))}
          
          {/* Card Vazio para Centralizar o 5º Card */}
          <div className="col-span-1"></div>

          {/* 5º Card */}
          <div className="col-start-2 col-span-2 flex justify-center">
            <FlipCard
              name={services[4].name}
              description={services[4].description}
              imageUrl={services[4].imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
