import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import * as UserActions from '../../../context/user/userActions';
import { useUserContext } from '../../../context/user/userStore';
import { Events, RecaptchaUser, User } from '../../../types';
import * as RegexUtils from '../../../utils/regexUtils';
import * as ResponseUtils from '../../../utils/responseUtils';
import Button from '../../common/buttons/ButtonSecondary';
import Form from '../../common/forms/Form';
import Input from '../../common/inputs/Input';
import ReCAPTCHA from 'react-google-recaptcha';
import { useViewContext } from '../../../context/view/viewStore';
import { toast } from 'react-toastify';

export interface PropsSignUpForm {
  handleSignInClick(event: Events.ButtonEvent): void;
}

const SignUpForm: React.FC<PropsSignUpForm> = (
  props: PropsSignUpForm
): JSX.Element => {
  const { dispatch } = useUserContext();
  const { state: viewState } = useViewContext();
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [emailMessage, setEmailMessage] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [cityMessage] = React.useState<string>('');
  const [state, setState] = React.useState<string>('');
  const [stateMessage, setStateMessage] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [usernameMessage, setUsernameMessage] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [phoneNumberMessage, setPhoneNumberMessage] = React.useState<string>(
    ''
  );
  const [password, setPassword] = React.useState<string>('');
  const [passwordMessage, setPasswordMessage] = React.useState<string>('');
  const [repeatPassword, setRepeatPassword] = React.useState<string>('');
  const [repeatPasswordMessage, setRepeatPasswordMessage] = React.useState<
    string
  >('');
  const [recaptchaColor, setRecaptchaColor] = React.useState<'dark' | 'light'>(
    viewState.theme === 'DARK_THEME' ? 'dark' : 'light'
  );
  const [recaptchResponse, setRecaptchResponse] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const validatePassword = (): boolean => {
    if (password.length === 0) {
      setPasswordMessage('');
      return false;
    } else if (password.length < 8) {
      setPasswordMessage('Password must be at least 8 characters long.');
      return false;
    } else if (!RegexUtils.containsLowercase(password)) {
      setPasswordMessage('Password must contain a lower case letter.');
      return false;
    } else if (!RegexUtils.containsUppercase(password)) {
      setPasswordMessage('Password must contain an upper case letter.');
      return false;
    } else if (!RegexUtils.containsNumber(password)) {
      setPasswordMessage('Password must contain a number.');
      return false;
    } else if (!RegexUtils.containsSpecialCharacter(password)) {
      setPasswordMessage('Password must contain a special character.');
      return false;
    } else {
      setPasswordMessage('');
      return true;
    }
  };

  const validateEmail = (): boolean => {
    if (email.length === 0) {
      setEmailMessage('');
      return false;
    } else if (!RegexUtils.validEmail(email)) {
      setEmailMessage('Invalid email.');
      return false;
    } else {
      setEmailMessage('');
      return true;
    }
  };

  const validatePhoneNumber = (): boolean => {
    if (phoneNumber.length === 0) {
      setPhoneNumberMessage('');
      return false;
    } else if (
      !RegexUtils.containsOnlyNumbers(phoneNumber) ||
      phoneNumber.length > 10 ||
      phoneNumber.length < 10
    ) {
      setPhoneNumberMessage('Invalid phone number. Format: ##########');
      return false;
    } else {
      setPhoneNumberMessage('');
      return true;
    }
  };

  React.useEffect(() => {
    validatePassword();
  }, [password]);

  React.useEffect(() => {
    validateEmail();
  }, [email]);

  React.useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);

  React.useEffect(() => {
    if (repeatPassword !== password) {
      setRepeatPasswordMessage('Passwords do not match.');
    } else {
      setRepeatPasswordMessage('');
    }
  }, [password, repeatPassword]);

  React.useEffect(() => {
    setRecaptchaColor(viewState.theme === 'DARK_THEME' ? 'dark' : 'light');
  }, [viewState]);

  const handleChange = async (event: Events.InputEvent): Promise<void> => {
    event.preventDefault();
    const { id, value } = event.target;

    if (id === 'firstName') {
      setFirstName(value);
    } else if (id === 'lastName') {
      setLastName(value);
    } else if (id === 'email') {
      setEmail(value);
    } else if (id === 'username') {
      setUsername(value);
    } else if (id === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (id === 'city') {
      setCity(value);
    } else if (id === 'state') {
      setState(value);
    } else if (id === 'password') {
      setPassword(value);
    } else if (id === 'repeatPassword') {
      setRepeatPassword(value);
    }
  };

  const handleCaptchaChange = (key: string | null): void => {
    if (key) setRecaptchResponse(key);
  };

  async function handleSubmit(event: Events.FormEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);

    if (validatePhoneNumber() && validateEmail() && validatePassword()) {
      const response = await UserActions.createUser(
        dispatch,
        {
          city,
          country: 'United States',
          email: email.toLowerCase(),
          firstName,
          lastName,
          password,
          phoneNumber,
          state,
          username,
        } as User,
        recaptchResponse
      );

      if (!response) {
        ResponseUtils.toastIfNotOk(
          response,
          'Error creating user. Please try again.'
        );
      } else if (!ResponseUtils.isOk(response)) {
        const body: RecaptchaUser = await response.json();

        if (body.email) {
          setEmailMessage(body.email);
        }
        if (body.username) {
          setUsernameMessage(body.username);
        }
        if (body.phoneNumber) {
          setPhoneNumberMessage(body.phoneNumber);
        }
        if (body.password) {
          setPasswordMessage(body.password);
        }
        if (body.state) {
          setStateMessage(body.state);
        }
        if (body.recaptchaResponse) {
          toast.error('Could not validate recaptcha.');
        }
      } else {
        toast.success('Your account has been created.');
      }
    }
    setLoading(false);
  }

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="First Name"
        id="firstName"
        value={firstName}
        onChange={handleChange}
        type="text"
        autoComplete="first-name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Last Name"
        id="lastName"
        value={lastName}
        onChange={handleChange}
        type="text"
        autoComplete="last-name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        onChange={handleChange}
        helpText={emailMessage}
        type="text"
        autoComplete="email"
      />
      <Input
        placeholder="Username"
        id="username"
        value={username}
        onChange={handleChange}
        helpText={usernameMessage}
        type="text"
        autoComplete="phone-number"
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
        helpText={phoneNumberMessage}
        type="text"
        autoComplete="phone-number"
      />
      <Input
        placeholder="City"
        id="city"
        value={city}
        onChange={handleChange}
        helpText={cityMessage}
        type="text"
        autoComplete="city"
      />
      <Input
        placeholder="State"
        id="state"
        value={state}
        onChange={handleChange}
        helpText={stateMessage}
        type="text"
        autoComplete="state"
      />
      <Input
        placeholder="Password"
        id="password"
        value={password}
        onChange={handleChange}
        helpText={passwordMessage}
        type="password"
        autoComplete="password"
      />
      <Input
        placeholder="Repeat Password"
        id="repeatPassword"
        value={repeatPassword}
        onChange={handleChange}
        helpText={repeatPasswordMessage}
        type="password"
      />
      <ReCAPTCHA
        theme={recaptchaColor}
        sitekey={process.env.recaptchaKey || ''}
        onChange={handleCaptchaChange}
        key={loading.toString()}
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: 'inline' }}>
      <div style={{ float: 'left', marginRight: '25px', marginTop: '5px' }}>
        Sign up
      </div>
      <div style={{ float: 'right', marginLeft: '25px' }}>
        <Button
          id="signIn"
          onClick={props.handleSignInClick}
          type="button"
          variant="outlined"
          testId="sign-in-button-test-id"
        >
          Sign in
        </Button>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Form
        id="signUp"
        buttonText="Create Account"
        formInputs={formInputs}
        handleSubmit={handleSubmit}
        icon={<LockOutlinedIcon />}
        title={title}
        disabled={loading}
      />
      <div style={{ height: '50px' }} />
    </React.Fragment>
  );
};

export default SignUpForm;
