import React from "react";
import "./LoginStyles.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleClick(events) {
    events.preventDefault();
    axios
      .post(
        "http://140.119.19.16:8001/login/",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "X-CSRFToken":
              "98AcVKLrlGVptDY7oMFZUFjAJ0Gd2s1gS6g2Ik7v2c5vnIPZQtNBEWFnOt0LGgUK",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200)
          sessionStorage.setItem("key", response.data.key);
        console.log(response);
      })
      .catch(function (error) {
        if (error.response.status === 400)
          alert("Please check your email and password");
        console.log(error);
      });
  }

  return (
    <section>
      <motion.div
        className="ee"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-box">
          <div className="form-value">
            <form action="">
              <h2>Login</h2>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" required ref={emailRef} />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" required ref={passwordRef} />
                <label>Password</label>
              </div>
              <div className="forget">
                <label className="checkbox">
                  <input type="checkbox" /> Remember Me
                </label>
                <a className="forgot-password" href="#">
                  Forget Password
                </a>
              </div>

              <button onClick={handleClick}>Log in</button>
              <div className="register">
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default LoginPage;
