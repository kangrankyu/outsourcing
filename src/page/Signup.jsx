import AuthFrom from '../components/AuthFrom';
import { signUpNewUser, tablenickname } from '../auth/authapi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { LoginDiv2 } from './Login';

const Signup = () => {
  const navigate = useNavigate();
  const SignupSubmit = async (formdata) => {
    try {
      const data = await signUpNewUser(formdata);

      alert('회원가입이 완료되었습니다.');

      await tablenickname(formdata, data.user.id);

      navigate('/login');
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다: ' + error.message);
      console.log(error);
    }
  };
  return (
    <Wrapper>
      {' '}
      <SignWrapper>
        <SignH1>회원가입</SignH1>
        <AuthFrom onSubmit={SignupSubmit} mode="signup" />
      </SignWrapper>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SignWrapper = styled.div`
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  box-shadow: rgba(0, 0, 0, 0.15) 0.5px 0.5px 10px;
  border-radius: 15px;
  padding: 30px 30px;
`

const SignH1 = styled.h1`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 20px;
`;
