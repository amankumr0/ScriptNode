import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input, authServices, login } from '../../Component';
import { useDispatch } from 'react-redux';
import "./Register.css"


function Register() {
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const disptach = useDispatch();
    const registerHandle = async (data) => {
        setError("");
        try {
            const user = await authServices.createAccount(data);
            disptach(login({ userData: user }))
        } catch (error) {
            setError("Something went wrong")
        }
    }
    return (
        <div className='register-body'>
            <div className='register-container'>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit(registerHandle)}>
                    <Input label="Full Name" name="name" id="name" type="text" placeholder="name" {...register("name", {
                        required: true,
                    })} />
                    <Input label="Email" name="Email" id="email" type="email" placeholder="email" {...register("email", {
                        required: true,
                    })} />
                    <Input label="Password" name="password" id="password" type="password" placeholder="password"  {...register("password", {
                        required: true,
                    })} />
                    <button className='reg-form-btn' type='submit'>Sign Up</button>
                </form>
            </div>
        </div>

    )
}

export default Register