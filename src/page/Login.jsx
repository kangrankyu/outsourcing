
import React from 'react';
import AuthForm from '../components/AuthFrom'
import { useNavigate, Link } from 'react-router-dom';
import { signInUser } from '../auth/authapi';
import styled from 'styled-components';


const Login = () => {
    const navigate = useNavigate();
    const SigninSubmit = async (formdata) => {
        try {
            // 로그인 API 호출 (signInUser 함수 사용)
            const { email, password } = formdata;
            const { data, error } = await signInUser({ email, password });

            if (error) {
                console.error("로그인 실패:", error.message);
                alert("로그인에 실패했습니다. 다시 시도해주세요.");
                return;
            }

            // 로그인 성공 처리
            console.log("로그인 성공:", data);
            alert("로그인이 완료되었습니다.");
            navigate('/'); // 로그인 후 홈으로 이동
        } catch (error) {
            console.error("예기치 않은 오류:", error);
            alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <LoginDiv2>
            <LoginDiv>
                <LoginH1>로그인</LoginH1>
                <AuthForm mode="login" onSubmit={SigninSubmit} />
                <LoginP>
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </LoginP>
            </LoginDiv>
        </LoginDiv2>
    );
};

export default Login;

export const LoginDiv2 = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-top: 50px;
`
const LoginDiv = styled.div`
display: flex;

flex-direction: column;
gap: 10px;
    width: 100%;
    max-width: 600px;
    box-shadow: rgba(0, 0, 0, 0.15) 0.5px 0.5px 10px;
    border-radius: 15px;
    padding: 50px 30px;
`
const LoginH1 = styled.h1`
font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin: 0px 0px 20px;
`
const LoginP = styled.p`
    text-align: center;
`
