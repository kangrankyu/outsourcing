import React from 'react'
import AuthFrom from '../components/AuthFrom.JSX';
import { signUpNewUser, tablenickname } from '../auth/authapi';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

    const navigate = useNavigate();
    const SignupSubmit = async (formdata) => {
        try {
            const data = await signUpNewUser(formdata)

            const user = data;

            alert('회원가입이 완료되었습니다.');
            console.log(user)
            await tablenickname(formdata, user)

            navigate('/login')

        } catch (error) {
            alert('회원가입 중 오류가 발생했습니다: ' + error.message);
            console.log(error)
        }


    }
    return (
        <><div>Signup</div>
            <AuthFrom onSubmit={SignupSubmit} mode="signup" />
        </>
    )
}

export default Signup;