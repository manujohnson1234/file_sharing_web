
import React, {useState} from "react";
import {authetication} from "../services/loginApi"
import "./LoginForm.css";

export const Login = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const data = new FormData();
    data.append('username', formData.username);
    data.append('password', formData.password);

    const response = await authetication(data);

  }
  
  return (
    <div id="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
        required
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
