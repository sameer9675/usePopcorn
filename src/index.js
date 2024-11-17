import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import App1 from './AppV1';
import App2 from './AppV2';
import StarRting from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  function ratingHandler(rating) {
    setMovieRating(rating);
  }

  return (
    <div>
      <StarRting
        color="blue"
        maxRating={10}
        onSetRating={(rating) => ratingHandler(rating)}
      />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React.StrictMode -> render the component instance twice in dev mode (not in prod environment)
  <React.StrictMode>
    {/* <App /> */}
    <App2 /> {/** Custom hook code present */}
    {/* <App1 /> */}
    {/* <StarRting
      maxRating={5}
      size={48}
      messages={["Teriible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />

    <Test /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
