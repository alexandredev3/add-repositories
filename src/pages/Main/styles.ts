import styled, { keyframes, css } from 'styled-components';
// keyframes: são os mesmos do css
/* Css: E para caso nos queremos colocar um conjunto de css ao um elemento 
baseado em alguma propriedade que vem de fora */

interface Props {
  loading: boolean;
}

interface PropsValidation {
  nicknameValidationError: boolean;
  repoValidationError: boolean;
}

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row; /*Eu vou garantir que meu input e o icon fique um do lado do outro*/
  input {
    flex: 1; /*Ele vai ocupar o espaço inteiro.*/
    border: 1px solid;
    padding: 13px 15px;
    border-radius: 4px;
    transition: all 200ms;

    &:focus {
      border: 1px solid #9d9fa8;
    }

    & + input {
      margin-left: 10px;
    }
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const ValidationContainer = styled.div<PropsValidation>`
  color: #ff4a3d;
  margin-top: 5px;

  span {
    visibility: ${(props) =>
      props.nicknameValidationError ? 'visible' : 'hidden'};

    & + span {
      visibility: ${(props) =>
        props.repoValidationError ? 'visible' : 'hidden'};
      margin-left: 185px;
    }
  }
` as React.FC<PropsValidation>;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Consequimos acessar as propriedades desse elemento aqui.
export const SubmitButton = styled.button.attrs<Props>((props) => ({
  // Aqui podemos passa qualquer atributo que ele sera passado la pro nosso button
  type: 'submit',
  disabled: props.loading,
  // eu vou colocar a propriedade disabled baseado no loading
  // Se o loading estiver false o disabled vai estar false tbm
  // Se o loading estiver true o disabled tambem vai estar true
}))<Props>`
  transition: all 200ms;
  width: 60px;
  background: #21232b;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*Tudo que eu colocar aqui so vai ser aplicado se a tag tiver o disabled como true*/
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  /*Se o loading for true ele vai rodar os comando que estão depois do &&*/
  ${(props) =>
    props.loading
      ? css`
          svg {
            animation: ${rotate} 2s linear infinite;
          }
        `
      : css`
          &:hover {
            background: #30323d;
          }
        `}
` as React.FC<Props>;

export const List = styled.ul`
  list-style: none;

  li {
    padding: 12px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /*para garantir que o texto e a li de tamanhos diferentes tenha o mesmo alinhamento
    verticalmente*/
    align-items: center;
    & + li {
      border-top: 1px solid #dedede;
    }
    /*& + li: Ele vai adiconar essa estilização em todos os li's menos no primeiro*/
  }
  a {
    transition: all 200ms;
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    background: #21232b;
    padding: 7px;
    border-radius: 4px;
    &:hover {
      background: #30323d;
    }
  }
`;
