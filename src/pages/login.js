import React, { useState } from 'react'
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";

const Login = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [logedIn, setLogedIn] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [loginError, setLoginError] = useState(null);

  const validateEmail = (email) => {
    if ((email.split(".").length !== 2 || email.split("@").length !== 2) && email.length !== 0) {
      setValidEmail(false)
      setEmailError("invalid email")
    } else {
      setEmailError(null)
      setEmailError(null)
      console.log(emailError)
    }
  }

  const validatePassword = (password) => {
    if (password.length < 4 && password.length !== 0) {
      setValidPassword(false)
      setPasswordError("invalid Pass")
    } else {
      setValidPassword(true)
      setPasswordError(null)
    }
  }

  const handleSubmit = () => {
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", requestOptions)
      .then(response => response.text())
      .then(result => setLoginError(JSON.parse(result).message))
      .catch(error => console.log('error', error));
  }


  return (
    <div className="form-container">
      <h1 className="login-page-title">Rapptr Labs</h1>
      <div className="login-form">
        <div className="input-label">
          <p>Email</p>
        </div>
        <div className="input-container">
          <BsFillPersonFill />
          <input type="text"
            className="email-input"
            name="Email"
            placeholder="user@rapptrlabs.com"
            onChange={event => validateEmail(event.target.value)}
            className="email-input" />
        </div>
        <p className="error">{emailError}</p>
        <div className="input-label">
          <p>Password</p>
        </div>
        <div className="input-container">
          <BsFillLockFill />
          <input type="text"
            className="password-input"
            name="password"
            placeholder="Must be at least 4 characters"
            onChange={event => validatePassword(event.target.value)}
            className="email-input" />
        </div>
        <br />
        <button className="submit-bttn" onClick={handleSubmit}>Submit</button>
        <p className="error">{passwordError}</p>
      </div>
      {loginError}
    </div>
  )
}

export default Login

