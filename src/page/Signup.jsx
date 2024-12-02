import React from 'react'
import AuthFrom from '../components/AuthFrom.JSX';
import { signUpNewUser } from '../auth/authapi';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate();
    const SignupSubmit = async (formdata) => {

        try {

            await signUpNewUser(formdata)
            alert('회원가입이 완료되었습니다.');
            navigate('/login')
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <><div>Singup</div>
            <AuthFrom onSubmit={SignupSubmit} />
        </>
    )
}

export default Signup;