import React from "react";

const FlipCard = ({ name, imageUrl, description }) => {
  return (
    <div className="group h-80 w-80 [perspective:1000px] mb-6">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
          {imageUrl && (
            <div className="relative h-full w-full">
              <img
                className="object-cover cursor-pointer object-left h-full w-full rounded-xl"
                src={imageUrl}
                alt={name}
                width={320}
                height={320}
              />
            </div>
          )}

          {/* Blur Section for Title */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-overlay backdrop-blur-sm rounded-xl">
            <p className="text-3xl text-center text-white font-bold">{name}</p>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <p className="text-lg text-pretty text-center mb-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
