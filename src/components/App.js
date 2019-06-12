import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './Login'
import Register from './Register'
import Student from './students/index';
import Admin from './admin/index'
import Company from './companies/index'

class App extends Component {
  state = {
    login : false
}
  // componentDidMount() {
  //   localStorage.setItem('login',false)
  // }

  handleLoggedIn = () => {
    this.setState({
      login: true
    })
  }
  // handleLoggedIn = () => {   
  // const login = localStorage.getItem('login')
  // const parsedData = JSON.parse(login)
  // localStorage.setItem('login', true)
  // }
  render() {
    // const login = localStorage.getItem('login')
    // const parsedLogin = JSON.parse(login)
    // console.log(typeof(parsedLogin))
    const {login} = this.state;
    return (
      <BrowserRouter>
      {/* <div>
         <Route exact path="/"  render={(props) => <Login {...props} handleLoggedIn={this.handleLoggedIn} />}/>
         <Route exact path="/register" component={Register} />
        {  login ?  ( <Switch > 
              <Route exact path="/admin"  render={(props) => <Admin {...props} handleLoggedIn={this.handleLoggedIn} />}  />
              <Route exact path="/student" component={Student} />
              <Route exact path="/company" component={Company}/>
            </Switch> ) : <Redirect to="/"/>
        }              
      
      </div> */}
      <Switch>
         <Route exact path="/"  component={Login}/>
          <Route exact path="/register" component={Register} />
         <Route exact path="/admin"  component={Admin} />
        <Route exact path="/student" component={Student} />
         <Route exact path="/company" component={Company}/>
        }              
      
      </Switch>
    </BrowserRouter> 
    )
  
  }
}

export default App;
