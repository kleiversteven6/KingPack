import { random } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  GridColumn,
  Header,
  Input,
  Segment,
  Select,
  Table,
} from 'semantic-ui-react';
import './CalculatePage.css';

// eslint-disable-next-line react/prop-types
export default function CalculatePage({ themevertical = false }) {
  const [bet, setBet] = useState('');
  const [format, setFormat] = useState('a');
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      logro: '',
      americano: 0,
      fraccionario: 0,
      decimal: 0,
    },
    {
      id: 2,
      logro: '',
      americano: 0,
      fraccionario: 0,
      decimal: 0,
    },
    {
      id: 3,
      logro: '',
      americano: 0,
      fraccionario: 0,
      decimal: 0,
    },
  ]);

  const [stats, setStats] = useState({
    mul: 0,
    dec: 0,
    ame: 0,
    fra: 0,
    ganancia: 0,
    total: 0,
  });

  let cont = 0;

  const toFrac = n => {
    let x = 1;
    let y = 1;
    let div;

    let x2 = 0;
    let y2 = 0;
    let div2;

    const res = Math.round((n - 1) * 100) / 100;
    let k = 0;
    let ok;

    while (0 < 1) {
      if (n - 1 <= 1 && n - 1 >= 0) {
        if (div !== res) {
          if (y <= 35) y += 1;
          else {
            x += 1;
            y = 1;
          }

          div = x / y;
        }

        if (div2 !== res) {
          if (y2 <= 35) {
            if (y2 === 25) y2 = 33;
            else y2 += 1;
          } else {
            x2 += 1;
            y2 = 1;
          }

          div2 = x2 / y2;

          const txtDiv = div2.toString();

          if (txtDiv.length > 4) {
            const aux = txtDiv.substring(0, 4);
            div2 = Number(aux);
          }
        }

        if (k < 100000) k += 1;
        else break;
      } else {
        if (div !== res) {
          if (x > y) y += 1;
          else {
            x += 1;
            y = 1;
          }

          div = x / y;
        }

        if (div2 !== res) {
          if (x2 > y2) y2 += 1;
          else {
            x2 += 1;
            y2 = 1;
          }

          div2 = x2 / y2;

          const txtDiv = div2.toString();

          if (txtDiv.length > 4) {
            const aux = txtDiv.substring(0, 4);
            div2 = Number(aux);
          }
        }

        if (k < 100000) k += 1;
        else break;
      }
    }
    if (div < div2) ok = `${x}/${y}`;
    else ok = `${x2}/${y2}`;

    return ok;
  };

  const toGring = n => {
    let ok = 0;

    if (n < 2) ok = -100 / (n - 1);
    else ok = (n - 1) * 100;

    return Math.round(ok);
  };

  const addQuote = () => {
    const d = new Date();

    setQuotes([
      ...quotes,
      {
        id: `${quotes.length} ${random()} ${d.getMilliseconds()}`,
        logro: '',
        americano: 0,
        fraccionario: 0,
        decimal: 0,
      },
    ]);
  };

  const deleteQuote = id => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  const editQuote = (id, e, v = '') => {
    setQuotes(prevQuotes =>
      prevQuotes.map(quote => {
        if (quote.id !== id) return quote;

        const f = v || format;
        const updatedQuote = { ...quote, logro: e };

        if (quote.logro === '') {
          updatedQuote.decimal = 0;
          updatedQuote.americano = 0;
          updatedQuote.fraccionario = 0;
          return updatedQuote;
        }

        switch (f) {
          case 'd': {
            if (e <= 1) return quote;
            updatedQuote.decimal = e.toFixed(2);
            updatedQuote.americano = toGring(e);
            updatedQuote.fraccionario = toFrac(e);
            break;
          }
          case 'a': {
            const ok = e < 0 ? 1 - 100 / e : 1 + e / 100;
            updatedQuote.decimal = ok.toFixed(2);
            updatedQuote.americano = e;
            updatedQuote.fraccionario = toFrac(ok);
            break;
          }
          case 'f': {
            const [x, y] = e.split('/');
            const well = Number(x) / Number(y) + 1;
            const z = Number(well.toFixed(2));
            updatedQuote.decimal = z.toFixed(2);
            updatedQuote.americano = toGring(z);
            updatedQuote.fraccionario = e;
            break;
          }
          default:
            break;
        }

        return updatedQuote;
      }),
    );
  };

  const runCont = () => {
    cont += 1;
    return cont;
  };
  useEffect(() => {
    const decimals = quotes
      .filter(quote => quote.logro !== '' && quote.logro !== 0)
      .map(quote => quote.decimal);

    const d = decimals.reduce((acc, val) => acc * val, 1);
    const a = d > 1 ? toGring(d) : 0;
    const f = d > 1 ? toFrac(d) : '0/0';
    const t = d > 1 ? d * bet : 0;

    const m =
      {
        d: d.toFixed(2),
        a,
        f,
      }[format] || 0;

    setStats({
      mul: m,
      dec: d.toFixed(2),
      ame: a,
      fra: f,
      ganancia: Math.round(t - (d > 1 ? bet : 0)),
      total: Math.round(t),
    });
  }, [quotes, bet]);

  function checkMobile() {
    if (window.innerWidth <= 991) return true;
    return false;
  }

  function checkTablet() {
    if (window.innerWidth > 991 && window.innerWidth < 1200) return true;
    return false;
  }
  const changeFormat = value => {
    setFormat(value);

    const updatedQuotes = quotes.map(quote => {
      if (quote.logro !== '' && quote.logro !== 0) {
        const newQuote = { ...quote };
        switch (value) {
          case 'd': {
            newQuote.logro = newQuote.decimal;
            break;
          }
          case 'a': {
            newQuote.logro = newQuote.americano;
            break;
          }
          case 'f': {
            newQuote.logro = newQuote.fraccionario;
            break;
          }
          default:
            break;
        }
        return newQuote;
      }
      return quote;
    });

    setQuotes(updatedQuotes);
  };
  const options = Array.from({ length: 15 }, (_, i) => {
    const value = (i + 1).toString();
    return { key: value, value, text: value };
  });

  return (
    <>
      <Grid>
        <Grid.Column computer={5} mobile={16}>
          <Segment raised>
            <Header>Calculadora</Header>
            <Grid stretched>
              <Grid.Row className="nopadded">
                <Grid.Column
                  width={6}
                  verticalAlign="middle"
                  textAlign="right"
                  className="inputsize nopadded"
                >
                  Formato:
                </Grid.Column>
                <Grid.Column computer={10} className="nopadded">
                  <Select
                    className="inputsize"
                    button
                    fluid
                    defaultValue={format}
                    onChange={(e, { value }) => {
                      setFormat(value);
                      changeFormat(value);
                    }}
                    options={[
                      { key: 'd', value: 'd', text: 'Decimal' },
                      { key: 'a', value: 'a', text: 'Americano' },
                      { key: 'f', value: 'f', text: 'Fraccion' },
                    ]}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="nopadded">
                <Grid.Column
                  width={6}
                  verticalAlign="middle"
                  textAlign="right"
                  className="inputsize nopadded"
                >
                  Cant. Apuestas:
                </Grid.Column>
                <Grid.Column computer={10} className="nopadded">
                  <Select
                    className="inputsize"
                    button
                    fluid
                    defaultValue="1"
                    onChange={(e, { value }) => {}}
                    options={options}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="nopadded">
                <Grid.Column
                  width={6}
                  verticalAlign="middle"
                  textAlign="right"
                  className="inputsize nopadded"
                >
                  Monto Apuesta:
                </Grid.Column>
                <Grid.Column width={10} className="nopadded">
                  <Input
                    className="inputsize "
                    fluid
                    type="number"
                    value={bet}
                    min={1}
                    onChange={e => setBet(e.target.value)}
                  />
                </Grid.Column>
              </Grid.Row>

              {/* <GridColumn computer={16} mobile={16}>
                <Grid textAlign="center">
                  <Grid.Row>
                     <Grid.Column computer={4} mobile={16}>
                  <Button.Group
                    fluid
                    vertical={!checkMobile() || !themevertical}
                    size={checkMobile() || themevertical ? 'mini' : 'small'}
                  >
                    <Button color="blue" content="Apuesta" />
                    <Button
                      basic
                      color="blue"
                      icon="dollar"
                      content={bet === '' ? '0' : bet}
                      size={checkMobile() || themevertical ? 'mini' : 'small'}
                    />
                  </Button.Group>
          </Grid.Column>] 

                    <Grid.Column computer={4} mobile={16}>
                      <Button.Group
                        fluid
                        vertical={!checkMobile() || !themevertical}
                        size={checkMobile() || themevertical ? 'mini' : 'small'}
                      >
                        <Button color="brown" content="Cuotas" />
                        <Button
                          basic
                          color="orange"
                          content={stats.mul === '' ? '0' : stats.mul}
                        />
                      </Button.Group>
                    </Grid.Column> 

                    <Grid.Column computer={4} mobile={8}>
                      <Button.Group
                        fluid
                        vertical={!checkMobile() || !themevertical}
                        size={checkMobile() || themevertical ? 'mini' : 'small'}
                      >
                        <Button color="yellow" content="Ganancia" />
                        <Button
                          basic
                          color="yellow"
                          icon="dollar"
                          content={stats.ganancia === '' ? '0' : stats.ganancia}
                        />
                      </Button.Group>
                    </Grid.Column>
                    <Grid.Column computer={4} mobile={8}>
                      <Button.Group
                        fluid
                        vertical={!checkMobile() || !themevertical}
                        size={checkMobile() || themevertical ? 'mini' : 'small'}
                      >
                        <Button color="green" content="A Cobrar" />
                        <Button
                          basic
                          color="green"
                          icon="dollar"
                          content={stats.total}
                        />
                      </Button.Group>
                    </Grid.Column>
                  </Grid.Row> 
                </Grid> */}
              {/* <Grid>
                     <Grid.Row>
                  <Grid.Column width={5}>
                    <Button.Group vertical>
                      <Button
                        className="CalculatePage_Btn1"
                        color="brown"
                        content={
                          checkMobile() ? 'Americano' : 'Cuota Total Americano'
                        }
                      />
                      <Button basic color="orange" content={stats.ame} />
                    </Button.Group>
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Button.Group vertical>
                      <Button
                        className="CalculatePage_Btn1"
                        color="brown"
                        content={
                          checkMobile() ? 'Fraccion' : 'Cuota Total Fraccionado'
                        }
                      />
                      <Button
                        basic
                        color="orange"
                        content={stats.fra === '' ? '0/0' : stats.fra}
                      />
                    </Button.Group>
                  </Grid.Column>
                  </Grid.Row>
                </Grid> 
              </GridColumn> */}
            </Grid>

            {/* <Container textAlign="center">
        <Button
          className="CalculatePage_PcHide"
          primary
          circular
          icon="plus"
          onClick={() => addQuote()}
        />
        </Container> */}

            <Table celled>
              {!checkMobile() && !themevertical && (
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      textAlign="center"
                      content="#"
                      className="inputsize nopadded "
                    />
                    <Table.HeaderCell
                      textAlign="center"
                      content="Resultados"
                      className="inputsize nopadded "
                    />
                    <Table.HeaderCell
                      textAlign="center"
                      content="Probabilidades"
                      className="inputsize nopadded "
                    />
                  </Table.Row>
                </Table.Header>
              )}
              <Table.Body>
                {quotes.map(row => (
                  <Table.Row key={row.id}>
                    <Table.Cell className="nopadded">{runCont()}</Table.Cell>
                    <Table.Cell className="nopadded">
                      <Select
                        className="inputsize"
                        button
                        fluid
                        defaultValue={1}
                        onChange={(e, { value }) => {}}
                        options={[
                          { key: 1, value: 1, text: 'Ganador' },
                          { key: 2, value: 1, text: 'Sin Efecto' },
                        ]}
                      />
                    </Table.Cell>
                    <Table.Cell className="nopadded">
                      <Input
                        size={checkMobile() || themevertical ? 'mini' : 'small'}
                        fluid
                        type={format === 'f' ? 'text' : 'number'}
                        value={row.logro}
                        onChange={e => editQuote(row.id, e.target.value)}
                      />
                    </Table.Cell>
                    {/* <Table.Cell>
                      <Button
                        icon="trash"
                        basic
                        size={checkMobile() || themevertical ? 'mini' : 'small'}
                        onClick={() => deleteQuote(row.id)}
                        color="red"
                      />
                </Table.Cell> */}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
        <Grid.Column computer={4} mobile={0} />
      </Grid>
    </>
  );
}
