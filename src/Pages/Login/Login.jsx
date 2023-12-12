import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useReducer, } from 'react';
import { Link } from 'react-router-dom';
import { login, authServices, Input } from '../../Component/index';
import { useForm } from "react-hook-form"
import image from "../../assets/1490.gif"

const reducer = (state, action) => {
    switch (action.type) {
        case "error": {
            return {
                ...state,
                error: action.value
            }
        }
        case "loading": {
            return {
                ...state,
                loading: action.value
            }
        }
        default:
            return {

            }
    }

}

function Login() {
    const { register, handleSubmit } = useForm({
        defaultValue: {
            email: "",
            password: ""
        }
    });
    const initialState = { error: false, loading: false };
    const [state, reDispatch] = useReducer(reducer, initialState)
    console.log(state)
    const nevigate = useNavigate();
    const user = useSelector(state => state.user.status);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            nevigate("/home")
        }
    })

    const submitHandler = async (data) => {
        reDispatch({ type: "loading", value: true })
        try {
            reDispatch({ type: "error", value: false })
            const logiData = await authServices.login({ ...data });
            console.log(logiData)

            if (logiData) {
                const user = await authServices.getCurrentUser();
                dispatch(login({ userData: user }))
                nevigate("/home")
            }
        } catch (error) {
            console.log("catch found", error)
            reDispatch({ type: "error", value: true })
        }
        finally {
            reDispatch({ type: "loading", value: false })
        }
    }

    return (

        <div className="login-body">
            {state.loading ? <div className="loader"><img width={"40px"} src={image} alt="loder" /></div> : <div className='loader'></div>}
            <div className='login-container'>
                {state.error && <p>Something went wrong</p>}
                <form onSubmit={handleSubmit(submitHandler)} className='form-container'>
                    <Input label="Email" id="email" type="email" placeholder="email" {...register("email", { required: true })} />
                    <Input label="Password" id="password" type="password" placeholder="password" {...register("password", { required: true })} />
                    <button type="submit" className='form-btn'>Login</button>
                </form>
                <p className="register">
                    Don&apos;t have an account? <Link to="/signup">register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login