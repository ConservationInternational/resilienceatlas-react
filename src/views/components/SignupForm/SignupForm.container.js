import { reduxForm } from 'redux-form';

import { SignupSchema, signup, userSignedUp } from '@modules/user';

import { asyncValidate } from '@views/utils/asyncValidate';

import SignupForm from './SignupForm.component';

export default reduxForm({
  form: 'SignupForm',
  asyncValidate: asyncValidate(SignupSchema),
  onSubmit: signup,
  onSubmitSuccess: (result, dispatch) => {
    dispatch(userSignedUp(result));
  },
})(SignupForm);
