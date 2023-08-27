import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // for displaying error messages
import 'react-toastify/dist/ReactToastify.css'; // for displaying error messages
import validator from 'validator'; // for validating email
import axios from 'axios';

import Logo from '../assets/logo.png';
import { registerRoute } from '../utils/APIRoutes';
import FormContainer from '../components/AuthStyles';
import SocialLoginButtons from '../components/SocialLoginButtons';

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  // if user is already logged in, redirect to home page
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, [navigate]);

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', toastOptions);
      return false;
    }
    if (username.length < 3) {
      toast.error('Username must be at least 3 characters long', toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long', toastOptions);
      return false;
    }
    if (!validator.isEmail(email)) {
      toast.error('Invalid email', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      } else {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user),
        );
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)} className="card">
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>GenieChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            disabled={
              values.username.length < 1 ||
              values.password.length < 1 ||
              values.email.length < 1 ||
              values.confirmPassword.length < 1
            }
          >
            Create User
          </button>
          <SocialLoginButtons />
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
