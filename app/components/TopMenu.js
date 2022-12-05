/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react';
import { Icon, Image, Input, Menu } from 'semantic-ui-react';

export default function TopMenu({ setVisible, visible }) {
  return (
    <Menu fixed="top" className="top-menu">
      <Menu.Item className="logo-space-menu-item">
        <div className="display-inline logo-space">
          <p>King's Pack</p>
        </div>
      </Menu.Item>

      <Menu.Item className="no-border" onClick={() => setVisible(!visible)}>
        <Icon name="bars" />
      </Menu.Item>

      <Menu.Item className="no-border drop-left-padding">
        <Input className="icon" icon="search" placeholder="Search..." />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item className="no-border" position="right">
          <div className="display-inline">
            <Image
              circular
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            />
            King
          </div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
