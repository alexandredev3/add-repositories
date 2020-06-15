/* eslint-disable camelcase */
import React, { Component } from 'react';
import { match, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, Back, IssueList } from './styles';

interface Params {
  repository: string;
}

interface Props {
  match: match<Params>;
}

interface RepositoryData {
  name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface State {
  repository: RepositoryData;
  issues: {
    id: string;
    title: string;
    html_url: string;
    user: {
      avatar_url: string;
      login: string;
    };
    labels: {
      id: string;
      name: string;
    }[];
  }[];
  loading: boolean;
}

export default class Repository extends React.Component<
  Props,
  State,
  RepositoryData
> {
  // Como isso e uma class podemos usar o static
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
      // param tambem e um objeto, porque ele tem o repository
    }).isRequired,
    // como o match tem um param e ele e um objeto, para definir um object e usando o shape
  };

  state: State = {
    repository: {} as RepositoryData, // como eu vou retorna um repositorio vou colocar um objeto
    issues: [], // como são varias vou iniciar como uma array
    loading: true,
    // estou iniciar o load como true, porque o DidMount ja vai executar quando a aplicação montar
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    // dentro dessa array vão todas as chamadas api que eu quero aguartar.
    const [repository, issues] = await Promise.all([
      // essas linhas vão ser feitas juntas, e so vai passar para a proxima linha depois que as duas finalizar
      // Retorna os dados do repositorio
      api.get(`/repos/${repoName}`),
      // Retorna os Issues do repositorio
      api.get(`/repos/${repoName}/issues`, {
        params: {
          // todos os params que eu passar aqui vai na url do issues
          state: 'open', // estou retornando os issues que não fora resolvidos ainda
          per_page: 6, // vou retorna 6 items
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FiRefreshCw size={65} color="#fff" />
        </Loading>
      );
    }
    // Ele so vai executar o codigo de baixo se o loading for false.
    /* Estou fazendo isso porque os dados abaixo vão ter as informações do repositorio 
      se os dados não forem carregados, a interface vai ficar muito feia.
    */

    return (
      <Container>
        <Owner>
          <Back>
            <FiArrowLeft color="#21232b" size={24} />
            <Link to="/">Go Back</Link>
          </Back>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map((issue) => {
            return (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a target="_blank" rel="noreferrer" href={issue.html_url}>
                      {issue.title}
                      {issue.labels.map((label) => {
                        return <span key={String(label.id)}>{label.name}</span>;
                      })}
                      {/* as labels são uma array por isso que estou fazendo um map */}
                    </a>
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            );
          })}
        </IssueList>
      </Container>
    );
  }
}

/* Para nos acessarmos o parametro que foi passado la no arquivo de main 
  podemos usar o props.match ou desestruturar.
*/

// decodeURIComponent para tirar o encoded
// O componente Owner vai mostrar alguns dados do dono do repositorio.
