import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Signin from './Signin';
import Signup from './Signup';
import UserInfo from './UserInfo';


const Topbar = () => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.clear();
        //clear storage
        navigate("/signin");

    }

    const goToHome = () => {
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-md">
                <div className="container-fluid">
                    <span className="navbar-brand" onClick={goToHome}>My Home</span>
                    <button aria-controls="hideNav" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#hideNav" className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="hideNav" className="collapse navbar-collapse" >
                        <ul className="navbar-nav">

                            <li className='nav-item'>
                                <Link to="/user/:username" className='nav-link'> User Details</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/signin' className='nav-link'> Sign in </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/signup' className='nav-link' > Sign up </Link>
                            </li>
                            <li className="nav-item">
                                <span onClick={signOut} className='nav-link'  > Sign out </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>

                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/user/:username" element={<UserInfo />} />

            </Routes>
        </div>
    );
}

export default Topbar;
