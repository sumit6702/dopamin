import React from "react";
import { Link } from "react-router-dom";

const Card = ({ gameName, gameImg, gameYear, gameRating, gameKey }) => {
  return (
    <Link to={`/dopamin/game/${gameName}/${gameKey}`}>
      <div className="max-w-[16rem] rounded-md mx-auto cursor-pointer hover:scale-105 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-gray-600 h-full">
        <div className="flex w-full h-72">
          <img
            src={gameImg}
            alt="Img by RockstarGames"
            className="w-full h-auto object-cover rounded-md "
          />
        </div>
        <div className=" dark:text-white">
          <div className="flex justify-between px-2 pt-1 text-gray-500 text-sm font-medium">
            <span>{gameYear}</span>
            <div className="flex gap-x-1">
              <span className="material-symbols-outlined text-base my-auto text-gray-500">
                kid_star
              </span>
              <span className="text-gray-300 my-auto">{gameRating}</span>
            </div>
          </div>
          <p className="text-center text-lg font-medium">{gameName}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
