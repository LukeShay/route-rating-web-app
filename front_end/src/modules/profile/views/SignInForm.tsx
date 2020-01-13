import { useContext, useState } from "react";
import React from "react";
import * as UserActions from "../../../context/user/userActions";
import { UserContext } from "../../../context/user/userStore";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

export interface IPropsLogInForm {
  handleSignUpClick(event: any): void;
}

const SignInForm: React.FC<IPropsLogInForm> = (props: IPropsLogInForm) => {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = React.useState<string>("");
  const [emailMessage, setEmailMessage] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordMessage, setPasswordMessage] = React.useState<string>("");

  const handleChange = async (event: any) => {
    const { id, value } = event.target;

    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    UserActions.signIn(dispatch, email, password).then((response) => {
      if (response instanceof Response && response.status === 401) {
        setPasswordMessage(
          "User not found or incorrect password. Try a different username or password."
        );
      } else if (!(response instanceof Response)) {
        setPasswordMessage("There was an error. Please try again.");
      }
    });
  };

  const formInputs: JSX.Element = (
    <React.Fragment>
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
        placeholder="Password"
        id="password"
        value={password}
        handleChange={handleChange}
        helpText={passwordMessage}
        type="password"
        autoComplete="current-password"
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Sign in
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button
          onClick={props.handleSignUpClick}
          type="button"
          variant="outlined"
        >
          Sign up
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      title={title}
      buttonText="Sign in"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignInForm;