import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

// import "./styles.css";
// import App from "./App";

import StarRating from "./StarRating";

const root = createRoot(document.getElementById("root"));

const Test = () => {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating maxRating={10} color="blue" onSetRating={setMovieRating} />
      <p>This movie is rated {movieRating} stars</p>
    </div>
  );
};

root.render(
  <StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StarRating size={24} color="red" />
    <Test />
  </StrictMode>
);
