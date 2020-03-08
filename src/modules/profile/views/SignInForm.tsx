import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import * as UserActions from '../../../context/user/userActions';
import { useUserContext } from '../../../context/user/userStore';
import Button from '../../common/buttons/ButtonSecondary';
import Form from '../../common/forms/Form';
import CheckBox from '../../common/inputs/CheckBox';
import Input from '../../common/inputs/Input';
import { ButtonEvent, InputEvent } from '../../../types';

export interface PropsLogInForm {
  handleSignUpClick(event: ButtonEvent): void;
}

const SignInForm: React.FC<PropsLogInForm> = (props): JSX.Element => {
  const { dispatch: userDispatch } = useUserContext();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordMessage, setPasswordMessage] = React.useState<string>('');
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);

  const handleChange = async (event: InputEvent): Promise<void> => {
    const { id, value } = event.target;

    if (id === 'username') {
      setUsername(value);
    } else if (id === 'password') {
      setPassword(value);
    } else if (id === 'rememberMe') {
      setRememberMe(!rememberMe);
    }
  };

  const handleSubmit = (event: ButtonEvent): void => {
    event.preventDefault();

    UserActions.signIn(userDispatch, username, password, rememberMe).then(
      (response) => {
        if (response instanceof Response && response.status === 401) {
          setPasswordMessage(
            'User not found or incorrect password. Try a different username or password.'
          );
        } else if (!(response instanceof Response)) {
          setPasswordMessage('There was an error. Please try again.');
        }
      }
    );
  };

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="Username"
        id="username"
        value={username}
        onChange={handleChange}
        type="text"
        autoComplete="email"
      />
      <Input
        placeholder="Password"
        id="password"
        value={password}
        onChange={handleChange}
        helpText={passwordMessage}
        type="password"
        autoComplete="current-password"
      />
      <CheckBox
        checked={rememberMe}
        value="REMEMBER_ME"
        onChange={handleChange}
        id="rememberMe"
        label="Remember Me"
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: 'inline' }}>
      <div style={{ float: 'left', marginRight: '25px', marginTop: '5px' }}>
        Sign in
      </div>
      <div style={{ float: 'right', marginLeft: '25px' }}>
        <Button
          id="signUp"
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
      id="signIn"
      buttonText="Sign in"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
      icon={<LockOutlinedIcon />}
      title={title}
    />
  );
};

export default SignInForm;
