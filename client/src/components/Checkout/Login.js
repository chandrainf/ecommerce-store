import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import Button from '../Button/Button';
import { LOGIN_USER } from '../../constants';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 30%;
  margin: 2% auto;
`;

const TextInput = styled.input`
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Login = ({ history }) => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <LoginWrapper>
      <TextInput
        onChange={e => setUserName(e.target.value)}
        value={userName}
        placeholder='Your username'
      />
      <TextInput
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder='Your password'
      />
      <Button
        color='royalBlue'
        onClick={async () => {
          const { data } = await loginUser({
            variables: { userName, password },
          });

          if (data.loginUser && data.loginUser.token) {
            sessionStorage.setItem('token', data.loginUser.token);
            return history.push('/checkout');
          } else {
            alert('Please provide (valid) authentication details');
          }
        }}
      >
        Login
      </Button>
    </LoginWrapper>
  );
};

export default Login;
