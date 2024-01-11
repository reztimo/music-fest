import bg from "../assets/bg.jpg";
import React, { useRef, useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/api";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%-]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                {
                    username: user,
                    password: pwd,
                    roles: ["User"],
                },
                {
                    header: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <Navigate to="/login" />
            ) : (
                <section>
                    <div className='flex justify-center items-center h-screen bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                        <div className="max-w-xl rounded overflow-hidden shadow-lg max-h-2x1 w-full backdrop-blur-sm bg-black/15">
                            <div className="box-border max-h-2x1 max-w-2x1 p-12 border-2">
                                <h1 className='text-center text-2x1 font-bold leading-9 tracking-tight text-white'>Register</h1>
                                <div className='md:mx-auto md:w-full md:max-w-full py-5'>
                                    <p ref={errRef} className={errMsg ? "errormessage" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                    <form onSubmit={handleSubmit} className='space-y-6'>
                                        <div>
                                            <label htmlFor='username' className="marker:tracking-tighter block text-sm font-medium leading-6 text-white">
                                                Username
                                                <span className={`${validName ? "valid" : "hide"} ml-1`}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                <span className={`${validName || !user ? "hide" : "invalid"} ml-1`}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                            </label>
                                            <div className='mt-2'>
                                                <input
                                                    type='text'
                                                    id='username'
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setUser(e.target.value)}
                                                    required
                                                    aria-invalid={validName ? "false" : "true"}
                                                    aria-describedby="uidnote"
                                                    onFocus={() => setUserFocus(true)}
                                                    onBlur={() => setUserFocus(false)}
                                                    className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-gray-300 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                                />
                                            </div>
                                            <p id="uidnote" className={`${userFocus && user && !validName ? "instructions" : "offscreen"} marker:tracking-tighter block text-sm font-medium leading-6 text-white`}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                4 to 24 characters.<br />
                                                Must begin with a letter.<br />
                                                Letters, numbers, underscores, hyphens, allowed.
                                            </p>
                                        </div>

                                        <div>
                                            <label htmlFor='password' className="block text-sm font-medium leading-6 text-white">
                                                Password
                                                <span className={`${validPwd ? "valid" : "hide"} ml-1`}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                <span className={`${validPwd || !pwd ? "hide" : "invalid"} ml-1`}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                            </label>
                                            <div className='mt-2'>
                                                <input
                                                    type='password'
                                                    id='password'
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    required
                                                    aria-invalid={validPwd ? "false" : "true"}
                                                    aria-describedby="pwdnote"
                                                    onFocus={() => setPwdFocus(true)}
                                                    onBlur={() => setPwdFocus(false)}
                                                    className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-gray-300 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                                />
                                                <p id="pwdnote" className={`${pwdFocus && !validPwd ? "instruction" : "offscreen"} marker:tracking-tighter block text-sm font-medium leading-6 text-white`}>
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    8 to 24 characters.<br />
                                                    Must include uppercase and lowercase letters, a number and special character.<br />
                                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hastag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="hyphen">-</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='confirm_pwd' className="block text-sm font-medium leading-6 text-white">
                                                Confirm Password
                                                <span className={`${validMatch && matchPwd ? "valid" : "hide"} ml-1`}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                <span className={`${validMatch || !matchPwd ? "hide" : "invalid"} ml-1`}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                            </label>
                                            <div className='mt-2'>
                                                <input
                                                    type='password'
                                                    id='confirm_pwd'
                                                    onChange={(e) => setMatchPwd(e.target.value)}
                                                    required
                                                    aria-invalid={validMatch ? "false" : "true"}
                                                    aria-describedby="confirmnote"
                                                    onFocus={() => setMatchFocus(true)}
                                                    onBlur={() => setMatchFocus(false)}
                                                    className='block w-full px-2 border-0 border-b-2 bg-transparent py-1.5 text-white border-gray-300 appearance-none dark:focus:border-white-800 focus:outline-none focus:ring-0 focus-text-white focus-border-blue-600 peer sm:text-sm sm:leading-6'
                                                />
                                                <p id="confirmnote" className={`${matchFocus && !validMatch ? "instruction" : "offscreen"} marker:tracking-tighter block text-sm font-medium leading-6 text-white`}>
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    Must match the first password input field.
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className='flex w-full justify-center rounded-md text-gray-800 bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' disabled={!validName || !validPwd || !validMatch ? true : false} type="submit">Register</button>
                                        </div>
                                        <div>
                                            <Link to="/login">
                                                <label className="block text-sm font-medium leading-6 text-white">Already have account?<a href="&" className='text-sm font-medium px-2 leading-6 text-white'>Login</a></label>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div >
                    </div >
                </section>
            )}
        </>
    );
};

export default Register;