import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {  Menu  } from 'antd';
import {  UnorderedListOutlined, PlusCircleOutlined, HomeOutlined } from '@ant-design/icons';


class HeaderMenu extends Component {
    state = {
        current: 'home',
      };
    
      handleClick = e => {
        this.setState({ current: e.key });
      };
    
      render() {
        const { current } = this.state;
        return (
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">Accueil</Link>
            </Menu.Item>
            <Menu.Item key="list" icon={<UnorderedListOutlined />}>
              <Link to="/products/list">Liste des produits</Link>
            </Menu.Item>
            <Menu.Item key="add" icon={<PlusCircleOutlined />}>
              <Link to="/products/create">Ajouter un produit</Link>
            </Menu.Item>
          </Menu>
        );
      }
}

export default HeaderMenu