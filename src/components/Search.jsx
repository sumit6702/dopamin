import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const APIKEY = import.meta.env.VITE_API_KEY;

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const results = useRef(null);
  const searchInput = useRef(null);
  const fetchGames = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?platforms=4&search=${search}&search_precise=true&key=${APIKEY}`
    ).then((res) => res.json());
    const mainGames = response.results
      .filter((game) => game.ratings_count > 50)
      .map((game) => {
        return {
          gameId: game.id,
          gameName: game.name,
          gameImg: game.background_image,
          gameRatingCount: game.ratings_count,
        };
      });
    setGames(mainGames);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetchGames();
    console.log(games);
    results.current.classList.remove("hidden");
  };
  useEffect(() => {
    if (searchInput.current.value === "") {
      results.current.classList.add("hidden");
    } else {
      results.current.classList.remove("hidden");
    }
  });

  useEffect(() => {
    fetchGames();
  }, [search]);
  return (
    <div className="relative">
      <form
        onSubmit={onSubmit}
        onKeyDown={(e) => e.key === "Enter" && onSubmit(e)}
        className="flex items-center lg:w-96">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
              search
            </span>
          </div>
          <input
            ref={searchInput}
            type="text"
            id=""
            className="bg-white dark:bg-gray-800 bg-opacity-50 border border-gray-700 text-gray-900 text-sm block w-full pl-10 p-2.5 rounded-xl pe-20 focus:outline-none focus:border-gray-500 focus:shadow-sm dark:text-gray-300 font-medium"
            placeholder="Search Games..."
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}></input>
          <button
            type="submit"
            className="bg-opacity-50 flex text-gray-600 absolute inset-y-0 right-2 px-2 items-center pr-3 border-s">
            <span className="material-symbols-outlined dark:text-gray-300">
              login
            </span>
          </button>
        </div>
      </form>
      <div
        ref={results}
        className="bg-white dark:bg-gray-800 bg-opacity-50 border border-gray-700 text-gray-900 text-sm w-full rounded-xl p-2 dark:text-gray-300 absolute h-max top-12 z-50 max-h-96 overflow-y-scroll">
        <ul>
          {games && games.length > 0 ? (
            games.map((game) => (
              <li
                key={game?.gameId}
                onClick={() => setSearch("")}
                className=" mb-2 bg-gray-200 dark:bg-slate-700 rounded-xl hover:bg-gray-900 hover:text-white">
                <Link
                  to={`/game/${game?.gameName}/${game?.gameId}`}
                  className="flex gap-x-2 font-medium py-2 px-2">
                  <img
                    className="rounded-full w-6 h-6"
                    src={game?.gameImg}
                    alt={game?.gameName}
                  />
                  <span className="my-auto">{game?.gameName}</span>
                  <span className="flex ms-auto me-0">
                    {game?.gameRatingCount > 0 && game?.gameRatingCount < 80 ? (
                      <span className="material-symbols-outlined text-gray-400 dark:text-gray-800 my-auto">
                        error
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-gray-400 dark:text-gray-800 my-auto">
                        verified
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <p className="p-2">No results found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
