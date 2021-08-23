import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";

// material-ui imports
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

function Home(props) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);

  const handleLogin = () => {
    console.log("handle login");
  };
  const handleLogout = () => {
    console.log("handle logout");
  };
  const handleBookShowFromHeader = () => {
    console.log("handle bookshow click from header");
  };

  const getUpcomingMovies = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm =
      today.getMonth() < 10 ? `0${today.getMonth()}` : today.getMonth();
    const start_date = `${yyyy}-${mm}-${dd}`;
    fetch(props.baseUrl + `movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.movies);
      });
  };

  const getReleasedMovies = () => {
    fetch(props.baseUrl + `movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReleasedMovies(data.movies);
      });
  };

  const getMovieClickHandler = (movieId) => {
    return function () {
      props.history.push({
        pathname: "/movie/" + movieId,
      });
    };
  };

  useEffect(() => {
    getUpcomingMovies();
    getReleasedMovies();
  }, []);

  return (
    <div>
      <Header
        isLoggedIn={false}
        loginHandler={handleLogin}
        logoutHandler={handleLogout}
        bookShowHandler={handleBookShowFromHeader}
      />
      <div className="upcoming-movies-heading">Upcoming Movies</div>
      <GridList className="upcoming-movies" cols={6} cellHeight={250}>
        {upcomingMovies.map((movie) => (
          <GridListTile
            key={movie.poster_url}
            className="clickable-movie-poster"
            onClick={getMovieClickHandler(movie.id)}>
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
      <div className="main-container">
        <div className="released-movies-container">
          <GridList
            className="released-movies"
            cols={4}
            cellHeight={350}
            spacing={16}>
            {releasedMovies.map((movie) => (
              <GridListTile
                key={movie.poster_url}
                className="clickable-movie-poster"
                onClick={getMovieClickHandler(movie.id)}>
                <img src={movie.poster_url} alt={movie.title} />
                <GridListTileBar title={movie.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="filters-container"></div>
      </div>
    </div>
  );
}

export default Home;
