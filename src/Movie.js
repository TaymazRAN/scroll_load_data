import React from "react";
import "./style.css";

export default function Movie(props) {
  const { movie, id } = props;

  return (
    <li className="movie" key={id}>
      {/* <img src={movie.reviewsThumbnailUrl} /> */}
      {/* <p className="title">{movie.reviewsTitle}</p> */}

      <img src={movie.Poster} />
      <p className="title">{movie.Title}</p>
    </li>
  );
}
