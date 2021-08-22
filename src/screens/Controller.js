import React, { useState } from "react";
import Header from "../common/header/Header";
import LoginRegisterModal from "../common/login-register-modal/LoginRegisterModal";

function Controller() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginRegisterModalShow, setLoginRegisterModalShow] = useState(false);

  const logInOut = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const bookShowHandler = () => {
    if (!isLoggedIn) {
      setLoginRegisterModalShow(true);
      return;
    }
  };

  const closeLoginRegisterModal = () => {
    setLoginRegisterModalShow(false);
  };

  const handleLogin = (username, password) => {
    alert("Username: " + username + " Password: " + password);
  };

  const handleRegister = (firstname, lastname, email, password, contactNo) => {
    alert(
      `Firstname: ${firstname} Lastname: ${lastname} Email: ${email} Password: ${password} ContactNo: ${contactNo}`
    );
  };

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        loginHandler={logInOut}
        logoutHandler={logInOut}
        bookShowHandler={bookShowHandler}
      />
      <LoginRegisterModal
        isOpen={loginRegisterModalShow}
        closeModal={closeLoginRegisterModal}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    </div>
  );
}

export default Controller;
