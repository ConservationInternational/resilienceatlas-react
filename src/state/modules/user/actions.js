import api, { createApiAction } from '../../utils/api';
import { ILoginForm, ISignupForm } from './utils';

const URL_LOGIN = '';
const URL_SIGNUP = '';

// Action constants
export const LOGIN = createApiAction('user/LOGIN');
export const SIGNUP = createApiAction('user/SIGNUP');

export const login = (values: ILoginForm) =>
  api(LOGIN, ({ post }) => post(URL_LOGIN, { data: values }));

export const signup = (values: ISignupForm) =>
  api(SIGNUP, ({ post }) => post(URL_SIGNUP, { data: values }));
