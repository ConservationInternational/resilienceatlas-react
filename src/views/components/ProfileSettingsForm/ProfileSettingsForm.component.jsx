import React, { FC } from 'react';
import cx from 'classnames';
import { InjectedFormProps, Form, Field } from 'redux-form';

import FormInput from '@shared/inputs/FormInput';
import Loader from '@shared/Loader';
import { IProfileSettingsForm } from '@modules/user';

const ProfileSettingsForm: FC<InjectedFormProps<IProfileSettingsForm>> = ({
  user,
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

    {!!user.unconfirmed && (
      <div>Currently waiting confirmation for: {user.email}</div>
    )}

    <Field
      component={FormInput}
      type="password"
      name="password"
      label={
        <span>
          Password<em>(leave blank if you don&apos;t want to change it)</em>
        </span>
      }
      autoComplete="off"
    />

    <Field
      component={FormInput}
      type="password"
      name="password_confirmation"
      label="Password confirmation"
      autoComplete="off"
    />

    <Field
      component={FormInput}
      type="password"
      name="current_password"
      label={
        <span>
          Current password
          <em>(we need your current password to confirm your changes)</em>
        </span>
      }
    />

    <Loader loading={submitting} />

    <div className="actions">
      <input
        className={cx('btn-submit', { 'is-loading': submitting })}
        type="submit"
        name="commit"
        value="Update"
        disabled={submitting}
      />
    </div>
  </Form>
);

export default ProfileSettingsForm;
