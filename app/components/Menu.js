import React, { useState } from 'react';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
export default function MenuComponent() {
  const [activeItem, setActiveItem] = useState('');
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu size="small" inverted>
      <Menu.Item
        name="inicio"
        active={activeItem === 'inicio' && true}
        onClick={handleItemClick}
        as={NavLink}
        to="/"
        key={1}
      >
        <Icon name="home" />
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
        <Icon name="calculator" />
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
        <Icon name="qrcode" />
        Generar QR
      </Menu.Item>
      <Menu.Item
        name="validar"
        active={activeItem === 'validar'}
        onClick={handleItemClick}
        as={NavLink}
        to="/validar"
        key={4}
      >
        <Icon.Group>
          <Icon name="qrcode" />
          <Icon name="check" color="black" size="mini" corner="bottom right" />
        </Icon.Group>
        Validar QR
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
      <Dropdown item text="Quinielas">
        <Dropdown.Menu>
          <Dropdown.Item
            icon="list"
            text="Equipos"
            as={NavLink}
            to="/equipos"
          />
          <Dropdown.Item
            icon="soccer"
            text="Grupos"
            as={NavLink}
            to="/grupos"
          />
          <Dropdown.Item icon="calendar alternate outline" text="Calendario" />
          <Dropdown.Item icon="flag checkered" text="Resultados" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}
