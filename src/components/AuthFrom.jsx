import React from 'react'

const AuthFrom = () => {
    const [formdata, setformdata] = ({
        email: "",
        password: "",
        nickname: "",
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
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formdata.id} name='id' placeholder='id를 입력하세요 ' />
                <input type="text" value={formdata.password} name='password' placeholder='id를 입력하세요 ' />
                <input type="text" value={formdata.nacknaem} name='nackname' placeholder='id를 입력하세요 ' />
                <button>회원가입</button>
            </form>
        </>

    )
}

export default AuthFrom