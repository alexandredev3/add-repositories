import React, { Component, FormEvent, ChangeEvent } from 'react';
import { FiGithub, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, ValidationContainer } from './styles';

interface RepositoryData {
  name: string;
}

interface Props {}

interface State {
  nickname: string;
  repo: string;
  loading: boolean;
  repositories: RepositoryData[];
  errorMessage: boolean;
  nicknameValidationError: boolean;
  repoValidationError: boolean;
}

export default class Main extends React.Component<State, Props> {
  state: State = {
    nickname: '',
    repo: '',
    loading: false,
    repositories: [],
    errorMessage: false,
    nicknameValidationError: false,
    repoValidationError: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    // se tiver alguma coisa dentro do repositories.
    // quer dizer que tinha alguma coisa la no localStorage.
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
      // agora estou convertendo os repositories em um objeto js.
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_: Props, prevState: State) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
      // se mudou eu vou adcionar no localStorage
      // estou convertendo ele em JSON, porque o localStorage não aceita arrays
    }
    // Estou verificando se o state anterior esta diferente do state atual.
  }
  // consegue acessar as atualizações que acontece no nosso estado

  handleInputChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ nickname: e.target.value });
  };

  handleInputChangeRepo = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ repo: e.target.value });
  };

  // eslint-disable-next-line consistent-return
  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // tirar aquele reload padrão do submit

    const {
      nickname,
      repo,
      repositories,
      nicknameValidationError,
      repoValidationError,
    } = this.state;

    if (nickname.length === 0) {
      return this.setState({
        nicknameValidationError: true,
        errorMessage: false,
      });
    }
    if (repo.length === 0) {
      return this.setState({ repoValidationError: true, errorMessage: false });
    }

    this.setState({ loading: true });

    try {
      const reponse = await api.get(`/repos/${nickname}/${repo}`);

      // informações do repositorio que vamos utilizar.
      const data = {
        name: reponse.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        // eu estou criando um novo state, copiando tudo que tinha no anterior e adcionando uma informação nova
        nickname: '',
        repo: '',
        nicknameValidationError: false,
        repoValidationError: false,
        loading: false,
        errorMessage: false,
      });
    } catch {
      this.setState({
        nicknameValidationError: false,
        repoValidationError: false,
        errorMessage: true,
        loading: false,
      });
    }
  };

  render() {
    const {
      nickname,
      repo,
      loading,
      repositories,
      errorMessage,
      nicknameValidationError,
      repoValidationError,
    } = this.state;
    // Estou fazendo uma desestruturação para não precisar colocar o this no input

    return (
      <Container>
        <h1>
          <FiGithub color="#2b2e3b" />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="your nickname on github"
            value={nickname}
            onChange={this.handleInputChangeNickname}
          />
          <input
            type="text"
            placeholder="name of your repository"
            value={repo}
            onChange={this.handleInputChangeRepo}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FiRefreshCw color="#fff" size={22} />
            ) : (
              <FiPlus color="#fff" size={28} />
            )}
            {/* Estou usando um condition render */}
          </SubmitButton>
        </Form>

        <ValidationContainer
          nicknameValidationError={nicknameValidationError}
          repoValidationError={repoValidationError}
        >
          {errorMessage && <p>Repository or User not found, try again.</p>}
          {nicknameValidationError ? (
            <span>*Field Required</span>
          ) : (
            <span>*Field Required</span>
          )}
          {repoValidationError ? (
            <span>*Field Required</span>
          ) : (
            <span>*Field Required</span>
          )}
        </ValidationContainer>

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
              {/* Nos estamos passando um parametro na url, para ele ir no repositorio
              que foi clicado */}
              {/* Agora la na pagina de repository podemos acessar essa informação. */}
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
