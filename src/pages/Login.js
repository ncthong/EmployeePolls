import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import { handleLogin } from "../service/actions/authedUser";
// import React, { useState } from "react";
import '../login.css'; // Import file CSS
import PropTypes from "prop-types";

const Login = ({dispatch, loggedIn}) => {
    const [username, setUsername] = useState("thongnc");
    const [password, setPassword] = useState("abc321");

    if (loggedIn) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get("redirectTo");
        return <Navigate to={redirectUrl ? redirectUrl : "/"}/>;
    }

    const changeInput = (e, option) => {
        const value = e.target.value;
        option === "username" ? setUsername(value) : setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username ||  !password) {
            alert("Please input user name and password!");
            return;
        }
        dispatch(handleLogin(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <div className="wrapper fadeInDown">
          <div id="formContent">
            {/* Tabs Titles */}
            <h2 className="active" data-testid="login-heading">Sign In</h2>
    
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                id="login" 
                className="fadeIn second" 
                name="username" 
                placeholder="login" 
                value={username} 
                onChange={(e) => changeInput(e, "username")}
                data-testid="username"
              />
              <input 
                type="password" 
                id="password" 
                className="fadeIn third" 
                name="password" 
                placeholder="password" 
                value={password} 
                onChange={(e) => changeInput(e, "password")}
                data-testid="password"
              />
              <input 
                type="submit" 
                className="fadeIn fourth" 
                value="Log In" 
                data-testid="loginBtn"
              />
            </form>
                <div id="formFooter">
                <a className="underlineHover" href="#">Forgot Password?</a>
                </div>    
          </div>
        </div>
      );
};

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
