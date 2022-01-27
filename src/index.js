import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './Components/AuthContext.js'

const AppWrapper = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')))
            setLoggedIn(true);
    }, [loggedIn]);

    function handleLogOut() {
        localStorage.removeItem("user");
        window.open("/login", "_self")
    }
    return (
        <AuthContext.Provider value={{ loggedIn, handleLogOut }}>
            <App />
        </AuthContext.Provider>
    )
}

ReactDOM.render(
    <AppWrapper />,
    document.getElementById('root')
)



