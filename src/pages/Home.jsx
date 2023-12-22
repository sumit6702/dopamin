import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import Heading from "../components/Heading";
import Loading from "../components/Loader/Loader";
const APIKEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [games, setGames] = useState([]);
  const [bestOfTheYear, setBestOfTheYear] = useState([]);

  // Dates
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?platforms=4&key=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) =>
          data.results.map((game) => {
            return {
              gameId: game.id,
              gameName: game.name,
              gameImg: game.background_image,
              gameRelase: game.released,
              gameRating: game.ratings_count,
            };
          })
        );
      setGames(response);
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const fetchBestOfTheYear = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-rating&key=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) =>
          data.results.map((game) => {
            return {
              gameId: game.id,
              gameName: game.name,
              gameImg: game.background_image,
            };
          })
        );
      setBestOfTheYear(response);
    };
    fetchBestOfTheYear();
  }, []);

  if (games.length === 0) {
    return <Loading />;
  }

  return (
    <main className="md:flex bg-white dark:bg-gray-900">
      <div className="">
        <Heading heading="Popular Games" />
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mx-6 bg-white dark:bg-gray-900">
          {games.map((game) => (
            <Card
              key={game.gameId}
              gameKey={game.gameId}
              gameName={game.gameName}
              gameImg={game.gameImg}
              gameYear={game.gameRelase}
              gameRating={game.gameRating}
            />
          ))}
        </div>
      </div>
      <div className="lg:w-1/4 mx-10 mt-12 lg:m-0 ">
        <Heading heading="Categories" />
        <div>
          <ul className="text-lg dark:text-white border-2 rounded-lg p-4">
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/action">
                Action
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/adventure">
                Adventure
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/casual">
                Casual
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/arcade">
                Arcade
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/puzzle">
                Puzzle
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/racing">
                Racing
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/simulation">
                Simulation
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/sports">
                Sports
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/strategy">
                Strategy
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/shooter">
                Shooter
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/fighting">
                Fighting
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-1 underline" to="/dopamin/mechanical">
                Mechanical
              </Link>
            </li>
          </ul>
          <div className="mt-6">
            <Heading heading="Best Of The Year" />
            <ul className="border-2 rounded-lg p-4 dark:text-white">
              {bestOfTheYear.map((game) => (
                <li key={game?.gameId}>
                  <Link
                    className="flex gap-x-1 p-2 underline"
                    to={`/dopamin/game/${game?.gameName}/${game?.gameId}`}>
                    <img
                      className="w-6 h-6 rounded-full"
                      src={
                        game?.gameImg === null
                          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                          : game?.gameImg
                      }
                      alt={game?.gameName}
                    />
                    <span className="my-auto">{game?.gameName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
