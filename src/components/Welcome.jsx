import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      if (!user) {
        navigate("/login");
      } else {
        setUsername(user.username);
      }
    };
    fetchUsername();
  }, [navigate]);
  return (
    <Container>
      <img src={Robot} alt="welcome-robot" />
      <h1>
        Welcome, <span>{username}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
