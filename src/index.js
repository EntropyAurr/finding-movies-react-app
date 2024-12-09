import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-v1";
// import StarRating from "./StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating maxRating={10} color="#2a9d8f" onSetRating={setMovieRating} />
//       <p>This movie is rated {movieRating} stars.</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} messages={["Terrible", "Bad", "Normal", "Good", "Amazing"]} /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
