import { useState, useEffect, useRef } from "react";
import StarRting from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "9ff2ca34"; // declare outside the fxn so it does not re create / render on component re render

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Search({ query, setQuery }) {
  const inputElement = useRef(null); //initialize ref

  /*
    useEffect(() => {
      const ele = document.querySelector('.search');
      ele.focus();  // React is all about declerative -> seleting the dom element like this is not the react way.
    }, [])
  */

  useEffect(function () {
    function keyDownHandler(e) {

      if( document.activeElement === inputElement.current) {
        return;
      }

      if (e.code === "Enter") {
        inputElement.current.focus(); // .current is the key of the object
        setQuery('');
      }
    }
    inputElement.current.focus();
    document.addEventListener("keydown", keyDownHandler);

    return () => document.removeEventListener("keydown", keyDownHandler);
  }, [setQuery]);

  return (
    <input
      ref={inputElement} //passing the ref to ref prop -> now these two are connected in a declerative way
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function NavBar({
  // movies
  children,
}) {
  return (
    <nav className="nav-bar">
      <Logo />
      {/* <Search />
      <NumResult movies={movies}/> */}
      {children}
    </nav>
  );
}

function Movies({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movies
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

function Box({
  // movies
  children,
  // element,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

// function ListBox({
//   // movies
//   children,
// }) {
//   const [isOpen1, setIsOpen1] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen1((open) => !open)}
//       >
//         {isOpen1 ? "–" : "+"}
//       </button>
//       {isOpen1 &&
//         // <MoviesList movies={movies} />
//         children}
//     </div>
//   );
// }

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>{" "}
          {/** toFixed is the number of decimal point we allowig */}
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          {movie.userRating > 0 && (
            <>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </>
          )}
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function Main({
  // movies
  children,
}) {
  return (
    <main className="main">
      {/* <ListBox movies={movies}/>
      <WatchedBox /> */}
      {children}
    </main>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0); //creating ref as it should not affect by render -> and we don't need to show this in UI -> this data will persist between render

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Runtime: runtime,
  } = movie;

  //updating ref in useEffect -> because we are allowed to update ref in render logic
  useEffect(function() {
    if(userRating) {
      countRef.current+=1;
    }
  }, [userRating])

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      if (selectedId) {
        getMovieDetails();
      }
    },
    [selectedId]
  );

  //changing document title ( means changing something outside application ) which is side effect -> using useEffect to execute side effect
  //and as we are using title inside effect  -> so that need to be included in dependency array
  useEffect(() => {
    if (title) {
      document.title = `Movie | ${title}`;
    }

    // clean up fxn -> which is used to reset the thing which is written in effect fxn
    // will executed in two condition
    // 1-> when effect will executed again
    // 2- when component get unmount
    return function () {
      document.title = "usePopcorn";

      /*
      console.log(`Clean up effect for movie ${title}`);  
      As we know that that clean up fxn called when the component get unmout (means all the state gets destroyed), but still it able to
      print the title.
      Reason behind is that ->  CLOUSRE -> A clousre in js means that a function will remember all variable that was present at the time 
      , at the place when the function was created
    */
    };
  }, [title]);

  //we are directly touching dom (listener to window) -> It's a side effect -> so, using useEffect
  useEffect(
    function () {
      function keyDownHandler(event) {
        if (event.code === "Escape") {
          onCloseMovie();
        }
      }

      document.addEventListener("keydown", keyDownHandler);

      return function () {
        document.removeEventListener("keydown", keyDownHandler);
      };
    },
    [onCloseMovie] //adding onCloseMovie to dependency ( because es lint suggesting ) -> read about it more (reason)
  );

  function handleAdd() {
    const newWatchMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current
    };
    onAddWatched(newWatchMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRting
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating && watchedUserRating}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMsg({ error }) {
  return (
    <p className="error">
      <span>🚨</span>
      {error}
    </p>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const tmpQuery = "interstellar";

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    // this callback fxn should be pure -> it will not receive any argument ->react will only consider this call back fxn on initial render (first mount) just like value
    if (localStorage.key("watched")) {
      return JSON.parse(localStorage.getItem("watched"));
    } else {
      return [];
    }
  });

  // const [watched, setWatched] = useState(JSON.parse(localStorage.getItem('watched')); -> never do like this -> calling a function -> it will execute on every render -> which is not good

  /*
    Output ->  during render -> After initial render -> After every render
    useEffect(function() {
      console.log('After initial render');
    },[])
    useEffect(function() {
      console.log('After every render');
    })
    console.log('during render'); 
  */

  /*
    ideally we should do any state update or anything in render logic -> that create side effect ( interaction with outside world )
    these thing are not allowed in react
    ideally side effect only be perform in useEffect or event handler
    from naked eye its look like everything is working -> but going to network tab will see that multiple fetch req is going and going continiously
    reason of multiple fetch -> as setting the state -> re render the component itself -> then again fetch fire

    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
      .then(res => res.json())
      .then(data => setMovies(data.Search));

    setWatched([]) -> will get too many re render error
  */

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
    handleCloseMovie();
    fetchMovies();

    //cleanup fxn to abort network call
    return () => {
      controller.abort();
    };
  }, [query]); //(callback fxn,  dependency array)

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem('watched', JSON.stringify([...watched, movie])); //reason not using watched directly -> because setWatched is async -> so watched is still old value or stale
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        {/* using prop drilling (passing of prop to multiple child)
        <ListBox>
          <MoviesList movies={movies} />
        </ListBox>
        <WatchedBox /> */}

        {/* component passing as children prop */}
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {!isLoading && error && <ErrorMsg error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>

        {/* Component as prop
        <Box element={<MoviesList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchMovieList watched={watched} />
            </>
          }
        /> */}
      </Main>
    </>
  );
}
