import React from "react";
import logoImage from "../../assets/logo.svg";
import "./Header.css";

// material-ui imports
import Button from "@material-ui/core/Button";

function Header({ isLoggedIn, loginHandler, logoutHandler, bookShowHandler }) {
  return (
    <div className="app-header">
      <img className="app-logo" src={logoImage} alt="App Logo" />
      <div className="header-button-group">
        <Button variant="contained" color="primary" onClick={bookShowHandler}>
          Book Show
        </Button>
        {isLoggedIn ? (
          <Button variant="contained" color="default" onClick={logoutHandler}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" color="default" onClick={loginHandler}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
