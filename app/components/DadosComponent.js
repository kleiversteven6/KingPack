/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Icon,
  Input,
  Label,
  Message,
  Modal,
  Segment,
  Select,
} from 'semantic-ui-react';
import DiceAnimate from './dice';
import img from '../../public/assets/maps/kdtable.jpg';
import './Dados.css';

let Box = null;
const MINIMO = 10;

export default function DadosComponent() {
  const [user, setUser] = useState({ id: 0, nombre: 'Jose', saldo: 500 });
  const [errorMsg, setErrorMsg] = useState('');
  const [inputs, setInputs] = useState({
    state: true,
    bet: false,
    total: false,
    parImpar: false,
  }); // Colores de error de los Inputs

  const [money, setMoney] = useState('');
  const [nDice, setNDice] = useState('2');
  const [betType, setBetType] = useState('total'); // ('par/impar'); ('total');
  const [bet, setBet] = useState([5, '¿', '?']); // [ 0: Total | 1: Par | 2: Impar ]

  const [resp, setResp] = useState({ total: '0', par: '', impar: '' });
  const [win, setWin] = useState({ show: false, msg: '', dados: '' });
  const [betDone, setBetDone] = useState(false);

  // Lanzar Dados
  async function RollBack() {
    setBetDone(false);
    if (validate(true)) {
      updateSaldo(user.saldo - money);
      setWin({ show: false, msg: '', dados: '' });
      setResp({ total: '?', par: '?', impar: '?' });

      const dados = await Box.roll(nDice).then(r => r);

      isWinner(dados);
      setModalResp();
      setBetDone(true);
    }
  }

  // Resultados
  function isWinner(dados) {
    switch (betType) {
      case 'total': {
        resp.total = dados.total;

        if (Number(dados.total) === Number(bet[0])) {
          const a = money * 3 - money + user.saldo;
          win.msg = `Prediccion Perfecta! +${money * 3}$`;
          updateSaldo(a);
          break;
        }

        if (
          Number(dados.total) === Number(bet[0]) - 1 ||
          Number(dados.total) === Number(bet[0]) + 1
        ) {
          win.msg = `Prediccion Aproximada. +${money * 1}$`;
          updateSaldo(user.saldo);
          break;
        }

        win.msg = 'Prediccion incorrecta.';
        break;
      }

      case 'par/impar': {
        let par = 0;
        let impar = 0;

        dados.sets[0].rolls.forEach(e => {
          if (e.value % 2 === 0) par += 1;
          else impar += 1;
        });

        resp.par = par;
        resp.impar = impar;

        if (Number(bet[1]) === par && Number(bet[2]) === impar) {
          const a = money * 3 - money + user.saldo;
          win.msg = `Prediccion Perfecta! +${money * 3}$`;
          updateSaldo(a);
        } else win.msg = 'Prediccion incorrecta.';

        break;
      }

      default:
        break;
    }
  }

  function updateSaldo(amount) {
    setUser({ saldo: amount });
  }

  function setModalResp() {
    const a = win.msg;
    let b;

    if (betType === 'total') b = `El total es ${resp.total}`;
    else b = `Pares: ${resp.par} | Impares: ${resp.impar}`;

    setWin({ show: true, msg: a, dados: b });
  }

  // Validacion
  function validate(x = false) {
    const err = [];

    // Validar Monto Apostado
    if (x && money === '') {
      err.push('• El monto a apostar debe ser un numero.');
      inputs.bet = true;
    } else if (x && Number(money) < MINIMO) {
      err.push(`• El monto minimo a apostar debe ser mayor a ${MINIMO}.`);
      inputs.bet = true;
    } else if (user.saldo - money < 0) {
      err.push('• El monto a apostar no puede ser mayor que su saldo.');
      inputs.bet = true;
    } else inputs.bet = false;

    // Validar Apuesta a Total
    if (x && betType === 'total') {
      inputs.total = false;

      switch (nDice) {
        case '2': {
          if (bet[0] < 2 || bet[0] > 12) {
            err.push(
              '• La apuesta a total con 2 dados no puede ser menor a 2 o mayor a 12.',
            );
            inputs.total = true;
          }
          break;
        }

        case '3': {
          if (bet[0] < 3 || bet[0] > 18) {
            err.push(
              '• La apuesta a total con 3 dados no puede ser menor a 3 o mayor a 18.',
            );
            inputs.total = true;
          }
          break;
        }

        case '4': {
          if (bet[0] < 4 || bet[0] > 24) {
            err.push(
              '• La apuesta a total con 4 dados no puede ser menor a 4 o mayor a 24.',
            );
            inputs.total = true;
          }
          break;
        }

        case '5': {
          if (bet[0] < 5 || bet[0] > 30) {
            err.push(
              '• La apuesta a total con 5 dados no puede ser menor a 5 o mayor a 30.',
            );
            inputs.total = true;
          }
          break;
        }

        default:
          break;
      }
    }

    // Validar Apuesta Par / Impar
    if (betType === 'par/impar') {
      if (x && bet[1] === '¿') {
        err.push(
          '• Debe seleccionar una apuesta Par e Impar para lanzar los dados.',
        );
        inputs.parImpar = true;
      } else inputs.parImpar = false;
    }

    // Todo chevere.
    if (err.length === 0) {
      setInputs({
        state: true,
        bet: false,
        total: false,
        parImpar: false,
      });

      setErrorMsg('');
      return true;
    }

    // Error AAAAAAAAAAAA
    inputs.state = false;
    setErrorMsg(
      <Message
        color="red"
        content={
          <>
            <h3>No se han podido lanzar los dados.</h3>
            <h4>Por favor corrija los siguientes inconvenientes</h4>
            <Divider />
            {err.map(e => (
              <p key={e}>{e}</p>
            ))}
          </>
        }
      />,
    );

    return false;
  }

  useEffect(() => {
    validate();
  }, [money, nDice, bet[0], betType]);

  // Inicializar
  useEffect(() => {
    let diceSize;

    if (window.innerWidth <= 991) diceSize = 65;
    else diceSize = 100;

    Box = new DiceAnimate('#dicebox', diceSize);
    Box.init();
  }, []);

  // Variables que honestamente me gustaria que no estuvieran aqui.
  // Muchas gracias eslint.
  useEffect(() => {
    setBet([bet[0], '¿', '?']);
  }, [nDice]);

  return (
    <>
      <Container>
        <h1>
          Dados en <i>4K</i>
        </h1>

        <Divider />
        {errorMsg}

        <Grid className="DadosComponent_TBL_txt" celled>
          {/* <== */}
          <Grid.Column computer={2} mobile={16}>
            <Grid.Row className="DadosComponent_BS0">
              <Grid.Column>
                <Button.Group className="DadosComponent_BG" vertical>
                  <Button content="Saldo" size="mini" />
                  <Button
                    basic
                    size="mini"
                    color="grey"
                    icon="dollar"
                    content={user.saldo}
                  />
                </Button.Group>

                <Divider className="DadosComponent_Divider" />
                <Button.Group
                  className="DadosComponent_BG"
                  vertical
                  size="mini"
                >
                  <Button
                    size="mini"
                    icon="money"
                    labelPosition="left"
                    content="Dinero a Apostar"
                    style={{ height: '36px' }}
                  />

                  <Button
                    basic
                    negative={inputs.bet}
                    color="grey"
                    style={{ height: '36px' }}
                  >
                    <Icon
                      size="large"
                      name="dollar"
                      style={{ float: 'left' }}
                    />
                    <Input
                      transparent
                      type="text"
                      size="huge"
                      value={money}
                      error={inputs.bet}
                      onChange={(e, { value }) => value >= 0 && setMoney(value)}
                      style={{ width: '50px' }}
                    />
                  </Button>
                </Button.Group>
              </Grid.Column>
            </Grid.Row>

            <Divider />
            <Grid.Row>
              <Button.Group
                className="DadosComponent_FullWidth"
                vertical
                size="mini"
              >
                <Button
                  size="mini"
                  icon="th list"
                  content="Cantidad de Dados"
                  labelPosition="left"
                  style={{ width: '100%' }}
                />

                <Button basic color="grey">
                  <Checkbox
                    radio
                    label="2"
                    value="2"
                    checked={nDice === '2'}
                    onChange={(e, { value }) => setNDice(value)}
                  />

                  <br className="DadosComponent_MobileHide" />
                  <span
                    className="DadosComponent_PcHide"
                    style={{ fontSize: '1.2rem', padding: '0 2% 0 2%' }}
                  >
                    |
                  </span>

                  <Checkbox
                    radio
                    label="3"
                    value="3"
                    checked={nDice === '3'}
                    onChange={(e, { value }) => setNDice(value)}
                  />

                  <br className="DadosComponent_MobileHide" />
                  <span
                    className="DadosComponent_PcHide"
                    style={{ fontSize: '1.2rem', padding: '0 2% 0 2%' }}
                  >
                    |
                  </span>

                  <Checkbox
                    radio
                    label="4"
                    value="4"
                    checked={nDice === '4'}
                    onChange={(e, { value }) => setNDice(value)}
                  />

                  <br className="DadosComponent_MobileHide" />
                  <span
                    className="DadosComponent_PcHide"
                    style={{ fontSize: '1.2rem', padding: '0 2% 0 2%' }}
                  >
                    |
                  </span>

                  <Checkbox
                    radio
                    label="5"
                    value="5"
                    checked={nDice === '5'}
                    onChange={(e, { value }) => setNDice(value)}
                  />
                </Button>
              </Button.Group>
            </Grid.Row>

            <Divider className="DadosComponent_MobileHide" />
            <Button
              className="DadosComponent_MobileHide"
              basic
              size="big"
              color="green"
              content="Jugar"
              negative={!inputs.state}
              onClick={() => RollBack()}
            />
          </Grid.Column>

          {/* |==| */}
          <Grid.Column computer={12} mobile={16}>
            <div
              id="dicebox"
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              {betDone && (
                <Button
                  className="DadosComponent_ModalButton"
                  primary
                  floated="left"
                  content="Ver Resultados"
                  onClick={() =>
                    setWin({ show: true, msg: win.dados, dados: win.msg })
                  }
                />
              )}
            </div>

            <Modal
              className="DadosComponent_ModalFix"
              basic
              size="mini"
              centered={false}
              open={win.show}
              mountNode={document.getElementById('dicebox')}
              onClose={() =>
                setWin({ show: false, msg: win.dados, dados: win.msg })
              }
              dimmer={{
                className: 'DadosComponent_ModalFix',
              }}
              content={
                <Segment secondary>
                  <h1>Resultados</h1>
                  <p>{win.dados}</p>
                  <p>{win.msg}</p>
                </Segment>
              }
            />
          </Grid.Column>

          {/* ==> */}
          <Grid.Column computer={2} mobile={16}>
            <Button
              className="DadosComponent_PcHide"
              size="massive"
              color="green"
              content="Jugar"
              negative={!inputs.state}
              onClick={() => RollBack()}
            />
            <Divider className="DadosComponent_PcHide" />

            <Button.Group
              className="DadosComponent_FullWidth"
              vertical
              size="mini"
            >
              <Button
                icon="wrench"
                content="Tipo de Apuesta"
                labelPosition="left"
              />

              <Select
                button
                compact
                defaultValue="total"
                onChange={(e, { value }) => setBetType(value)}
                options={[
                  { key: 't', value: 'total', text: 'Total' },
                  { key: 'p/i', value: 'par/impar', text: 'Par / Impar' },
                ]}
                style={{ height: '2.6rem' }}
              />
            </Button.Group>

            <Divider />
            {betType === 'total' ? (
              <Button.Group
                className="DadosComponent_FullWidth"
                vertical
                size="mini"
              >
                <Button
                  size="mini"
                  icon="bookmark"
                  content="Apuesta a Total"
                  labelPosition="left"
                />

                <Button
                  basic
                  color="grey"
                  negative={inputs.total}
                  style={{ height: '36px' }}
                >
                  <Icon
                    name="pencil alternate"
                    size="large"
                    style={{ float: 'left' }}
                  />
                  <Input
                    transparent
                    type="text"
                    size="huge"
                    value={bet[0]}
                    error={inputs.total}
                    style={{ width: '50px' }}
                    onChange={e =>
                      e.target.value <= 99 && setBet([e.target.value, '¿', '?'])
                    }
                  />
                </Button>
              </Button.Group>
            ) : (
              <Grid divided>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Button
                      className="DadosComponent_FullWidth"
                      size="mini"
                      icon="bookmark"
                      content="Apuesta a Par / Impar"
                      labelPosition="left"
                      negative={inputs.parImpar}
                    />
                  </Grid.Column>

                  <Grid.Column computer={16} mobile={8}>
                    <Button
                      className="DadosComponent_FullWidth"
                      basic
                      color="grey"
                      content="Seleccion de Par"
                      negative={inputs.parImpar}
                      style={{ fontSize: '0.9rem' }}
                    />

                    <Button
                      className="DadosComponent_FullWidth"
                      basic
                      color="grey"
                    >
                      <Label.Group className="DadosComponent_PIFix">
                        <Label
                          basic
                          value="0"
                          onClick={(e, { value }) =>
                            setBet([5, value, nDice - value])
                          }
                        >
                          0<br />
                          <Checkbox checked={bet[1] === '0'} />
                        </Label>

                        <Label
                          basic
                          value="1"
                          onClick={(e, { value }) =>
                            setBet([5, value, nDice - value])
                          }
                        >
                          1<br />
                          <Checkbox checked={bet[1] === '1'} />
                        </Label>
                      </Label.Group>

                      <Label.Group className="DadosComponent_PIFix">
                        <Label
                          basic
                          value="2"
                          onClick={(e, { value }) =>
                            setBet([5, value, nDice - value])
                          }
                        >
                          2<br />
                          <Checkbox checked={bet[1] === '2'} />
                        </Label>

                        <br />
                        {nDice >= 3 && (
                          <Label
                            basic
                            value="3"
                            onClick={(e, { value }) =>
                              setBet([5, value, nDice - value])
                            }
                          >
                            3<br />
                            <Checkbox checked={bet[1] === '3'} />
                          </Label>
                        )}
                      </Label.Group>

                      <Label.Group className="DadosComponent_PIFix">
                        {nDice >= 4 && (
                          <Label
                            basic
                            value="4"
                            onClick={(e, { value }) =>
                              setBet([5, value, nDice - value])
                            }
                          >
                            4<br />
                            <Checkbox checked={bet[1] === '4'} />
                          </Label>
                        )}

                        {nDice >= 5 && (
                          <Label
                            basic
                            value="5"
                            onClick={(e, { value }) =>
                              setBet([5, value, nDice - value])
                            }
                          >
                            5<br />
                            <Checkbox checked={bet[1] === '5'} />
                          </Label>
                        )}
                      </Label.Group>
                    </Button>
                  </Grid.Column>

                  <Grid.Column computer={16} mobile={8}>
                    <Button.Group className="DadosComponent_PItxtFix0" vertical>
                      <Button
                        className="DadosComponent_PItxtFix1"
                        color="vk"
                        content="Par"
                        negative={inputs.parImpar}
                      />
                      <Button basic color="grey" content={<b>{bet[1]}</b>} />
                    </Button.Group>

                    <Button.Group className="DadosComponent_PItxtFix0" vertical>
                      <Button
                        className="DadosComponent_PItxtFix1"
                        color="orange"
                        content="Impar"
                        negative={inputs.parImpar}
                      />
                      <Button basic color="grey" content={<b>{bet[2]}</b>} />
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}
