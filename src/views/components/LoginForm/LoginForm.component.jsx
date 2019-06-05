import React, { FC } from 'react';
import cx from 'classnames';
import { InjectedFormProps, Form, Field } from 'redux-form';

import FormInput from '@shared/inputs/FormInput';
import { ILoginForm } from '@modules/user';

const LoginForm: FC<InjectedFormProps<ILoginForm>> = ({
  handleSubmit,
  submitting,
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      component={FormInput}
      type="email"
      name="email"
      label="Email"
      autoFocus
    />
    <Field
      component={FormInput}
      type="password"
      name="password"
      label="Password"
      autoComplete="off"
    />
    <div className="actions">
      <input
        className={cx('btn-submit', { 'is-loading': submitting })}
        type="submit"
        name="commit"
        value="Log in"
      />
    </div>
  </Form>
);

export default LoginForm;
