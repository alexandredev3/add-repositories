import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

// ele e o cabeçario
export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #40424f;
    line-height: 1.4;
    text-align: center;
    width: 450px;
  }
`;

export const Back = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 80%;
  transition: all 200ms;

  &:hover {
    color: #505361;
  }

  a {
    text-decoration: none;
    color: #21232b;
    font-weight: bold;
    font-size: 18px;
    transition: all 200ms;

    &:hover {
      color: #505361;
    }
  }
`;
