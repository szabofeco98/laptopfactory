import React from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import Auth from './container/auth/login/Auth';
import Registration from './container/auth/registration/Registration';
import {  BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {

 
  return (
  <BrowserRouter>
    <Layout>
        <Switch>
          <Route path="/login"  exact component={Auth}/>
          <Route path="/registration" exact component={Registration} />
          <Redirect path="/login" />
        </Switch>
    </Layout>
  </BrowserRouter>
   
  );
}

export default App;
