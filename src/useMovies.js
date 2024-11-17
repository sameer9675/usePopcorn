import { useEffect, useState } from "react";

const KEY = "9ff2ca34"; // declare outside the fxn so it does not re create / render on component re render

export function useMovies(query) {
  //doing named export not default (not mendatory)

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /*
    As the dependency array is empty
    The effect which we have mentioned is only called when component mounts (after first render only)

    Now dependency array has query state ( then it will call after every change in query state )
  */
  /**
   * Always try to reduce the using of useEffect -> If same thing can be done in event listener then perform in
   * that, because execution of side effect in event listener is best
   */
  useEffect(() => {
    // callback?.(); //optional chaining in  fxn

    const controller = new AbortController(); //browser api to abort network call

    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        //handling error -> like when internet connection lost
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        // console.log(movies); //will return empty array ([]) -> Reason -> because setState is async -> use callback to set state then it will work ( the state based on the current state we use call back function )

        //setMovies(data.Search, () => setIsLoading(false);); -> can also undo isLoading -> inside callback -> this insure that it become false once movies state completely change
        // setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        //setMovies(data.Search, () => setIsLoading(false);); -> can also undo isLoading -> inside callback -> this insure that it become false once movies state completely change
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    // handleCloseMovie();
    fetchMovies();

    //cleanup fxn to abort network call
    return () => {
      controller.abort();
    };
  }, [query]); //(callback fxn,  dependency array)

  return {
    movies, 
    isLoading, 
    error
  }
}
