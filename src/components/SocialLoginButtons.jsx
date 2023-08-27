import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import axios from 'axios';

import firebaseAuth from '../utils/FirebaseConfig';
import { firebaseLoginRoute } from '../utils/APIRoutes';

export default function SocialLoginButtons() {
  const providers = {
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider(),
  };
  const navigate = useNavigate();

  const firebaseLogin = async (loginType) => {
    try {
      const provider = providers[loginType];
      const userData = await signInWithPopup(firebaseAuth, provider);

      const email = userData.user.email
        ? userData.user.email
        : userData.user.providerData[0].email;
      const { data } = await axios.post(firebaseLoginRoute, { email });

      if (data.status) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user),
        );
        navigate('/');
      } else {
        navigate('/setusername');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SocialLoginContainer>
      <button type="button" onClick={() => firebaseLogin('google')}>
        <BsGoogle />
      </button>
      <button type="button" onClick={() => firebaseLogin('github')}>
        <BsGithub />
      </button>
    </SocialLoginContainer>
  );
}

const SocialLoginContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 1rem;
  background-color: transparent;
  button {
    background-color: transparent;
    border: 0.1rem solid #4e0eff;
    font-size: 1.5rem;
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
