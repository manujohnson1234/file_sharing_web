
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {authetication} from "../services/loginApi"
import "./LoginForm.css";

export const Login = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const {username, password} = formData;

    const data = {username, password};

    const response = await authetication(data);


    if(response && response.status >= 200 && response.status < 300 && response.success === true){
      navigate('/',{replace: true});
    }else{
      alert(response.data.message);
    }

    

  }
  
  return (
    <div id="login-form">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
