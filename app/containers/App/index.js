/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { Container } from 'semantic-ui-react';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import CalculatePage from '../CalculatePage';
import GenerateQr from '../GenerateQr';
import ValidateQr from '../ValidateQr';
import MenuComponent from '../../components/Menu';
import GraphicsPage from '../GraphicsPage';
import ShortUrls from '../ShortUrls';

import UrlPage from '../UrlPage';
import DicePage from '../DicePage';
import GameBingo from '../Bingo';
import EquipmentPage from '../EquipmentPage';
import GroupsPage from '../GroupsPage';
import CalendarPage from '../CalendarPage';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <MenuComponent />

      <Container fluid>
        <Container textAlign="center" style={{ margin: '40px' }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/calculadora" component={CalculatePage} />
            <Route exact path="/generar" component={GenerateQr} />
            <Route exact path="/validar" component={ValidateQr} />
            <Route exact path="/dados" component={DicePage} />
            <Route exact path="/bingo" component={GameBingo} />

            <Route exact path="/graficas" component={GraphicsPage} />
            <Route exact path="/graficas/:id" component={GraphicsPage} />

            <Route exact path="/acortar" component={ShortUrls} />
            <Route exact path="/graficas/:id" component={GraphicsPage} />
            <Route exact path="/url/:short" component={UrlPage} />
            <Route exact path="/equipos" component={EquipmentPage} />
            <Route exact path="/grupos" component={GroupsPage} />
            <Route exact path="/calendario" component={CalendarPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </Container>
    </>
  );
}
