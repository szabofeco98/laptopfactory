import React from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import Auth from './container/auth/login/Auth';
import Registration from './container/auth/registration/Registration';
import {  BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './container/Home/Home';
import UserList from './container/userlist/UserList';
import TaskList from './container/task/TaskList'
import ProductList from './container/products/ProductList';

function App() {
 
  return (
  <BrowserRouter>
              <Switch>
                 <Route path="/login"  exact component={Auth}/>
                 <Layout>
                    <Route path="/registration" exact component={Registration} />
                    <Route path="/Home" exact component={Home}/>
                    <Route path="/userlist" exact component={UserList}/>
                    <Route path="/taskList" exact component={TaskList}/>
                    <Route path="/productList" exact component={ProductList}/>
                 </Layout>
              </Switch>
  </BrowserRouter>
   
  );
}

export default App;
