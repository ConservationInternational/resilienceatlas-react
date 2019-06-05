import { reduxForm } from 'redux-form';

import { signup, SignupSchema } from '@modules/user';

import { asyncValidate } from '@views/utils/asyncValidate';

import SignupForm from './SignupForm.component';

export default reduxForm({
  form: 'SignupForm',
  asyncValidate: asyncValidate(SignupSchema),
  onSubmit: signup,
})(SignupForm);
