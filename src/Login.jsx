import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setIsvalid] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const logged = await signInWithEmailAndPassword(auth, email, password);
      const user = logged.user;
      if (user) {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  function validatePassword(password) {
    if (password.length < 8) {
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      return false;
    }

    if (!/[a-z]/.test(password)) {
      return false;
    }

    if (!/\d/.test(password)) {
      return false;
    }

    return true;
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setIsvalid(false);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setIsvalid(false);
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__image"
          src="https://pngimg.com/uploads/amazon/amazon_PNG21.png"
          alt="Amazon logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" onChange={handleChangeEmail} value={email} />

          {valid ? (
            validateEmail(email) ? (
              ""
            ) : (
              <p style={{ color: "red", paddingBottom: "0.5rem" }}>
                Enter Valid Email
              </p>
            )
          ) : (
            ""
          )}

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
          />

          {valid ? (
            validatePassword(password) ? (
              ""
            ) : (
              <p style={{ color: "red", paddingBottom: "0.5rem" }}>
                Enter Valid Password
              </p>
            )
          ) : (
            ""
          )}

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sing In
          </button>
        </form>

        <p>
          By continuing, you agree to Rezis Amazons Conditions of Use and
          Privacy Notice.
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
