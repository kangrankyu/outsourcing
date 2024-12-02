import React, { useState } from 'react'

const AuthFrom = ({ onSubmit, mode }) => {
    const [formdata, setformdata] = useState({
        email: "",
        password: "",
        nickname: ""
    });

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formdata)

    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formdata.email} name='email' placeholder='이메일을 입력하세요 ' onChange={handleChange} />
                <input type="password" value={formdata.password} name='password' placeholder='비밀번호을 입력하세요 ' onChange={handleChange} />
                {mode === "signup" && (<input type="text" value={formdata.nickname} name='nickname' placeholder='닉네임을 입력하세요 ' onChange={handleChange} />)}
                <button type='submit'>{mode === 'login' ? '로그인' : '회원가입'}</button>
            </form>
        </>

    )
};

export default AuthFrom;