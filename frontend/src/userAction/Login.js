import React from 'react';
import bg from "../assets/bg.jpg";
import { Link } from 'react-router'

const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-cover' style={{ backgroundImage: `url(${bg})` }}>
            <div className="max-w-xl rounded overflow-hidden shadow-lg max-h-2x1 w-full backdrop-blur-sm bg-black/15">
                <div className="box-border max-h-2x1 max-w-2x1 p-12 border-2">
                    <h1 className='text-center text-2x1 font-bold leading-9 tracking-tight text-white'>Login in to your account</h1>
                    <div className='md:mx-auto md:w-full md:max-w-full py-5'>
                        <form className='space-y-6' action='$' method='POST'>
                            <div>
                                <div className='mt-2'>
                                    <input
                                        id=''
                                        name='username'
                                        type='text'
                                        className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-gray-300 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                    />
                                </div>
                                <label htmlFor='username' className="block text-sm font-medium leading-6 text-white">
                                    Your Username
                                </label>
                            </div>
                            <div>
                                <div className='mt-2'>
                                    <input
                                        id=''
                                        name='password'
                                        type='password'
                                        className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-gray-300 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                    />
                                </div>
                                <label htmlFor='password' className="block text-sm font-medium leading-6 text-white">
                                    Your Password
                                </label>
                            </div>
                            <div>
                                <button type="submit" className='flex w-full justify-center rounded-md text-gray-800 bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
                            </div>
                            <div>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor='Remember Me' className='text-white px-6'>Remember Me</label>
                            </div>
                            <div>
                                <button type="submit" className='flex w-full justify-center rounded-md text-gray-800 bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Login;