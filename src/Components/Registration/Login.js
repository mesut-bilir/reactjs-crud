import React, { useState } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'

import { Button, FormGroup, Form, Label, Alert } from "reactstrap";
import { Link } from 'react-router-dom';

//check props from inspect
function Login(props) {
    const [form, setValues] = useState({
        email: '',
        password: ''
    })

    // States for checking the errors
    const [error, setError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitLogin = e => {
        e.preventDefault()
        fetch('http://localhost:8080/api/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        }).then(response => response.json())
            .then(response => {
                if (response.success) {
                    localStorage.setItem("user", JSON.stringify(response.accessToken));
                    window.open("/customer", "_self")
                } else {
                    setError(true);
                    setAlertMessage(response.errors[0].msg);
                }
            })
            .catch(err => console.log(err))
    }

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
            {error ?
                <Alert
                    color="primary"
                >
                    {errorMessage()}
                </Alert>
                :
                ''}

            <Row>
                <Col>
                    <Form onSubmit={submitLogin}>
                        <div>
                            <h2>Login</h2>
                        </div>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label
                                className="me-sm-2"
                            >
                                Email
                            </Label>
                            <Input
                                onChange={onChange} value={form.email === null ? '' : form.email}
                                name="email"
                                placeholder="something@gmail.com"
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
                            Login
                        </Button>
                        {' '}
                        <Link to="/">
                            <Button color="primary">
                                Forget Password
                            </Button>
                        </Link>

                    </Form>
                </Col>

            </Row>

        </Container>
    )
}

export default Login