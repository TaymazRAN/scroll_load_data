import React, { useState, useEffect, useRef, useCallback } from "react";
import Movie from "./Movie.js";
import axios from "axios";
import "./style.css";

export default function App() {
  const [movies, setMovies] = useState({ Search: [] });
  const [page, setPage] = useState(47);
  const [response, setResponse] = useState(true);
  const loader = useRef(null);
  const temp = useRef(response);

  useEffect(() => {
    var options = {
      root: null, //viewport
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    console.log("Page: ", page);
    axios
      // {/* // `https://kodoumo.ir/wp-json/api/v2/reviews-category/animations/?paged=${page}` */}

      .get(`https://www.omdbapi.com/?apikey=93789fba&s=batman&page=${page}`)

      .then((res) => {
        let respo = res?.data?.Response ?? "False";
        if (respo === "True") {
          setMovies((data) => ({
            ...data,
            ...res.data,
            Search: [...data.Search, ...res.data.Search],
          }));
          setResponse(true);
          temp.current = true;
        } else if (respo === "False") {
          setResponse(false);
          temp.current = false;
        }
      });
  }, [page]);

  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (temp.current) setPage((page) => page + 1);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="wrapper">
        {movies?.Search?.map((movie, index) => {
          return <Movie id={index} key={index} movie={movie} />;
        })}
      </div>
      <div className="loading" ref={loader}>
        {response && <h2>Loading...</h2>}
      </div>
    </div>
  );
}
