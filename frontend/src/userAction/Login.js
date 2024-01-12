import React, { useRef, useState, useEffect, useContext } from 'react';
import bg from "../assets/bg.jpg";
import { Link, Navigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import axios from "../api/api";
const LOGIN_URL = "/login";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                {
                    username: user,
                    password: pwd,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <Navigate to="/dashboard" />
            ) : (
                <section>
                    <div className='flex justify-center items-center h-screen bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                        <div className="max-w-xl rounded-lg overflow-hidden shadow-lg max-h-2x1 w-full bg-black/60">
                            <div className="box-border max-h-2x1 max-w-2x1 p-12 border-2 border-black">
                                <h1 className='text-center text-2x1 font-bold leading-9 tracking-tight text-white text-xl'>Login in to your account</h1>
                                <div className='md:mx-auto md:w-full md:max-w-full py-5 space-y-8'>
                                    <p ref={errRef} className={errMsg ? "errormessage" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                    <form onSubmit={handleSubmit} className='space-y-6'>
                                        <div>
                                            <label htmlFor='username' className="text-start block text-sm font-medium leading-6 text-white">
                                                Your Username
                                            </label>
                                            <div className='mt-2'>
                                                <input
                                                    type='text'
                                                    id='username'
                                                    ref={userRef}
                                                    autoComplete='off'
                                                    onChange={(e) => setUser(e.target.value)}
                                                    value={user}
                                                    required
                                                    className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-red-500 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='password' className="text-start block text-sm font-medium leading-6 text-white">
                                                Your Password
                                            </label>
                                            <div className='mt-2'>
                                                <input
                                                    type='password'
                                                    id='password'
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    value={pwd}
                                                    required
                                                    className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-red-500 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className='mt-14 space-y-6 flex w-full justify-center text-gray-800 bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
                                        </div>
                                        <div>
                                            <div className='flex items-center'>
                                                <input className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="" id="" />
                                                <label htmlFor='Remember Me' className='text-sm font-medium text-white px-3 content-start'>Remember Me</label>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="&" className='block text-sm font-medium text-white'>Forget Password?</a>
                                        </div>
                                        <div>
                                            <Link to="/register">
                                                <label className="block text-sm font-medium text-white">Already have account?<a href="&" className='text-sm font-medium px-2 leading-6 text-red-500 underline'>Don't have account?</a></label>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div >
                    </div >
                </section >
            )}
        </>
    );
};

export default Login;