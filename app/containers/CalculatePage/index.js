import React, { useEffect, useState } from 'react';
import {
  Grid,
  Header,
  Input,
  Segment,
  Select,
  Modal,
  Button,
  Icon,
  List,
} from 'semantic-ui-react';
import './CalculatePage.css';

// eslint-disable-next-line react/prop-types
export default function CalculatePage() {
  const [bet, setBet] = useState('');
  const [format, setFormat] = useState('a');
  const [probabilidades, setProbabilidades] = useState(1);
  const [quotes, setQuotes] = useState([]);
  const [open, setOpen] = useState(false);

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
  /*
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
*/
  /* const deleteQuote = id => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  }; */

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
            updatedQuote.decimal = e;
            updatedQuote.americano = toGring(e);
            updatedQuote.fraccionario = toFrac(e);
            break;
          }
          case 'a': {
            const ok = e < 0 ? 1 - 100 / e : 1 + e / 100;
            updatedQuote.decimal = ok;
            updatedQuote.americano = e;
            updatedQuote.fraccionario = toFrac(ok);
            break;
          }
          case 'f': {
            const [x, y] = e.split('/');
            const well = Number(x) / Number(y) + 1;
            const z = Number(well);
            updatedQuote.decimal = z;
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
  const editResult = (id, e) => {
    setQuotes(prevQuotes =>
      prevQuotes.map(quote => {
        if (quote.id !== id) return quote;
        const updatedQuote = { ...quote, status: e };
        return updatedQuote;
      }),
    );
  };
  const runCont = () => {
    cont += 1;
    return cont;
  };
  useEffect(() => {
    const cuotas = Array.from({ length: probabilidades }, (_, i) => ({
      id: i,
      logro: '',
      americano: 0,
      fraccionario: 0,
      decimal: 0,
      status: 1,
    }));
    setQuotes(cuotas);
  }, [probabilidades]);

  useEffect(() => {
    const decimals = quotes
      .filter(quote => quote.logro !== '' && quote.logro !== 0)
      .map(quote => ({
        decimal: quote.decimal,
        status: quote.status,
      }));

    let total = 0;
    let s = 0;
    let d = 0;
    const a = 0;
    const f = 0;
    let td = 1;

    decimals.forEach(row => {
      if (row.decimal > 1) {
        s = row.status;
        let t = 0;

        switch (s) {
          case 1: {
            d = row.decimal;
            t = row.decimal * bet;
            break;
          }
          case 2: {
            d = 1;
            t = row.decimal * bet;
            break;
          }
          case 3: {
            d = 0.5;
            t = 0.5 * bet;
            break;
          }
          case 4: {
            const nd = (row.decimal - 1) / 2 + 1;
            d = nd;
            t = nd * bet;
            break;
          }
          default:
            t = 0;
            break;
        }
        td *= d;
        total += t;
      }
    });

    const m =
      {
        d: td,
        a,
        f,
      }[format] || 0;

    setStats({
      mul: m,
      dec: td.toFixed(2),
      ame: a,
      fra: f,
      ganancia: Math.round(total - (td > 1 ? bet : 0)),
      total: Math.round(td * bet),
    });
  }, [quotes, bet]);

  /* function checkTablet() {
    if (window.innerWidth > 991 && window.innerWidth < 1200) return true;
    return false;
  } */
  function checkMobile() {
    if (window.innerWidth <= 991) return true;
    return false;
  }

  const changeFormat = value => {
    setProbabilidades(1);
    // setFormat(value);

    /* const updatedQuotes = quotes.map(quote => {
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

    setQuotes(updatedQuotes); */
  };
  const options = Array.from({ length: 30 }, (_, i) => {
    const value = (i + 1).toString();
    return { key: value, value, text: value };
  });

  return (
    <>
      <Modal size="mini" open={open}>
        <Modal.Header>Informacion</Modal.Header>
        <Modal.Content>
          <List celled>
            <List.Item>
              <List.Content>
                <List.Header as="a">Ganador</List.Header>
                <List.Description>Ticket ganador</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as="a">Sin efecto</List.Header>
                <List.Description>
                  El cuota no tendra efecto sobre el ticket
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as="a">Media Perdida</List.Header>
                <List.Description>La cuota sera 0.5</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as="a">Media Ganancia</List.Header>
                <List.Description>La gancia sera la mitad</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        </Modal.Actions>
      </Modal>
      <Grid stretched>
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
                  <strong>Formato:</strong>
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
                  <strong>Cant. Apuestas:</strong>
                </Grid.Column>
                <Grid.Column computer={10} className="nopadded">
                  <Select
                    className="inputsize"
                    button
                    fluid
                    defaultValue="1"
                    onChange={(e, { value }) => {
                      setProbabilidades(value);
                    }}
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
                  <strong>Monto Apuesta:</strong>
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
            </Grid>

            <Grid className="nopadded">
              <Grid.Column className="nopadded">
                <Grid celled style={{ margin: 'auto !important' }}>
                  <Grid.Row>
                    <Grid.Column
                      textAlign="center"
                      width={2}
                      className="nopadded"
                    >
                      #
                    </Grid.Column>
                    <Grid.Column
                      textAlign="center"
                      width={8}
                      className="nopadded"
                    >
                      Resultados{' '}
                      <Icon
                        name="warning circle"
                        onClick={() => setOpen(true)}
                      />
                    </Grid.Column>
                    <Grid.Column
                      textAlign="center"
                      width={6}
                      className="nopadded"
                    >
                      Cuotas
                    </Grid.Column>
                  </Grid.Row>
                  {quotes.map(row => (
                    <Grid.Row key={row.id}>
                      <Grid.Column
                        textAlign="center"
                        width={2}
                        className="nopadded"
                      >
                        <strong>{runCont()}</strong>
                      </Grid.Column>
                      <Grid.Column width={8} className="nopadded">
                        <Select
                          className="inputsize"
                          button
                          fluid
                          defaultValue={row.status}
                          onChange={(e, { value }) => {
                            editResult(row.id, value);
                          }}
                          options={[
                            { key: 1, value: 1, text: 'Ganador' },
                            { key: 2, value: 2, text: 'Sin Efecto' },
                            {
                              key: 3,
                              value: 3,
                              text: 'Medida Perdida',
                            },
                            {
                              key: 4,
                              value: 4,
                              text: 'Media Ganancia',
                            },
                          ]}
                        />
                      </Grid.Column>
                      <Grid.Column width={6} className="nopadded">
                        <Input
                          size="mini"
                          fluid
                          type={format === 'f' ? 'text' : 'number'}
                          value={row.logro}
                          onChange={e => editQuote(row.id, e.target.value)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  ))}
                </Grid>
              </Grid.Column>
            </Grid>
            <Grid className="nopadded" celled>
              <Grid.Row>
                <Grid.Column
                  width={8}
                  textAlign="right"
                  className="nopadded inputsize"
                >
                  <strong>A cobrar:</strong>
                </Grid.Column>
                <Grid.Column width={8} className="nopadded inputsize">
                  <strong>{Number(stats.total).toLocaleString('es-VE')}</strong>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
        {!checkMobile() && (
          <Grid.Column computer={11} mobile={16}>
            <Segment>
              <Header>
                <strong>Publicidad</strong>
              </Header>
            </Segment>
          </Grid.Column>
        )}
      </Grid>
    </>
  );
}
