import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert'; 

class Login extends Component{
    state = {
        email: "",
        password: "",
        userType: "",
        errors: [],
      };

    handleuserType = (event) => {
      this.setState({
        userType: event.target.value
      });
    };
     
    isFormValid = () => {
      let errors = [];
      let error;
  
      if (this.isFormEmpty(this.state)) {
        error = { message: "Fill in all fields" };
        this.setState({ errors: errors.concat(error) });
        return false;
      } else if(!this.isUserSelected(this.state)) {
        error = { message: "Select a User type"}
        this.setState({errors: errors.concat(error)})
      }
       else {
        return true;
      }
    };
  
    isFormEmpty = ({ email, password }) => {
      return (
        !email.length ||
        !password.length 
      );
    };

    isUserSelected = ( {userType} ) => {
      if(userType === '') {
        return false;
      } else {
        return true
      }
    }
  
    displayErrors = errors =>
      errors.map((error, i) => <p key={i}>{error.message}</p>);
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      
      postData = () => {
        const {
          email,
          password,
        } = this.state;
    
        if (this.state.userType === "student") {
          axios
            .post(`http://localhost:4000/api/student/login`, {
              email: email,
              password: password,
              userType: "student"
            })
            .then(res => {
              console.log(res.status)
              if (res.status === 200) {
                //const data = res.data;         
                console.log(res.data)
                //return data
               // this.props.handleLoggedIn()             
                this.props.history.push({pathname: '/student', state: this.state.userType });   
                  console.log("userType is ",this.state.userType)   
              }
            })
            .catch(err => {
              swal(err.response.data.msg)
              console.log("userType is ",this.state.userType)
              console.log(err.response.data.msg)
            });
          }

          else if (this.state.userType === "company") {
            axios
              .post(`http://localhost:4000/api/company/login`, {
                email: email,
                password: password,
                userType: "company"
              })
              .then(res => {
                console.log(res.status)
                if (res.status === 200) {
                 // const data = res.data;
                  //return data
                 // this.props.handleLoggedIn() 
                  this.props.history.push({pathname: '/company', state: this.state.userType });  
                  console.log("userType is ",this.state.userType)
                }
               })
              .catch(err => {
                swal(err.response.data.msg)
                console.log("userType is ",this.state.userType)
                console.log(err.response.data.msg)
              });
            }

            else{
              axios
                .post(`http://localhost:4000/api/admin/login`, {
                  email: email,
                  password: password,
                  userType: "admin"
                })
                .then(res => {
                  if (res.status === 200) {
                    //const data = res.data;
                     //return data
                     //({pathname: "/contact", state:"rabia"})
                   //  this.props.handleLoggedIn()  
                     this.props.history.push({pathname: '/admin', state: this.state.userType });  
                    console.log("userType is ",this.state.userType)
                  }
                })
                .catch(err => {
                  swal(err.response.data.msg)
                  console.log("userType is ",this.state.userType)
                  console.log(err.response.data.msg);
                });
              }
      };
     
      handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
          this.postData();
        }
      };

    render () {
    //  console.log("userType is ",this.state.userType)
    //  console.log("logged in is ",this.props.handleLoggedIn)
        const { email, password, errors, userType } = this.state;
        return (
          <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-5 mt-5 mx-auto">
                        <form onSubmit={this.handleSubmit} >
                            <h1 className="h3 mb-3 font-weight-normal text-center" style={{textDecoration: "underline",fontFamily: "cursive",}}> Login</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="e.g   johnsmith@gmail.com"
                                    onChange={this.handleChange}
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={this.handleChange}
                                    value={password}        
                                />
                            <div className="form-group" style={{marginTop: "20px"}}>
                                <label htmlFor="password">Select User Type</label>
                                <select 
                                  className="form-control"
                                  onChange={ this.handleuserType}
                                  value={userType}
                                  style={{ width: "100%",}}>
                                  <option> Users </option>
                                  <option  value="admin">Admin</option>
                                  <option value="company">Company</option>
                                  <option value="student">Student</option>
                                </select>
                            </div>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-lg btn-warning btn-block" 
                                style={{fontFamily: "cursive"}}
                            >
                                 Login
                            </button>
                        </form>
                        {errors.length > 0 && (
                            <h5 className="text-center" style={{color: "red", margin: "10px"}}>
                            {this.displayErrors(errors)}
                            </h5>
                        )}
                        <p className="text-center" style={{marginTop: "15px", fontSize: "18px"}}>Don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)