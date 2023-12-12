import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authServices } from '../appwrite/AuthService';
import { login, logout } from '../Store/authSlice';
import { Container, SkeletonLoding } from './index';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css'

function Layout() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() => {
        const foo = async () => {
            try {
                const user = await authServices.getCurrentUser();
                if (user) {
                    dispatch(login({ userData: user }))
                } else {
                    dispatch(logout())
                }
            } catch (error) {
                console.log("Error:: APP :: usesEffetct")
            } finally {
                setLoading(false)
            }
        }
        foo();
    }, [])
    return (
        <>
            {
                loading ? (<Container><SkeletonLoding /></Container>) : <>
                    <Header />
                    <Outlet />
                </>
            }
        </>
    )
}

export default Layout