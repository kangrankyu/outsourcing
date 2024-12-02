import React, { useState } from 'react';
import styled from 'styled-components';

const AuthFrom = ({ mode,onSubmit }) => {
  const [formdata, setformdata] = useState({
    email: '',
    password: '',
    nickname: ''
  });

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formdata);
  };
  return (
    <>
    <div>
      <LoginForm onSubmit={handleSubmit}>
        <LoginInput
          type="text"
          value={formdata.email}
          name="email"
          placeholder="이메일을 입력하세요 "
          onChange={handleChange}
          required
        />

        <LoginInput
          type="password"
          value={formdata.password}
          name="password"
          placeholder="비밀번호을 입력하세요 "
          onChange={handleChange}
          required
        />
        {mode === 'signup' && (
          <LoginInput
            type="text"
            value={formdata.nickname}
            name="nickname"
            placeholder="닉네임을 입력하세요 "
            onChange={handleChange}
            required
          />
    )} 
        <LoginButton type="submit">
            {mode === "login" ? "로그인":"회원가입"}
            </LoginButton>
      </LoginForm>
      </div>
    </>
  );
};

export default AuthFrom;

const LoginForm = styled.form`
  display: flex
;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 600px;
   
    border-radius: 15px;
    padding: 50px 30px;
  
`
const LoginInput = styled.input`
    height: 60px;
    padding: 15px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 10px;
`
const LoginButton = styled.button`
    height: 60px;
    font-size: 20px;
    color: white;
    background: rgb(49, 84, 181);
    border: 0px;
    border-radius: 10px;

`

