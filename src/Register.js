import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"; // Custom styles

const Register = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      if (!passwordRegex.test(e.target.value)) {
        setErrors({
          ...errors,
          password:
            "Password must be at least 6 characters long, include 1 uppercase letter, and 1 special character.",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }

    if (e.target.name === "confirmPassword") {
      if (e.target.value !== formData.password) {
        setErrors({
          ...errors,
          confirmPassword: "Passwords do not match!",
        });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!errors.password && !errors.confirmPassword && formData.password !== "") {
      alert("Registration successful!");
  
      //  Use setTimeout to ensure navigation works after alert
      setTimeout(() => {
        navigate("/login"); //  Ensure this matches your route in App.js
      }, 100);
    } else {
      alert("Please fix errors before submitting.");
    }
  };
  

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
      <header className="d-flex justify-content-between w-100 p-3">
        <h4 className="fw-bold">Game Addiction Control</h4>
      </header>
      <div className="d-flex justify-content-center align-items-center w-100">
        <div className="register-info me-5">
          <h2 className="fw-bold">Create an Account</h2>
          <p>Sign up now to be a part of our healthy gaming community</p>
        </div>
        <form className="register-box p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="fullName" placeholder="Enter your full name" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your email" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" placeholder="Choose a username" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter a password" onChange={handleChange} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </div>
          <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
