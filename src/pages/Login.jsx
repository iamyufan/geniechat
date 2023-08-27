import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // for displaying error messages
import 'react-toastify/dist/ReactToastify.css'; // for displaying error messages
import axios from 'axios';

import Logo from '../assets/logo.png';
import { loginRoute } from '../utils/APIRoutes';
import FormContainer from '../components/AuthStyles';
import SocialLoginButtons from '../components/SocialLoginButtons';

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
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
    const user = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
    );
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, username } = values;
    const { data } = await axios.post(loginRoute, {
      username,
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
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            disabled={values.username.length < 1 || values.password.length < 1}
          >
            Log In
          </button>
          <SocialLoginButtons />
          <span>
            Don't have an account? <Link to="/register">Create one</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
