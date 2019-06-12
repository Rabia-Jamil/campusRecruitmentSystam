import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './Login'
import Register from './Register'
import Student from './students/index';
import Admin from './admin/index'
import Company from './companies/index'

const Router = () => (
    <BrowserRouter>
      <Switch >
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" component = {Admin}  />
        <Route exact path="/student" component={Student} />
        <Route exact path="/company" component={Company}/>
      </Switch>
    </BrowserRouter> 
  );

  export default Router