import React from 'react';
import { Row } from 'react-foundation';
import SignupForm from '@components/SignupForm';
import AuthLinks from '@components/AuthLinks';

const Signup = () => (
  <div className="l-content">
    <Row>
      <div className="m-user-form">
        <h2>Sign up</h2>
        <SignupForm />

        <AuthLinks />
      </div>
    </Row>
  </div>
);

export default Signup;
