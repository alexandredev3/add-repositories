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

export const IssueList = styled.ul`
  /*fazendo isso nos vamos ter uma borda bem no centro, entre o padding e a margin*/
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #dedede;
  /*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #dedede;
    border-radius: 6px;
    transition: all 200ms;

    &:hover {
      transform: scale(1.05);
    }

    /*So vai adicionar esse margin a partir do segundo item*/
    & + li {
      margin-top: 10px;
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #dedede;
    }

    div {
      /*Ele vai cobrir todo o espaço possivel, se tivesse um conteudo muito largo
      ele ia tentar passa da bordar, com esse flex: 1 ele não deixa isso acontecer*/
      flex: 1;
      margin-left: 20px;

      p {
        color: #505361;
        margin-top: 5px;
      }

      strong {
        font-size: 17px;

        a {
          color: #21232b;
          text-decoration: none;
          transition: all 200ms;

          &:hover {
            color: #505361;
          }

          span {
            background: #ff602b;
            color: #fff;
            border-radius: 10px;
            font-size: 13px;
            margin-left: 10px;
            font-weight: bold;
            height: 20px;
            padding: 4px;
            line-height: 10px;
          }
        }
      }
    }
  }
`;
