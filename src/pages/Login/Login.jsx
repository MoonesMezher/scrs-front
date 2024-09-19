import { useState } from 'react'
import Logo from '../../assets/images/log.webp'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { API } from '../../api/index'; 
import ErrorResponse from '../../components/ErrorResponse/ErrorResponse';
import Loading from '../../components/Loading/Loading';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [error, setError] = useState();
    const [errorData, setErrorData] = useState([]);    
    const [loading, setLoading] = useState();

    const { pathname } = useLocation()

    const handleLogin = async () => {
        if(loading) {
            return;
        }
        setError('')
        setErrorData([])
        setLoading(true);
        if(pathname?.includes('login-admin')) {
            axios.post(API.ADMIN.LOGIN, { email, password })
                .then(res => {
                    if(res.data.state === 'success') {
                        localStorage.setItem('adminScrs', res.data.token)
                        location.reload(0);
                    }
                })
                .catch(err => {
                    if(err.response?.data?.state === 'failed') {
                        setError(err.response.data.message);
                        
                        if(err.response.data?.data && err.response.data.data.length > 0) {
                            setErrorData(err.response.data.data)
                        }
                    } else {
                        setError(err.message);
                    }
                })
                .finally(res => {
                    setLoading(false);
                })
        } else {
            axios.post(API.ACCOUNT.LOGIN, { email, password })
                .then(res => {
                    if(res.data.state === 'success') {
                        localStorage.setItem('owner', res.data.token)
                        location.reload(0);
                    }
                })
                .catch(err => {
                    if(err.response?.data?.state === 'failed') {
                        setError(err.response.data.message);
                        if(err.response.data?.data && err.response.data.data.length > 0) {
                            setErrorData(err.response.data.data)
                        }
                    } else {
                        setError(err.message);
                    }
                })
                .finally(res => {
                    setLoading(false);
                })
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] relative overflow-hidden flex justify-center items-center px-2 py-5"> 
            <form className="w-[100%] md:w-[500px] p-5 md:p-10 shadow-md bg-white z-50 rounded-md">
                <div className="w-[70px] h-[70px] rounded-full shadow-md overflow-hidden flex justify-center items-center mx-auto mb-5 img">
                    <img src={Logo} alt="logo-image" className="w-full h-full"/>
                </div>
                <label className="w-full mb-5 block">
                    <h1 className="font-medium text-[1.2rem] ms-1">Email</h1>
                    <input type="email" placeholder="Email" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  onChange={(e) => setEmail(e.target.value)}/>
                    <ErrorResponse error={errorData.find(e => e === 'email')}/>
                </label>
                <label className="w-full">
                    <h1 className="font-medium text-[1.2rem] ms-1">Password</h1>
                    <input type="password" placeholder="Password" className="mt-[11px] bg-[#F9F9F9] px-[18px] py-[13px] focus:outline-none focus:border-none outline-none border-none duration-300 shadow-md w-full"  onChange={(e) => setPassword(e.target.value)}/>
                    <ErrorResponse error={errorData.find(e => e === 'password')}/>
                </label>
                <ErrorResponse error={error}/>
                <Loading loading={loading}/>
                <div className="mt-10 bg-black w-fit text-white p-2 px-5 rounded-md mx-auto shadow-md cursor-pointer duration-300 hover:scale-105" onClick={handleLogin}>
                    login
                </div>
            </form>
        </div>
    )
}

export default Login