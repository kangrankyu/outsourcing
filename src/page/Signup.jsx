import AuthFrom from '../components/AuthFrom';
import { signUpNewUser, tablenickname } from '../auth/authapi';
import { useNavigate } from 'react-router-dom';

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
    <>
      {' '}
      <div style={{ width: '100%', height: '100%' }}>
        <AuthFrom onSubmit={SignupSubmit} mode="signup" />
      </div>
    </>
  );
};

export default Signup;
