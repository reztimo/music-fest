import React, { useRef, useState, useEffect } from 'react';
import bg from "../assets/bg.jpg";
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
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
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <Navigate to="/dashboard" />
            ) : (
                <section>
                    <div className='flex justify-center items-center h-screen bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                        <div className="max-w-xl rounded overflow-hidden shadow-lg max-h-2x1 w-full backdrop-blur-sm bg-black/15">
                            <div className="box-border max-h-2x1 max-w-2x1 p-12 border-2">
                                <h1 className='text-center text-2x1 font-bold leading-9 tracking-tight text-white'>Login in to your account</h1>
                                <div className='md:mx-auto md:w-full md:max-w-full py-5'>
                                    <p ref={errRef} className={errMsg ? "errormessage" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                    <form onSubmit={handleSubmit} className='space-y-6'>
                                        <div>
                                            <label htmlFor='username' className="block text-sm font-medium leading-6 text-white">
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
                                                    className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-gray-300 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='password' className="block text-sm font-medium leading-6 text-white">
                                                Your Password
                                            </label>
                                            <div className='mt-2'>
                                                <input
                                                    type='password'
                                                    id='password'
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    value={pwd}
                                                    required
                                                    className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-gray-300 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className='space-y-6 flex w-full justify-center rounded-md text-gray-800 bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
                                        </div>
                                        <div>
                                            <div className='flex items-center'>
                                                <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="" id="" />
                                                <label htmlFor='Remember Me' className='text-sm font-medium text-white px-3 content-start'>Remember Me</label>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="&" className='block text-sm font-medium leading-6 text-white'>Forget Password?</a>
                                        </div>
                                        <div>
                                            <Link to="/register">
                                                <label className="block text-sm font-medium leading-6 text-white">Already have account?<a href="&" className='text-sm font-medium px-2 leading-6 text-white underline'>Don't have account?</a></label>
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