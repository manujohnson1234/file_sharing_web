import React from "react";
import "./LoginForm.css";

export const SignUp = () => {
  return (
    <div id="login-form">
      <h1>SignUp</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <label htmlFor="conform-password">conform Password:</label>
        <input type="password" id="conform-password" name="confrom-password" />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
