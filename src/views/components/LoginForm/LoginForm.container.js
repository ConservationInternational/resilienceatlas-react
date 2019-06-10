import { reduxForm } from 'redux-form';

import { LoginSchema, login, userLoggedIn } from '@modules/user';

import { asyncValidate } from '@views/utils/asyncValidate';

import LoginForm from './LoginForm.component';

export default reduxForm({
  form: 'LoginForm',
  asyncValidate: asyncValidate(LoginSchema),
  onSubmit: login,
  onSubmitSuccess: (result, dispatch) => {
    dispatch(userLoggedIn(result));
    localStorage.setItem('resilience_user', JSON.stringify(result));
  },
})(LoginForm);
