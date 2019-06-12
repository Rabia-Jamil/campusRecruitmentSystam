import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import swal from 'sweetalert'
import axios from "axios";

class Register extends Component {
    state = {
        fullname: "",
        email: "",
        password: "",
        errors: [],
        userType: ""
      };
    
    handleuserType = (event) => {
      this.setState({
          userType : event.target.value
      })
  }
      isFormValid = () => {
        let errors = [];
        let error;
    
        if (this.isFormEmpty(this.state)) {
          error = { message: "Fill in all fields" };
          this.setState({ errors: errors.concat(error) });
          return false;
        } else if (!this.isPasswordValid(this.state)) {
          error = { message: "Password must contain atleast 6 characters" };
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
    
      isFormEmpty = ({ fullname, email, password,  }) => {
        return (
          !fullname.length ||
          !email.length ||
          !password.length 
        );
      };
    
      isPasswordValid = ({ password }) => {
        if (password.length < 6 ) {
          return false;
        } else {
          return true;
        }
      };

      isUserSelected = ({ userType }) => {
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
          userType,
          email,
          password,
          fullname,
        } = this.state;
    
        if (userType === "student") {
          axios
            .post(`http://localhost:4000/api/student/register`, {
              fullname: fullname,
              email: email,
              password: password,
            })
            .then(res => {
              if (res.status === 200) {
                this.props.history.push('/')
              }
            })
            .catch(err => {
              swal(err.response.data.msg)
              //console.log(err.response.data.msg);
            });
        } else if (userType === "company") {
          axios
            .post(`http://localhost:4000/api/company/register`, {
              fullname: fullname,
              email: email,
              password: password,
            })
            .then(res => {
              if (res.status === 200) {
                this.props.history.push('/')
              }
              // else if(res.status === 400){
              //   swal("The email address is already taken!")
              // } else {
              //   swal("Something went wrong. Please try again later!");
              // }
            })
            .catch(err => {
              swal(err.response.data.msg)
              //console.log(err.response.data.msg);
            });
        } else if (userType === "admin") {
          axios
            .post(`http://localhost:4000/api/admin/register`, {
              fullname: fullname,
              email: email,
              password: password,
            })
            .then(res => {
              console.log(res.data)
              if (res.status === 200) {
                this.props.history.push('/')
              }
            })
            .catch(err => {
              swal(err.response.data.msg)
              //console.log(err.response.data.msg)
            });
        }
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
          this.postData();
        }
      };

    render () {
        const {
            email,
            password,
            errors,
            fullname,
            userType,
          } = this.state;
console.log("userType is ", userType)
        return (
          <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-5 mt-5 mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal text-center" style={{textDecoration: "underline", fontFamily: "cursive"}}>Sign up</h1>
                            <div className="form-group">
                                <label htmlFor="full_name">Full Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="fullname"
                                    placeholder="e.g    John Smith"
                                    onChange={this.handleChange}
                                    value={fullname}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name"> Email Address</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="e.g   johnsmith@gmail.com"
                                    value={email}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Select User Type</label>
                                <select 
                                      className="form-control"
                                      onChange={ this.handleuserType}
                                      value={userType}
                                      style={{ marginBottom: "15px", width: "100%",}}>
                                      <option> Users </option>
                                      <option  value="admin">Admin</option>
                                      <option value="company">Company</option>
                                      <option value="student">Student</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-lg btn-warning outline btn-block" style={{fontFamily: "cursive"}}>
                                Sign up
                            </button>
                        </form>
                        {errors.length > 0 && (
                            <h5 className="text-center" style={{color: "red", margin: "10px"}}>
                            {this.displayErrors(errors)}
                            </h5>
                        )}
                         <p className="text-center" style={{marginTop: "15px", fontSize: "18px"}}>
                            Already have an account? <Link to="/">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Register)