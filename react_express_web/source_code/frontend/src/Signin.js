import React from 'react';


import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
function Signin() {

    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("");
    const [isErr, SetIserr] = useState(false);
  
    const history = useNavigate();
  

    const UserLogin = async (e) => {
        try {
            SetIserr(false);
            let userData = await axios.post(`/item/login`, { password, username });
            let UserName = userData.data[0].username;
            localStorage.setItem("userName", UserName)
            history("/user/" + UserName);
        } catch (error) {
            SetIserr(true);
        }
    }

    return (
        <div className='mt-5 container  mb-3'>
            <Form>
                <Form.Group className="mt-1 mb-5">
                    <Form.Label className='text'>User Name</Form.Label>
                    <Form.Control value={username} onChange={(e) => { setUsername(e.target.value) }} type="text"  />  </Form.Group>
                <Form.Group className="mb-2 mt-1">
                    <Form.Label className='text text-primary'>User Password</Form.Label>
                    <Form.Control onChange={(e) => { setPassword(e.target.value) }}  type="password" value={password} />
                </Form.Group>

                <Button className='btn' type="button" onClick={(e) => { UserLogin(e) }} variant="success" >
                    Sign In
                </Button>
            </Form>
            {isErr === false ?null:
             <div className='mt-2 container row'>
                <h4 className='text-warning'>No User Found</h4>
            </div>}

        </div>
    );
}

export default Signin;




