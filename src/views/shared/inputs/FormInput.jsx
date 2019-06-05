import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import { WrappedFieldProps } from 'redux-form';

interface P {
  label: ReactNode;
}

const FormInput: FC<P & WrappedFieldProps> = ({
  input,
  meta: { touched, error },
  label,
  ...rest
}) => (
  <div className={cx('field', { 'has-error': error })}>
    <label htmlFor={input.name}>{label}</label>
    <br />
    <input {...input} {...rest} />
    {Boolean(touched && error) && <div className="error-message">{error}</div>}
  </div>
);

export default FormInput;
