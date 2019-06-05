import { reduxForm } from 'redux-form';

import { login, LoginSchema } from '@modules/user';

import { asyncValidate } from '@views/utils/asyncValidate';

import LoginForm from './LoginForm.component';

export default reduxForm({
  form: 'LoginForm',
  asyncValidate: asyncValidate(LoginSchema),
  onSubmit: login,
})(LoginForm);
