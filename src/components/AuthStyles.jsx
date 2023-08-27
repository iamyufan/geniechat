import styled from 'styled-components';

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #170843;
  /* background: linear-gradient(-45deg, #ff7366, #36317b, #8f2a4b, #2673ac);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh; */

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h1 {
      color: white;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #090909ba;
    border-radius: 2rem;
    padding: 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #8255ff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #660eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  button:disabled {
    background-color: #870eff;
    color: #000010;
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #8255ff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default FormContainer;
