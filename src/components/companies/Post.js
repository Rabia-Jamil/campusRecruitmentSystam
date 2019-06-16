import React, { Component } from 'react';
import axios from 'axios'
import swal from 'sweetalert'

class Post extends Component {
state = {
    data: [],
    position: "",
    fullname: "",
    experience: ""
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

  isFormEmpty = ({ fullname, position  }) => {
    return (
      !fullname.length ||
      !position.length
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
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  handleExperience = (event) => {
    this.setState({
      experience: event.target.value
    });
  };

  postData = () => {
    const {
      fullname,
      position,  
      experience,
    } = this.state;
      axios
        .post(`http://localhost:4000/api/company/jobs`, {
          fullname: fullname,
          position: position,
          experience: experience,
        })
        .then(res => {
          if (res.status === 200) {
            swal( "Your job application has been posted ");
          }
          this.setState({
            fullname: '',
            position: '',
          })
        })
        .catch(err => console.log(err));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.postData();
    }
  };

    render() { 
        const { position, fullname, experience} = this.state;
        return ( 
            <div className="container">
                <div className="row" style={{marginBottom: "20px"}}>
                    <div className="col-md-6 mt-5 mx-auto">
                        <form  onSubmit={this.handleSubmit} style={{border: "2px solid black" , padding: "25px",}}>
                            <h1 className="h3 mb-3 font-weight-normal text-center" style={{textDecoration: "underline",fontFamily: "cursive",}}> Post a Job</h1>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="fullname"
                                    placeholder="Enter Company Name"
                                    onChange={this.handleChange}
                                    value={fullname}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="position"
                                    placeholder="Enter Position"
                                    onChange={this.handleChange}
                                    value={position}
                                />
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
                            <center><button className="btn btn-warning" style={{fontFamily: "cursive"}}>Post Job</button></center>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Post;