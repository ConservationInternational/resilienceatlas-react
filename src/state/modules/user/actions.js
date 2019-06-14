import { SubmissionError } from 'redux-form';
import { post, PORT } from '../../utils/api';
import { ILoginForm, ISignupForm, IEditProfileForm } from './utils';

const URL_LOGIN = '/users/authenticate';
const URL_SIGNUP = '/users/register';

// Action constants
export const LOGIN = 'user / LOGIN';
export const SIGNUP = 'user / SIGNUP';
export const EDIT_PROFILE = 'user / EDIT_PROFILE';
export const LOGOUT = 'user / LOGOUT';

// Action creators
export const userLoggedIn = payload => ({
  type: LOGIN,
  payload,
});

export const userSignedUp = payload => ({
  type: SIGNUP,
  payload,
});

export const userProfileEdited = payload => ({
  type: EDIT_PROFILE,
  payload,
});

export const userLoggedOut = () => ({
  type: LOGOUT,
});

// export const login = (values: ILoginForm) =>
//    post(URL_LOGIN, { data: values })

// Actions
export const login = ({ email, password }: ILoginForm) =>
  post(URL_LOGIN, { data: { user: { email, password } }, baseURL: PORT });

export const signup = ({ email, password }: ISignupForm) =>
  post(URL_SIGNUP, { data: { user: { email, password } }, baseURL: PORT });

export const editProfile = (values: IEditProfileForm) =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          ...values,
        }),
      Math.random() * 2000,
    );
  });

export const logout = () => dispatch => {
  localStorage.removeItem('resilience_user');

  dispatch(userLoggedOut());
};
