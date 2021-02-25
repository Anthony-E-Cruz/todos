import React, { useState, useRef } from 'react'
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { useHistory } from "react-router";

const Login = (data) => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const loginBtn = useRef(null);
  const emailInput = useRef(null);
  const pwInput = useRef(null);
  const history = useHistory();

  const validateEmail = (email) => {
    if (!email.length) {
      loginBtn.current.disabled = true;
    }
    if ((email.split(".").length !== 2 || email.split(".").length > 49 || email.split("@").length !== 2 || email.split("").includes(" ")) && email.length !== 0) {
      setEmailError("Not a valid email")
      emailInput.current.style.borderColor = "red"
      loginBtn.current.style.opacity = "50%"
      loginBtn.current.disabled = true;
    } else {
      emailInput.current.style.borderColor = "black"
      loginBtn.current.style.opacity = "100%"
      loginBtn.current.disabled = false;
      setEmail(email)
      setEmailError(null)
      setEmailError(null)
    }
  }

  const validatePassword = (password) => {
    if (!password.length) {
      loginBtn.current.disabled = true;
    }
    if ((password.length < 4 || password.length > 16) && password.length !== 0) {
      setPasswordError("Invalid password")
      pwInput.current.style.borderColor = "red"
      loginBtn.current.style.opacity = "50%"
      loginBtn.current.disabled = true;
    } else {
      pwInput.current.style.borderColor = "black"
      loginBtn.current.style.opacity = "100%"
      loginBtn.current.disabled = false;
      setPassword(password)
      setPasswordError(null)
    }
  }

  const handleLogin = (status) => {
    data.setAuthenticated(status)
    if (status) {
      history.push('/dashboard');
      setLoginError(null)
    } else {
      loginBtn.current.disabled = false;
      setLoginError("Invalid login credentials")
    }
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {

      loginBtn.current.disabled = true;
      // uncomment the line below to test button disable
      // await sleep(5000)
      let formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", requestOptions)
        .then(response => response.ok)
        .then(result => handleLogin(result))
    }
  }

  return !data.authenticated ? (
    <div className="form-outer-container">
      <div className="form-container">
        <h1 className="login-page-title">Rapptr Labs</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-label">
            <p>Email</p>
          </div>
          <div ref={emailInput} className="input-container">
            <BsFillPersonFill className="login-icon" />
            <input type="text"
              className="email-input"
              name="Email"
              placeholder="user@rapptrlabs.com"
              onChange={event => validateEmail(event.target.value)}
            />
          </div>
          <p className="error">{emailError}</p>
          <div className="input-label">
            <p>Password</p>
          </div>
          <div ref={pwInput} className="input-container">
            <BsFillLockFill className="login-icon" />
            <input type="password"
              className="password-input"
              name="password"
              placeholder="Must be at least 4 characters"
              onChange={event => validatePassword(event.target.value)}
            />
          </div>
          <p className="error">{passwordError}</p>
          <input
            ref={loginBtn}
            disabled={true}
            value="Login"
            type="submit"
            className="submit-bttn"
            onClick={handleSubmit}
          >
          </input>
        </form>
        <p className="login-error">{loginError}</p>
      </div>
    </div>
  ) : (
      null
    )
}

export default Login

