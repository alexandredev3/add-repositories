import { createGlobalStyle } from 'styled-components';

// Todo codigo css que for colocado aqui vai ser compartilhada com toda a aplicação.
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
    outline: 0;
  }

  html, border-style, #root {
    min-height: 100%;
  }

  body {
    background: #21232b;
    /*Tags para deixar as fonts mais suaves.*/
    -webkit-font-smoothing: antialiased !important;
      /*Important porque o navegador tenta tirar em alguns casos*/ 
    
  }

  body, input, button {
    color: #222;
    font-size: 14;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
