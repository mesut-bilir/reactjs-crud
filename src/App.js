import React from "react";
import { Container } from 'reactstrap';
import "./index.css";
import Home from "./Components/Home";
import MainNavbar from "./Components/MainNavbar";
import Login from "./Components/Registration/Login";
import Register from "./Components/Registration/Register";
import Customer from "./Customer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Container>
        <div className="jumbotron">
          <MainNavbar />
          <Router>
            <Routes>           
              <Route path="/" element={<Home />} />
              <Route path="/customer" element={<Customer />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
