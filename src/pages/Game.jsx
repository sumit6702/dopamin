import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Carousel from "../components/Carousel";
const APIKEY = import.meta.env.VITE_API_KEY;

const Game = () => {
  const { id, name } = useParams();
  const [game, setGame] = useState([]);
  const [gameScreenshots, setGameScreenshots] = useState([]);
  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${APIKEY}`
      ).then((res) => res.json());
      setGame(response);
    };
    const fetchScreenshots = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}/screenshots?key=${APIKEY}`
      ).then((res) => res.json());
      const screenshots = response.results.map(
        (screenshot) => screenshot.image
      );
      setGameScreenshots(screenshots);
    };

    fetchGames();
    fetchScreenshots();

    return () => {
      setGame([]);
      setGameScreenshots([]);
    };
  }, [id]);

  if (game.length === 0) {
    return <Loader />;
  }

  if ((game.id !== id && game.name !== name) || game.detail === "Not found.") {
    return (
      <main className="bg-white dark:bg-gray-900 flex justify-center items-center">
        <div className="flex flex-col items-center text-4xl font-medium dark:text-white">
          <span className="material-symbols-outlined text-3xl items-center">
            stadia_controller
          </span>
          <span>Game Not Found!</span>
          <Link
            className="flex gap-x-1 my-2 text-xl border-gray-900 dark:border-gray-50 border-2 px-2 rounded"
            to="/">
            <span className="material-symbols-outlined my-auto">
              arrow_back
            </span>
            <span>Go Back</span>
          </Link>
        </div>
      </main>
    );
  }
  game?.platforms
    .filter((p) => p?.platform?.name === "PC")
    .map((p) => {
      if (Object.keys(p?.requirements).length === 0) {
        console.log(p?.requirements);
      }
    });

  return (
    <main className="bg-white dark:bg-gray-900 dark:text-white bg-opacity-50 backdrop-blur-sm">
      <div className="flex px-8 pt-4 pb-1">
        <div className="flex w-full max-w-[215px] h-72">
          <img
            className="w-full h-auto object-cover shadow"
            src={
              game?.background_image === null
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                : game?.background_image
            }
            alt={game?.name}
          />
        </div>
        <div className="p-4 md:p-8 dark:text-gray-100">
          <h1 className="mb-6 text-4xl font-bold">
            {game?.name}{" "}
            <span className="text-base uppercase px-1 border-2 dark:border-white dark:bg-blue-900 backdrop-blur dark:bg-opacity-30 dark:text-white">
              Rating: {game?.ratings_count}
            </span>
          </h1>
          <p
            className="whitespace-break-spaces max-h-40 overflow-scroll"
            dangerouslySetInnerHTML={{ __html: game?.description } || "N/A"}
          />
        </div>
      </div>
      <div className="flex flex-wrap px-8 py-1 gap-x-4 text-white">
        <p className="w-fit bg-red-800 bg-opacity-60 p-2 mt-2">
          AGE RATING: {game?.esrb_rating?.name || "N/A"}
        </p>
        <p className="w-fit bg-gray-800 p-2 mt-2">Platforms: PC</p>
        <p className="w-fit bg-gray-800 p-2 mt-2">
          Genre:{" "}
          {game?.genres?.map((g, i) => (
            <Link
              key={i}
              className="px-1 underline"
              to={`/games/${g?.name}/${g.id}`}>
              {g?.name}
            </Link>
          )) || "N/A"}
        </p>
        <p className="w-fit bg-gray-800 p-2 mt-2">
          Released: {game?.released || "N/A"}
        </p>
        <p className="w-fit bg-gray-800 p-2 mt-2">
          Developers: {game?.developers[0]?.name || "N/A"}
        </p>
        <p className="w-fit bg-gray-800 p-2 mt-2">
          Publishers: {game?.publishers[0]?.name || "N/A"}
        </p>
      </div>
      <div
        className="border-4 dark:text-white border-gray-900 dark:border-white"
        id="screenshots">
        {gameScreenshots.length === 0 ? (
          <h1 className="text-center">No Screenshots</h1>
        ) : (
          <Carousel slides={gameScreenshots} />
        )}
      </div>
      <div className="p-8 ">
        <div className="flex-shrink-0 text-3xl w-full mb-4">Requirements</div>
        {game?.platforms
          .filter((p) => p?.platform?.name === "PC")
          .every((p) => Object.keys(p?.requirements).length === 0) ? (
          <div className="border-2 p-2 text-center">
            Requirements Not Available
            <span className="material-symbols-outlined text-base">
              priority_high
            </span>
          </div>
        ) : (
          <div className="flex gap-x-3 leading-6">
            <div className="flex-shrink-0 w-1/2 whitespace-break-spaces max-h-72 overflow-y-scroll rounded backdrop-blur-md bg-blue-400 bg-opacity-10 border-2 border-gray-800">
              {game?.platforms
                .filter((p) => p?.platform?.name === "PC")
                .map((p, i) =>
                  p?.requirements ? (
                    <p key={i} className="w-fit p-2 mt-2">
                      {p?.requirements?.minimum}
                    </p>
                  ) : (
                    "N/A"
                  )
                )}
            </div>
            <div className="flex-shrink-0 w-1/2 whitespace-break-spaces max-h-72 overflow-y-scroll rounded backdrop-blur-md bg-blue-400 bg-opacity-10 border-2 border-gray-800">
              {game?.platforms
                .filter((p) => p?.platform?.name === "PC")
                .map((p, i) =>
                  p?.requirements ? (
                    <p key={i} className="w-fit p-2 mt-2">
                      {p?.requirements?.recommended}
                    </p>
                  ) : (
                    "N/A"
                  )
                )}
            </div>
          </div>
        )}
      </div>
      <div className="px-8 py-6">
        Website:{" "}
        {(
          <a className="underline" href={game?.website} target="_blank">
            {game?.website}
          </a>
        ) || "N/A"}
      </div>
    </main>
  );
};

export default Game;
