// import React from 'react'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const UserInfo = () => {
  
    const history = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setUserPassword] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("");
    useEffect(() => {

        LoggedinDetails();

    }, [])

    const LoggedinDetails = async () => {
        if (localStorage.getItem("userName")) {
            let userinfo = await axios.get(`/item/getDetails/${localStorage.getItem("userName")}`)
            setUsername(userinfo.data[0].username)
            setUserPassword(userinfo.data[0].password)
            setEmail(userinfo.data[0].email)
            setName(userinfo.data[0].name);
        }
        else {
            history("/signin");
        }
    }

    return (
        <div className='mybox container'>
            <h1 className='text text-danger'>Details</h1>
            <h4 className='text text-primary'>Name : {name}</h4>
            <h4 className='text text-primary'>Username: {username} </h4>
            <h4 className='text text-primary'>User Email: {email} </h4>
            <h4 className='text text-primary'>User Password: {password} </h4>
        </div>
    );
}

export default UserInfo;