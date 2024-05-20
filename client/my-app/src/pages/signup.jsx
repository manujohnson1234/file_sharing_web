import React ,{ useState } from "react";
import {registerData} from "../services/signupApi";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async(e)=>{
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);

    const response = await registerData(data);

    if(response.status >= 200 && response.status < 300){
      alert("Signup successful!");
      history.push("/login");

    }else{
      alert("Signup failed!");
    }
  }



  return (
    <div id="login-form">
      <h1>SignUp</h1>
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

        <label htmlFor="email">Email:</label>
        <input
        required
          type="email"
          id="email"
          name="email"
          value={formData.email}
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

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
        required
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
