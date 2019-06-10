import React from 'react';
import { Row } from 'react-foundation';
import LoginForm from '@components/LoginForm';

const Login = () => (
  <div className="l-content">
    <Row>
      <div className="m-user-form">
        <h2>Log in</h2>

        <LoginForm />
      </div>
    </Row>
  </div>
);

export default Login;
