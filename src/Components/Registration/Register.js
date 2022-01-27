import React, { useState } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'

import { Button, FormGroup, Form, Label, Alert } from "reactstrap";
import { Link } from 'react-router-dom'

//check props from inspect
function Register(props) {
    // States for registration
    const [form, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Handling the form element change
    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Handling the form submission
    const submitRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username,
                email: form.email,
                password: form.password
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    setSubmitted(true);
                    setError(false);
                      setValues({
                        username: '',
                        email: '',
                        password: ''
                    })
                } else {
                    setError(true);
                    setAlertMessage(response.errors[0].msg);
                  
                }
            })
            .catch(err => console.log(err))

    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h3>User {form.name} successfully registered!!</h3>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h3>{alertMessage}</h3>
            </div>
        );
    };

    return (
        <Container className="App">
            {submitted || error ?
                <Alert
                    color="primary"
                >
                    {errorMessage()}
                    {successMessage()}
                </Alert>
                :
                ''}
            <Row>
                <Col>
                    <Form onSubmit={submitRegister}>
                        <div>
                            <h2>User Registration</h2>
                        </div>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label
                                className="me-sm-2"
                            >
                                Username
                            </Label>
                            <Input
                                onChange={onChange} value={form.username === null ? '' : form.username}
                                name="username"
                                placeholder="..."
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label
                                className="me-sm-2"
                            >
                                Email
                            </Label>
                            <Input
                                onChange={onChange} value={form.email === null ? '' : form.email}
                                name="email"
                                placeholder="something@idk.cool"
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label
                                className="me-sm-2"
                            >
                                Password
                            </Label>
                            <Input
                                onChange={onChange} value={form.password === null ? '' : form.password}
                                name="password"
                                placeholder="don't tell!"
                                type="password"
                            />
                        </FormGroup>
                        <br />
                        <Button>
                            Register
                        </Button>
                        {' '}
                        <Link to="/login">
                            <Button color="primary">
                                Login
                            </Button>
                        </Link>

                    </Form>
                </Col>

            </Row>

        </Container>
    )
}

export default Register