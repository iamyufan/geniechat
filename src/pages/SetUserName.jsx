import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';

import { checkUserNameRoute, registerRoute } from '../utils/APIRoutes';
import debounce from '../utils/Debounce';
import firebaseAuth from '../utils/FirebaseConfig';
import FormContainer from '../components/AuthStyles';

export default function SetUserName() {
  const navigate = useNavigate();
  const [values, setValues] = useState('');
  const [label, setLabel] = useState('');
  const [usernameStatus, setUsernamStatus] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  onAuthStateChanged(firebaseAuth, (userData) => {
    if (!userData) {
      navigate('/login');
    } else {
      setEmail(
        userData.email ? userData.email : userData.providerData[0].email,
      );
    }
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, [navigate]);

  const checkUsername = async (username) => {
    if (username.length > 3) {
      const { data } = await axios.post(checkUserNameRoute, { username });
      setUsernamStatus(data.status);
      setLabel(data.msg);
      setValues(username);
    }
  };

  const handleChange = debounce((name) => checkUsername(name), 300);

  const validateForm = () => {
    if (values.length < 3) {
      toast.error(
        'username should be greater than 3 characters.',
        toastOptions,
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { data } = await axios.post(registerRoute, {
        username: values,
        email,
        password: (Math.random() + 1).toString(20).substring(1),
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user),
        );
        navigate('/');
      }
    }
  };

  return (
    <>
      <FormContainer>
        {email && (
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <span>Check Username Availability</span>
            <div className="row">
              <input
                className={`${
                  usernameStatus === true
                    ? 'status'
                    : usernameStatus !== undefined
                    ? 'danger'
                    : ''
                }`}
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e.target.value)}
                min="3"
              />

              <label
                htmlFor=""
                className={`${
                  usernameStatus
                    ? 'status'
                    : usernameStatus !== undefined
                    ? 'danger'
                    : ''
                }`}
              >
                {label}
              </label>
            </div>
            <button type="submit" className="btn">
              Create User
            </button>
          </form>
        )}
      </FormContainer>
      <ToastContainer />
    </>
  );
}
