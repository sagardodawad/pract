/** @format */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "./users";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
const navigate=useNavigate();
  const hanldechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(user.email, user.password);

    const loguser = users.find((u) => u.email === user.email);
    const currentuser = {
      email: "",
      password: "",
    };
    if (loguser) {
      if (loguser.password === user.password) {
        currentuser.email = loguser.email;
        currentuser.password = loguser.password;
        localStorage.setItem("currentuser", JSON.stringify(currentuser));
        console.log(currentuser);
        navigate("/home");
      } else {
        alert("Invalid password");
      }
    } else {
      alert("User Not Found");
    }
  };
  return (

    <>
      <h1>log in</h1>
      <label htmlFor="email">email:</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => hanldechange(e)}
      />
      <label htmlFor="password">password:</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => hanldechange(e)}
      />

      <button type="button" onClick={handleSubmit}>
        Login
      </button>
    </>
  );
};

export default Login;
