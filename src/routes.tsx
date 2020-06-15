import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

// BrowserRouter: e um roteamento para a WEB
// Switch: Ele vai chamar uma rota por vez.
// O react-router-dom ele tem o poder de chamar varias rotas de uma vez.
// Cada Route representa uma pagina da nossa aplicação.
// O exact server para fazer uma verificação de igualdade, ele so vai chamar aquela rota se ele tiver extamente uma barra

// :repository quer dizer que nos vamos receber um parametro na url.
