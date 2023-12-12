
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { authServices } from '../../appwrite/AuthService';
import { logout } from '../../Store/authSlice';
import './Header.css'
import { useState } from 'react';


function Header() {
    const user = useSelector(state => state.user.status)
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);

    const logoutHandle = async () => {
        try {
            await authServices.logout()
            dispatch(logout())
        } catch (error) {
            console.log("ERROR:: logoutHandler ::", error)
        }
    }
    return (
        <div className="nav-container">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/home" className='logo-link'>
                        <h1 className='logo'>ScriptNode</h1>
                    </Link>
                </div>
                <label className='check-label' htmlFor="check">
                    <i className='bx bx-menu menu-icon' style={{ color: "#e4ff00" }}  ></i>
                    <input className='responsive-check' type="checkbox" name="check" id="check" checked={check} onClick={() => { setCheck(prev => !prev) }} />
                    <div className="nav-item-containr">
                        <ul className="nav-ul">
                            <label htmlFor="check" className='hide-icon-label'>
                                <div className="hide-icon">
                                    <i className='bx bx-menu-alt-right menu-icon' style={{ color: "#e4ff00" }} ></i>
                                </div>
                            </label>
                            <li className="nav-li">
                                <NavLink
                                    to="/home"
                                    className={({ isActive }) => (`list ${isActive ? 'active-color' : ''}`)}
                                >
                                    Home
                                </NavLink>
                            </li>
                            {
                                user ? <>
                                    <li className="nav-li"><NavLink
                                        to="/add-blog"
                                        className={({ isActive }) => (`list ${isActive ? 'active-color' : ''}`)}
                                    >Add Blog</NavLink></li>
                                    <li className="nav-li"><NavLink
                                        to="/my-blog"
                                        className={({ isActive }) => (`list ${isActive ? 'active-color' : ''}`)}
                                    >My Blog</NavLink></li>
                                </> : <></>
                            }
                        </ul>
                        <div className="btn-container">
                            <div className="btn-container">
                                {user ? (<button onClick={logoutHandle} className='btn'>Logout</button>
                                )
                                    : (<>
                                        <button className='btn' onClick={() => { nevigate("/login") }}>Login</button>
                                        <button onClick={() => { nevigate("/signup") }} className='btn'>Signup</button>
                                    </>)
                                }
                            </div>
                        </div>
                    </div>
                </label>

            </nav>
        </div >
    )
}

export default Header