import React, { useState } from 'react'

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
      console.log(emailError)
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
      <h1>Rapptr Labs</h1>
      <div className="login-form">
        <p>Email</p>
        <input type="text"
          name="Email"
          placeholder="user@rapptrlabs.com"
          onChange={event => validateEmail(event.target.value)}
          className="email-input" />
        <p>{emailError}</p>
        <p>Password</p>
        <input type="text"
          name="password"
          placeholder="Must be at least 4 characters"
          onChange={event => validatePassword(event.target.value)}
          className="email-input" />
        <button onClick={handleSubmit}>Login</button>
        <p>{passwordError}</p>
      </div>
      {loginError}
    </div>
  )
}

export default Login

