import { SubmissionError } from 'redux-form';
import { post } from '../../utils/api';
import { ILoginForm, ISignupForm, IEditProfileForm } from './utils';

const URL_LOGIN = '';
const URL_SIGNUP = '';

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
export const login = (values: ILoginForm) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.password === 'password') {
        resolve({
          email: values.email,
        });
      } else {
        reject(
          new SubmissionError({
            password: 'Wrong password',
          }),
        );
      }
    }, Math.random() * 2000);
  });

export const signup = (values: ISignupForm) =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
        }),
      Math.random() * 2000,
    );
  });

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
