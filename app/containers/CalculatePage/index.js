import { random } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  GridColumn,
  Icon,
  Input,
  Segment,
  Select,
  Table,
} from 'semantic-ui-react';
import './CalculatePage.css';

export default function CalculatePage() {
  const [bet, setBet] = useState('');
  const [dummy, setDummy] = useState('');
  const [format, setFormat] = useState('d');
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      logro: '',
      americano: 0,
      fraccionario: 0,
      decimal: 0,
    },
  ]);

  const [stats, setStats] = useState({
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

  const editQuote = (id, e) => {
    setDummy(e);

    const foundQuote = quotes.find(quote => quote.id === id);
    foundQuote.logro = e;

    foundQuote.decimal = 0;
    foundQuote.americano = 0;
    foundQuote.fraccionario = '0/0';

    if (foundQuote) {
      switch (format) {
        case 'd': {
          if (e > 1) {
            foundQuote.decimal = e;
            foundQuote.americano = toGring(e);
            foundQuote.fraccionario = toFrac(e);
          }

          break;
        }

        case 'a': {
          let ok;

          if (e < 0) ok = 1 - 100 / e;
          else ok = 1 + e / 100;

          foundQuote.decimal = ok;
          foundQuote.americano = e;
          foundQuote.fraccionario = toFrac(ok);

          break;
        }

        case 'f': {
          let x = '';
          let y = '';
          let flag = false;

          for (let k = 0; k < e.length; k += 1) {
            if (e.charAt(k) === '/') flag = true;
            else if (!flag) x += e.charAt(k);
            else y += e.charAt(k);
          }

          let well = Number(x) / Number(y) + 1;
          const thisThing = well.toString();

          if (thisThing.length > 4) {
            const sucks = thisThing.substring(0, 4);
            well = Number(sucks);
          }

          const z = Number(well);

          foundQuote.decimal = z;
          foundQuote.americano = toGring(z);
          foundQuote.fraccionario = e;

          break;
        }

        default:
          break;
      }
    }

    if (foundQuote.logro === '') {
      foundQuote.decimal = 0;
      foundQuote.americano = 0;
      foundQuote.fraccionario = 0;
    }
  };

  const runCont = () => {
    cont += 1;
    return cont;
  };

  useEffect(() => {
    let d = 1;
    let a = 0;
    let f = '0/0';
    let t = 0;

    for (let k = 0; k < quotes.length; k += 1) {
      d *= quotes[k].decimal;
    }

    if (d > 1) {
      a = toGring(d);
      f = toFrac(d);
      t = d * bet;
    }

    setStats({
      dec: d.toFixed(2),
      ame: a,
      fra: f,
      ganancia: Math.round(t - (d > 1 ? bet : 0)),
      total: Math.round(t),
    });
  }, [dummy, quotes, bet]);

  // TE ODIO ESLINT EN SERIO
  function checkMobile() {
    if (window.innerWidth <= 991) return true;
    return false;
  }

  function checkTablet() {
    if (window.innerWidth > 991 && window.innerWidth < 1200) return true;
    return false;
  }

  return (
    <>
      <Container>
        <h1>
          Calculadora en <i>8K</i>
        </h1>

        {/* ↑↑↑↑↑ */}
        <Segment secondary raised>
          <Grid relaxed="very">
            {/* |<==| */}
            <Grid.Column verticalAlign="middle" computer={5} mobile={16}>
              <Button.Group vertical={checkMobile() || checkTablet()}>
                <Button
                  className="CalculatePage_Btn0"
                  color="grey"
                  content="Formato"
                />
                <Select
                  button
                  defaultValue="d"
                  onChange={(e, { value }) => setFormat(value)}
                  options={[
                    { key: 'd', value: 'd', text: 'Decimal' },
                    { key: 'a', value: 'a', text: 'Americano' },
                    { key: 'f', value: 'f', text: 'Fraccion' },
                  ]}
                />
              </Button.Group>

              <br className="CalculatePage_PcHide" />

              <Button.Group
                vertical={checkMobile() || checkTablet()}
                style={{ paddingTop: '5%' }}
              >
                <Button
                  className="CalculatePage_Btn0"
                  color="grey"
                  content="Apuesta"
                />
                <Button style={{ backgroundColor: 'white' }}>
                  <Input
                    transparent
                    type="number"
                    value={bet}
                    onChange={e => setBet(e.target.value)}
                  />
                </Button>
              </Button.Group>
            </Grid.Column>

            {/* |==>| */}
            <GridColumn computer={11} mobile={16}>
              {/* ↑ */}
              <Divider className="CalculatePage_PcHide" />
              <Grid textAlign="center">
                <Grid.Row>
                  <Grid.Column computer={4} mobile={16}>
                    <Button.Group vertical={!checkMobile()}>
                      <Button
                        color="blue"
                        content="Monto Apostado"
                        style={{ width: '150px' }}
                      />
                      <Button
                        basic
                        color="blue"
                        icon="dollar"
                        content={bet === '' ? '0' : bet}
                      />
                    </Button.Group>
                  </Grid.Column>

                  <Grid.Column computer={4} mobile={16}>
                    <Button.Group vertical={!checkMobile()}>
                      <Button
                        color="yellow"
                        content="Ganancia Total"
                        style={{ width: '150px' }}
                      />
                      <Button
                        basic
                        color="yellow"
                        icon="dollar"
                        content={stats.ganancia === '' ? '0' : stats.ganancia}
                      />
                    </Button.Group>
                  </Grid.Column>

                  <Grid.Column computer={4} mobile={16}>
                    <Button.Group vertical={!checkMobile()}>
                      <Button
                        color="green"
                        content="Total a Cobrar"
                        style={{ width: '150px' }}
                      />
                      <Button
                        basic
                        color="green"
                        icon="dollar"
                        content={stats.total}
                      />
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider />

              {/* ↓ */}
              <Grid>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Button.Group vertical>
                      <Button
                        className="CalculatePage_Btn1"
                        color="brown"
                        content={
                          checkMobile() ? 'Decimal' : 'Cuota Total Decimal'
                        }
                      />
                      <Button
                        basic
                        color="orange"
                        content={stats.dec === '' ? '0' : stats.dec}
                      />
                    </Button.Group>
                  </Grid.Column>

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
            </GridColumn>
          </Grid>
        </Segment>

        {/* ↓↓↓↓↓ */}
        <Grid>
          <Grid.Row>
            <GridColumn>
              <Table striped>
                {/* ↑ */}
                <Table.Header className="CalculatePage_MobileHide">
                  <Table.Row textAlign="center">
                    <Table.Cell active width={2} content="ID" />
                    <Table.Cell active width={5} content="Cuota" />
                    <Table.Cell active width={2} content="Decimal" />
                    <Table.Cell active width={3} content="Americano" />
                    <Table.Cell active width={2} content="Fraccionado" />
                    <Table.Cell
                      active
                      width={2}
                      content={
                        <Button
                          primary
                          circular
                          icon="plus"
                          onClick={addQuote}
                        />
                      }
                    />
                  </Table.Row>
                </Table.Header>

                {/* ↓ */}
                <Table.Body>
                  {quotes.map(row => (
                    <Table.Row textAlign="center" key={row.id}>
                      <Table.Cell>Cuota {runCont()}</Table.Cell>
                      <Table.Cell
                        content={
                          <Input
                            type={format === 'f' ? 'text' : 'number'}
                            value={row.logro}
                            onChange={e => editQuote(row.id, e.target.value)}
                          />
                        }
                      />
                      <Table.Cell
                        content={
                          checkMobile() ? (
                            <Button.Group>
                              <Button
                                className="CalculatePage_Btn2"
                                color="instagram"
                                content="Decimal"
                              />
                              <Button
                                className="CalculatePage_Btn3"
                                basic
                                compact
                                color="blue"
                                content={row.decimal}
                              />
                            </Button.Group>
                          ) : (
                            row.decimal
                          )
                        }
                      />
                      <Table.Cell
                        content={
                          checkMobile() ? (
                            <Button.Group>
                              <Button
                                className="CalculatePage_Btn2"
                                color="instagram"
                                content="Americano"
                              />
                              <Button
                                className="CalculatePage_Btn3"
                                basic
                                compact
                                color="blue"
                                content={row.americano}
                              />
                            </Button.Group>
                          ) : (
                            row.americano
                          )
                        }
                      />
                      <Table.Cell
                        content={
                          checkMobile() ? (
                            <Button.Group>
                              <Button
                                className="CalculatePage_Btn2"
                                color="instagram"
                                content="Fraccion"
                              />
                              <Button
                                className="CalculatePage_Btn3"
                                basic
                                compact
                                color="blue"
                                content={row.fraccionario}
                              />
                            </Button.Group>
                          ) : (
                            row.fraccionario
                          )
                        }
                      />
                      <Table.Cell
                        content={
                          <Button
                            negative
                            animated="vertical"
                            onClick={() => deleteQuote(row.id)}
                          >
                            <Button.Content
                              visible
                              content={<Icon name="minus" />}
                            />
                            <Button.Content
                              hidden
                              content={<Icon name="trash" />}
                            />
                          </Button>
                        }
                      />
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              <Button
                className="CalculatePage_PcHide"
                primary
                circular
                icon="plus"
                onClick={addQuote}
              />
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}
