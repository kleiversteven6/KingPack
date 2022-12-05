import React, { useState } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
export default function MenuComponent() {
  const [activeItem, setActiveItem] = useState('');
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <>
      <Menu.Item
        name="inicio"
        active={activeItem === 'inicio' && true}
        onClick={handleItemClick}
        as={NavLink}
        to="/"
        key={1}
      >
        <Icon name="home" size="big" />
        Inicio
      </Menu.Item>

      <Menu.Item
        name="calculadora"
        active={activeItem === 'calculadora'}
        onClick={handleItemClick}
        as={NavLink}
        to="/calculadora"
        key={2}
      >
        <Icon name="calculator" size="big" />
        Calculadora
      </Menu.Item>

      <Menu.Item
        name="generar"
        active={activeItem === 'generar'}
        onClick={handleItemClick}
        as={NavLink}
        to="/generar"
        key={3}
      >
        <Icon name="qrcode" size="big" />
        Generar Qr
      </Menu.Item>
      <Menu.Item
        name="validar"
        active={activeItem === 'validar'}
        onClick={handleItemClick}
        as={NavLink}
        to="/validar"
        key={4}
      >
        <Icon.Group size="big">
          <Icon name="qrcode" />
          <Icon name="check" color="black" size="mini" corner="bottom right" />
        </Icon.Group>
        <br />
        <br />
        Validar Qr
      </Menu.Item>
      <Menu.Item
        name="acortar"
        active={activeItem === 'acortar'}
        onClick={handleItemClick}
        as={NavLink}
        to="/acortar"
        key={5}
      >
        <Icon name="unlink" />
        Short Urls
      </Menu.Item>
    </>
  );
}
