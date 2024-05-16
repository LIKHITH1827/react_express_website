import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { useNavigate } from "react-router-dom";

function Signup() {

    const [username, setUsername] = useState("");
    const [password, setUserPassword] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("");
    const [error, setError] = useState(true);

    const history = useNavigate();

    const userRegistration = async (e) => {

        try {
            setError(true);
            let createUser = await axios.post(`/item/registernew`, { username, email, password, name });
            history('/signin');
        }
        catch (e) {
            setError(false);
        }

    }

    return (
        <div className='container my-text mt-2 mb-4'>


            <Form>
                <div className="row mb-2">
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => { setName(e.target.value) }} type='text' />
                    </Form.Group>
                    <Form.Group className='my-text' as={Col}>
                        <Form.Label className='my-text'>User Email</Form.Label>
                        <Form.Control className='my-text' value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" />
                    </Form.Group>

                    <Form.Group className='my-text' as={Col} >
                        <Form.Label className='boxx'>User Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => { setUserPassword(e.target.value) }} type="password" />
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" >
                    <Form.Label className='text box'>Username</Form.Label>
                    <Form.Control type='text' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </Form.Group>


                <Button className='myBtn' type="button" onClick={(e) => { userRegistration(e) }} variant="success">
                    Submit
                </Button>
            </Form>
            {error === false ? <Row>
                <h3 className='text text-warning'>User account present</h3>
            </Row> : null}
        </div>
    );
}

export default Signup;