/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { Container, Menu, Segment, Sidebar } from 'semantic-ui-react';
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
import TopMenu from '../../components/TopMenu';
import DicePage from '../DicePage';
import GameBingo from '../Bingo';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const URLactual = window.location;
  const url = URLactual.pathname.split('/');

  return (
    <>
      <GlobalStyle />
      {url[1] !== 'url' && (
        <TopMenu setVisible={setVisible} visible={visible} />
      )}

      <Sidebar.Pushable
        as={Segment}
        style={{
          minHeight: '100vh',
          flexFlow: 'column nowrap',
          top: '9vh',
        }}
      >
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="thin"
          fi
        >
          <MenuComponent />
        </Sidebar>
        <Sidebar.Pusher>
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
                <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
}
