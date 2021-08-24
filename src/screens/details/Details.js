import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import Typography from "@material-ui/core/Typography";
import YouTube from "react-youtube";

function Details(props) {
  const [movieDetails, setMovieDetails] = useState();

  const getMovieDetails = () => {
    fetch(props.baseUrl + `movies/${props.match.params.id}`, {
      method: "GET",
      headhers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div className="details-page-container">
      <Header
        isLoggedIn={false}
        loginHandler={() => {}}
        logoutHandler={() => {}}
        bookShowHandler={() => {}}
      />
      <Typography
        component="div"
        className="back-to-home-button"
        onClick={() => {
          props.history.goBack();
        }}>
        &#60; Back to home
      </Typography>
      {movieDetails && (
        <div className="main-container">
          <div className="left">
            <img src={movieDetails.poster_url} alt={movieDetails.title} />
          </div>
          <div className="middle">
            <Typography variant="headline" component="h2">
              {movieDetails.title}
            </Typography>
            <Typography>
              <span className="bold-text">Genre:</span>{" "}
              {movieDetails.genres.join(", ")}
            </Typography>
            <Typography>
              <span className="bold-text">Duration:</span>{" "}
              {movieDetails.duration}
            </Typography>
            <Typography>
              <span className="bold-text">Release Date:</span>{" "}
              {new Date(movieDetails.release_date).toDateString()}
            </Typography>
            <Typography>
              <span className="bold-text">Rating:</span> {movieDetails.rating}
            </Typography>
            <div className="plot-block">
              <Typography>
                <span className="bold-text">Plot:</span>{" "}
                <a href={movieDetails.wiki_url}>(Wiki Link)</a>{" "}
                {movieDetails.storyline}
              </Typography>
            </div>
            <div className="trailer-block">
              <Typography>
                <span className="bold-text">Trailer:</span>
              </Typography>
              <YouTube
                videoId={new URL(movieDetails.trailer_url).searchParams.get(
                  "v"
                )}
                onReady={onReady}
              />
            </div>
          </div>
          <div className="right"></div>
        </div>
      )}
    </div>
  );
}

export default Details;
