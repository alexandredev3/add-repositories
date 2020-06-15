// Como nos vamos usar esse container para outras partes da aplicação,
// podemos colocar esse Conteiner inteiro em um arquivo separado.
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 26px;
    display: flex;
    flex-direction: row; /*Ele deixa o icon na mesma posição do h1, horizontalmente*/
    align-items: center;
    justify-content: center;
    color: #2b2e3b;
  }

  svg {
    margin-right: 5px;
  }

  p {
    color: #ff4a3d;
    margin-top: 5px;
  }
`;

export default Container;
