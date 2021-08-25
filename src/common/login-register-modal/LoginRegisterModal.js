import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./LoginRegisterModal.css";

// material-ui imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

Modal.setAppElement("#root");

function LoginRegisterModal({
  isOpen,
  closeModal,
  handleLogin,
  handleRegister,
}) {
  const initialFormValues = [
    {
      username: "",
      password: "",
    },
    {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      contactNo: "",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues[selectedTab]);

  useEffect(() => {
    if (!isOpen) {
      setFormValues(initialFormValues[selectedTab]);
    }
  }, [isOpen]);

  const handleFormInput = (e) => {
    const values = { ...formValues };
    values[e.target.name] = e.target.value;
    setFormValues(values);
  };

  const submitLoginForm = () => {
    handleLogin(formValues.username, formValues.password).then(
      () => {
        closeModal();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const submitRegisterForm = () => {
    handleRegister(
      formValues.email,
      formValues.firstname,
      formValues.lastname,
      formValues.contactNo,
      formValues.password
    ).then(
      () => {
        closeModal();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const styles = {
    content: {
      width: "fit-content",
      height: "fit-content",
      margin: "auto",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={styles}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="LOGIN"></Tab>
        <Tab label="REGISTER"></Tab>
      </Tabs>
      {selectedTab === 0 && (
        <form className="login-register-form">
          <FormControl component="div" required className="input-field">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleFormInput}
            />
          </FormControl>
          <FormControl component="div" required className="input-field">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleFormInput}
              type="password"
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={submitLoginForm}
            className="submit-button">
            LOGIN
          </Button>
        </form>
      )}

      {selectedTab === 1 && (
        <form className="login-register-form">
          <FormControl component="div" required className="input-field">
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input
              id="firstname"
              name="firstname"
              value={formValues.firstname}
              onChange={handleFormInput}
            />
          </FormControl>
          <FormControl component="div" required className="input-field">
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input
              id="lastname"
              name="lastname"
              value={formValues.lastname}
              onChange={handleFormInput}
            />
          </FormControl>
          <FormControl component="div" required className="input-field">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleFormInput}
            />
          </FormControl>
          <FormControl component="div" required className="input-field">
            <InputLabel htmlFor="register-password">Password</InputLabel>
            <Input
              id="register-password"
              name="password"
              value={formValues.password}
              onChange={handleFormInput}
              type="password"
            />
          </FormControl>
          <FormControl component="div" required className="input-field">
            <InputLabel htmlFor="contactNo">Contact No.</InputLabel>
            <Input
              id="contactNo"
              name="contactNo"
              value={formValues.contactNo}
              onChange={handleFormInput}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={submitRegisterForm}
            className="submit-button">
            REGISTER
          </Button>
        </form>
      )}
    </Modal>
  );
}

export default LoginRegisterModal;
