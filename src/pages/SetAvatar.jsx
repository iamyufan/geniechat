import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // for displaying error messages
import 'react-toastify/dist/ReactToastify.css'; // for displaying error messages
import axios from 'axios';
import styled from 'styled-components';
import multiavatar from '@multiavatar/multiavatar';

import loader from '../assets/loader.gif';
import { setAvatarRoute } from '../utils/APIRoutes';

export default function SetAvatar() {
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

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
    if (!user) {
      navigate('/login');
    } else if (user.isAvatarImageSet) {
      navigate('/');
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        avatarImage: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.avatarImage;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user),
        );
        navigate('/');
      } else {
        toast.error('Error setting avatar. Please try again.', toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY),
      );
      const userName = user.username;

      const data = [];
      for (let i = 0; i < 4; i++) {
        const imagePrompt = `${userName}${Math.round(Math.random() * 1000)}`;
        const svgCode = multiavatar(imagePrompt);
        const base64 = btoa(svgCode);
        data.push(`data:image/svg+xml;base64,${base64}`);
      }

      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatar-container">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${
                  selectedAvatar === index ? 'selected' : ''
                }`}
                key={index}
              >
                <img
                  src={`${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                  className="avatar-img"
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatar-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.1s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    // &:hover {
    //   background-color: #4e0eff;
    // }
  }

  .submit-btn:hover,
  .submit-btn:focus,
  .submit-btn:active {
    background-color: #4e0eff;
  }
`;
