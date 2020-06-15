import React, { Component, FormEvent, ChangeEvent } from 'react';
import { FiGithub, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

interface RepositoryData {
  name: string;
}

interface Props {}

interface State {
  newRepo: string;
  loading: boolean;
  repositories: RepositoryData[];
  errorMessage: boolean;
}

export default class Main extends React.Component<State, Props> {
  state: State = {
    newRepo: '',
    loading: false,
    repositories: [],
    errorMessage: false,
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

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // tirar aquele reload padrão do submit

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      const reponse = await api.get(`/repos/${newRepo}`);

      // informações do repositorio que vamos utilizar.
      const data = {
        name: reponse.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        // eu estou criando um novo state, copiando tudo que tinha no anterior e adcionando uma informação nova
        newRepo: '',
        loading: false,
        errorMessage: false,
      });
    } catch {
      this.setState({
        errorMessage: true,
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, loading, repositories, errorMessage } = this.state;
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
            placeholder="nickname/your repository"
            value={newRepo}
            onChange={this.handleInputChange}
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
        {errorMessage && (
          <p>
            Repository or User not found, it can also be an error with the
            connection...
          </p>
        )}

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
