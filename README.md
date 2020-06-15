<<<<<<< HEAD
# Primeiro projeto React JS.

  "react-scripts": "3.4.1", - E aqui dentro que estar o WebPack e o babel.

    "start": "react-scripts start", - Quando nos estivermos em desenvolvimento
    "build": "react-scripts build", - Quando estivermos em produção, para ele gerar aquele Bundle
    "test": "react-scripts test", - Rodar os testes
    "eject": "react-scripts eject"  - Caso nos precisarmos de configurar alguma coisa
                                      mais avançada do webpack, babel, ele vai levar os arquivos que estão no react-scripts para a raiz do nosso projeto.


* Apague as configurações do EsLint do package.json, porque nos vamos configurar
ele do zero.

- Os manifests e para a criação de PWA (Proctions Web App) so remove se vc não for
usar.

- serviceWorker.tsx e especifico para PWA tambem.

## ESlint, Prettier & EditorConfig.

### EditorConfig
  - Coloque essas configurações no arquivo

    root = true

    [*]

    end_of_line = lf # Para força que o final das linhas sejam Inuz
    indent_style = space
    indent_size = 2
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = true

> yarn add eslint -D

  > yarn eslint --init


  ? How would you like to use ESLint? To check syntax, find problems, and enforce code style
  ? What type of modules does your project use? JavaScript modules (import/export)
  ? Which framework does your project use? React
  ? Does your project use TypeScript? Yes
  ? Where does your code run? Browser
  ? How would you like to define a style for your project? Use a popular style guide
  ? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
  ? What format do you want your config file to be in? JavaScript
  Checking peerDependencies of eslint-config-airbnb@latest
  ? The style guide "airbnb" requires eslint@^5.16.0 || ^6.8.0. You are currently using eslint@7.2.0.
    Do you want to downgrade? Yes
  The config that you have selected requires the following dependencies:
  ? Would you like to install them now with npm? Yes

  - Escolha essas opções se você quiser...

* O eslint sempre instala usando NPM, caso você esteja usando YARN você pode deletar
o arquivo package-lock.json

  > yarn
    - Rode esse comando, para ele atualizar as depedencias do yarn.lock

> yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D

  - babel-eslint: Eu estou instalando essa depedencia para dizer que eu estou usando
  a ultima versão do babel, as ultimas fucionabilidades do JS.

  - O eslint do Airbnb so permite escrever codigo JSX em arquivos que terminam com
  JSX
  Essa configurar vai tirar isso. Caso você esteja usando Typescript não tem necessidade de colocar essa configuração.

    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".jsx", ".js"] }
    ]
      - Ele vai mostrar um aviso, caso um arquivo que NÃO esteja nesta lista de
      extensions estiver usando JSX.

  ### Regras do ESlint

    rules": {
      "prettier/prettier": "error", -> Eu quero que todo o error que ele encontrar no codigo ele avise
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".tsx", ".ts"] }
      ],
      "import/prefer-default-export": "off"
        -> todo o arquivo que tiver um export ele vai obrigar colocar um export default, estou deixando isso off
    }

  ### No arquivo .prettierrc

    {
      "singleQuote": "true",  -> Para ele utilizar aspas simples
      "trailingComma": "es5"  -> Ele vai fazer que o prittier e o eslint se converse melhor.
    }

### Configurando pra typescript

  parserOptions: {
    project: './tsconfig.json', --> arquivo onde estar as configurações do Typescript
    ecmaFeatures: {
        "jsx": true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },

  - Ele não vai reconhecer o react-dom, baixe esse pacote:
    > yarn add @types/react-dom

## Roteamento no React

 > yarn add react-router-dom
  - E um modulo pronto do React para fazer as rotas,
  * Quando nos vamos para outra pagina da a aplicação o react nunca recarrega a
  pagina completamende.

## Styled-Components

> yarn add styled-components

- Baixe essa extensão no vscode para ele entender a sintaxe do css no styled-components
   -> vscode-styled-components

- Com essa biblioteca nos vamos criar componentes estilizados, tudo que nos queremos
estilizar, vai ser componentes estilizados.

- Nos podemos fazer encateamendo nos estilos.

- Nos podemos acessar propriedades do componente dentro do css.

## Estilos Globais

  - São estilos que se aplicam em todos os elementos, no body da aplicação.

  - Quando nos queremos um estilo compartilhado, nos criamos um global style no
  styled-components

  box-sizing:
    se algum elemento tiver 340px de width fixo e eu colocar 20px de padding ele 
    não vai ser 360px, ele permanace com 340px so que o conteudo desse elemento
    ele ser espremido para 320px de cada lado

  > yarn add react-icons
    - Ele vem com pacotes de icones mais famosos.

## Estilizando Main

 * Quando um componente tiver mais de DOIS NIVEIS de Encateamendo, e melhor criar
 outro componente de estilização, para entender melhor. 

 * Quando nos precisarmos estilizar alguma propriedade de um elemento, precisa 
 obrigatoriamente criar um novo componente de estilização.

## Adcionando Repositorios

- Nos vamos usar um module auxiliar para consumir a api, porque a fetch que e a 
padrão do navegador não tem algumas configs.

> yarn add axios

## Navegação de rotas

- Nos não podemos usar o metodo de navegação tradicional para trocar de pagina
usando um href. Nos precisamos usar um metodo do React-Router-Dom para fazer isso

http://localhost:3000/repository/alexandredev3/ecoleta-nlw01

* Sempre que tem uma barra na url, quer dizer que tem um endereço a mais.

* Então precisamos dar um encode no texto que vai o nome do repositorio.

````js
<Link to={`/repository/${encodeURIComponent(repository.name)}`}>
````
- O encodeURIComponent e um componente do javascript que vai fazer esse encode,
ele vai juntar o nome do github e o nome do repositorio.

http://localhost:3000/repository/alexandredev3%2Fecoleta-nlw01

- 3%2F e o simbulo da barra dentro de um encode

- la na nossa routes precisamos dizer que nos vamos receber um parametro.

````js
const Repository: React.FC<Props> = ({ match }) => {
  return (
    <Title>Repository: {decodeURIComponent(match.params.repository)}</Title>
  );
};
````
- decodeURIComponent: e para tirar o encoded.

````js
  const [repository, issues] = await Promise.all([
    // essas linhas vão ser feitas juntas, e so vai passar para a proxima linha depois que as duas finalizar
    // Retorna os dados do repositorio
    api.get(`/repos/${repoName}`),
    // Retorna os Issues do repositorio
    api.get(`/repos/${repoName}/issues`),
  ]);
````
  - Nos estamos fazendo isso porque, a primeira promise não tem necessidade de esperar a
  outra terminar para executar a proxima promise.

  - As promises estão dentro de uma array, a primeira promise vai esta na posição
  0 e a segunda promise esta na posição 1. Então eu posso desestruturar isso, a
  posição 0 vai ser o repository e a posição 1 vai ser os issues.

## Definindo PropTypes

> yarn add prop-types