import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderMenu from './components/HeaderMenu'
import ProductList from './views/ProductList'
import ProductInsert from './views/ProductInsert'
import ProductUpdate from './views/ProductUpdate'
import Home from './views/Home'
import { Layout, Typography } from 'antd'
import './App.css';

const { Content } = Layout
const { Title } = Typography

function App() {
  return (
    <Router>
      <HeaderMenu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products/list" exact component={ProductList} />
        <Route path="/products/create" exact component={ProductInsert} />
        <Route path="/products/update/:id" exact component={ProductUpdate} />
      </Switch>
    </Router>
  )
}

export default App;