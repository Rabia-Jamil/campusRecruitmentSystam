import React, { Component } from 'react';
import axios from "axios";
import swal from 'sweetalert'

class Jobs extends Component {
    state = {
        data: [],
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        jobPosition: '',
        experience: '',
        errors: [],
      };

      isFormValid = () => {
        let errors = [];
        let error;
    
        if (this.isFormEmpty(this.state)) {
          error = { message: "Fill in all fields" };
          this.setState({ errors: errors.concat(error) });
          return false;
        } else if (!this.isExperienceSelected(this.state)) {
          error = { message: "Select experience" };
          this.setState({ errors: errors.concat(error) });
          return false;
        } else {
          return true;
        }
      };
    
      isFormEmpty = ({ firstName, lastName, email, contact, jobPosition  }) => {
        return (
          !firstName.length ||
          !lastName.length ||
          !email.length ||
          !contact.length ||
          !jobPosition.length 
        );
      };

      isExperienceSelected = ({ experience }) => {
        if(experience === '') {
          return false;
        } else {
          return true
        }
      }

      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleExperience = (event) => {
        this.setState({
          experience: event.target.value
        });
      };

      componentDidMount() {
        axios.get("http://localhost:4000/api/company/jobs").then(res => {
          if (res.status === 200) {
            const userData = res.data.userData;
            this.setState({
              data: userData
            });
          }
        });
      }
    
      handleDelete = (event) => {
        event.preventDefault();
    
        if (this.props.userType === "admin") {
          axios
            .delete(`http://localhost:4000/api/company/jobs`, {
              data: { fullname: event.target.name }
            })
            .then(res => {
              if (res.status === 200) {
                axios.get("http://localhost:4000/api/company/jobs").then(res => {
                  if (res.status === 200) {
                    const userData = res.data.userData;
                    this.setState({
                      data: userData
                    });
                  }
                });
              }
            })
            .catch(err => console.log(err));
        }
      };

      postData = () => {
        const {
          firstName,
          lastName,
          email,
          contact,
          jobPosition,
          experience,
        } = this.state;
          axios
            .post(`http://localhost:4000/api/student/jobs`, {
              firstName: firstName,
              lastName: lastName,
              email: email,
              contact: contact,
              jobPosition: jobPosition,
              experience: experience
            })
            .then(res => {
              if (res.status === 200) {
                swal("You have Applied for the job");
                this.setState({
                  firstName: '',
                  lastName: '',
                  email: '',
                  contact: '',
                  jobPosition: '',
                })
              }
            })
            .catch(err => {
              swal(err.response.data.msg)
              console.log(err.response.data.msg);
            });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
          this.postData();
        }
      };


    render() { 
   //   console.log("userType",this.props.userType)
     // console.log("experience is",this.state.experience)
        const { data, firstName, lastName, email, jobPosition, contact, experience } = this.state;
        return ( 
            <div className="container">
            <div className="jumbotron mt-5" style={{border: "1px solid black"}}>
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center" style={{textDecoration: "underline", marginBottom: "30px", fontFamily: "cursive"}}>Jobs</h1>
                </div>
                <table className="table table-striped">
                <thead className="thead-light">
                    <tr>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Serial No.</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Company</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Position</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Experience</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Apply</th>
                    </tr>
                </thead>

                {
                    data.map((item, index) => (
                        <tbody key={item._id}>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.fullname}</td>
                                <td>{item.position}</td> 
                                <td>{item.experience} Year(s)</td> 
                                
                              {this.props.userType === "student" ? 
                                (
                                  <td> 
                                      <div>
                                          <button 
                                              style={{marginTop: "5px", fontFamily: "cursive"}}
                                              className="btn btn-warning"
                                              type="button"
                                              data-toggle="modal" 
                                              data-target="#exampleModal"
                                              >
                                              Apply
                                          </button>
                                          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                            <div className="modal-dialog" role="document">
                                              <div className="modal-content">
                                                <div className="modal-header">
                                                  <h5 className="modal-title" id="exampleModalLabel">Job Application Form</h5>
                                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                  </button>
                                                </div>
                                                <div className="modal-body">
                                                  <form id="modal-details"  onSubmit={this.handleSubmit}>
                                                    <div className="form-group">
                                                      <input className="form-control" onChange={this.handleChange} placeholder="First Name" value={firstName} type="text" name="firstName"/>
                                                    </div>
                                                    <div className="form-group">
                                                      <input className="form-control"  onChange={this.handleChange} placeholder="Last Name" value={lastName} type="text" name="lastName"/>
                                                    </div>
                                                    <div className="form-group">
                                                      <input className="form-control"  onChange={this.handleChange} placeholder="Email Address" value={email} type="email" name="email"/>
                                                    </div>
                                                    <div className="form-group">
                                                      <input className="form-control"  onChange={this.handleChange} placeholder="Contact Number" value={contact} type="text" name="contact"/>
                                                    </div>
                                                    <div className="form-group">
                                                      <input className="form-control"   onChange={this.handleChange} placeholder="Job Position" value={jobPosition} type="text" name="jobPosition"/>
                                                    </div>
                                                    <div className="form-group">
                                                      <select
                                                        className="form-control"
                                                        style={{width: "100%"}}
                                                        onChange={ this.handleExperience}
                                                        value={experience}
                                                      >
                                                        <option>Experience</option>
                                                        <option value="1">1 Year</option>
                                                        <option value="1.5">1.5 Years</option>
                                                        <option value="2">2 Years</option>
                                                      </select>
                                                    </div>
                                                  </form>
                                                </div>
                                                <div className="modal-footer">
                                                  <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{fontFamily: "cursive"}}>Close</button>
                                                  <button type="submit" form="modal-details" className="btn btn-warning" style={{fontFamily: "cursive"}}>Submit Form</button>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                       </td> 
                                      )
                                      : null }
                               
                                {this.props.userType !== "admin" ? null : (
                                  <td>
                                    <button
                                        className="btn btn-warning"
                                        type="submit"
                                        name={item.fullname}
                                        onClick={this.handleDelete}
                                        style={{fontFamily: "cursive"}}
                                    >
                                        Remove
                                    </button>
                                  </td>  
                                )}
                            </tr>
                        </tbody>
                    ))
                }
                </table>
            </div>
        </div>
         );
    }
}
 
export default Jobs;