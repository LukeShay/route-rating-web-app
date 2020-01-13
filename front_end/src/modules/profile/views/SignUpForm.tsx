import { useContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import * as UserActions from "../../../context/user/userActions";
import { UserContext } from "../../../context/user/userStore";
import { User } from "../../../types";
import * as ResponseUtils from "../../../utils/responseUtils";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

export interface IPropsSignUpForm {
  handleSignInClick(event: any): void;
}

const SignUpForm: React.FC<IPropsSignUpForm> = (props: IPropsSignUpForm) => {
  const { dispatch } = useContext(UserContext);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [emailMessage, setEmailMessage] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordMessage, setPasswordMessage] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [phoneNumberMessage, setPhoneNumberMessage] = React.useState<string>(
    ""
  );
  const [errorCode, setErrorCode] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    validatePassword();
  }, [password]);

  React.useEffect(() => {
    validateEmail();
  }, [email]);

  React.useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);

  const validatePassword = (): boolean => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[!@#\$%\^\&*\)\(+=._-]/g;

    if (password.length === 0) {
      setPasswordMessage("");
      return false;
    } else if (password.length < 8) {
      setPasswordMessage("Password must be at least 8 characters long.");
      return false;
    } else if (!password.match(lowerCaseLetters)) {
      setPasswordMessage("Password must contain a lower case letter.");
      return false;
    } else if (!password.match(upperCaseLetters)) {
      setPasswordMessage("Password must contain an upper case letter.");
      return false;
    } else if (!password.match(numbers)) {
      setPasswordMessage("Password must contain a number.");
      return false;
    } else if (!password.match(specialCharacters)) {
      setPasswordMessage("Password must contain a special character.");
      return false;
    } else {
      setPasswordMessage("");
      return true;
    }
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.length === 0) {
      setEmailMessage("");
      return false;
    } else if (!email.match(emailRegex)) {
      setEmailMessage("Invalid email.");
      return false;
    } else {
      setEmailMessage("");
      return true;
    }
  };

  const validatePhoneNumber = (): boolean => {
    const tenDigits = /[0-9]{10}/;

    if (phoneNumber.length === 0) {
      setPhoneNumberMessage("");
      return false;
    } else if (!phoneNumber.match(tenDigits) || phoneNumber.length > 10) {
      setPhoneNumberMessage("Invalid phone number. Format: ##########");
      return false;
    } else {
      setPhoneNumberMessage("");
      return true;
    }
  };

  const handleChange = async (event: any): Promise<void> => {
    event.preventDefault();
    const { id, value } = event.target;

    if (id === "firstName") {
      setFirstName(value);
    } else if (id === "lastName") {
      setLastName(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();

    if (validatePhoneNumber() && validateEmail()) {
      const response = await UserActions.createUser(dispatch, {
        country: "",
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        state: "",
        username: email
      } as User);

      if (response instanceof Response && response.url.split("/")[3]) {
        if (response.status !== 200) {
          ResponseUtils.createUserResponse(response).then((message) =>
            toast.error("Error: " + message)
          );
        }
      }
    }
  }

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="First Name"
        id="firstName"
        value={firstName}
        handleChange={handleChange}
        type="text"
        autoComplete="first-name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Last Name"
        id="lastName"
        value={lastName}
        handleChange={handleChange}
        type="text"
        autoComplete="last-name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        handleChange={handleChange}
        helpText={emailMessage}
        type="text"
        autoComplete="email"
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        handleChange={handleChange}
        helpText={phoneNumberMessage}
        type="text"
        autoComplete="phone-number"
      />
      <Input
        placeholder="Password"
        id="password"
        value={password}
        handleChange={handleChange}
        helpText={passwordMessage}
        type="password"
        autoComplete="password"
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Sign up
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button
          onClick={props.handleSignInClick}
          type="button"
          variant="outlined"
        >
          Sign in
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      title={title}
      buttonText="Create Account"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignUpForm;