import React, { Component } from 'react';
import axios from "axios";

class Applications extends Component {
    state = {
        data: []
      };
      componentDidMount() {
        axios.get("http://localhost:4000/api/student/jobs").then(res => {
          if (res.status === 200) {
            const userData = res.data.userData;
            this.setState({
              data: userData
            });
          }
        });
      }
    
      handleRemove = event => {
        event.preventDefault();
    
        if (this.props.userType === "admin") {
          axios
            .delete(`http://localhost:4000/api/student`, {
              data: { email: event.target.name }
            })
            .then(res => {
              if (res.status === 200) {
                axios.get("http://localhost:4000/api/student").then(res => {
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
    render() { 
        return ( 
            <div className="container">
            <div className="jumbotron mt-5" style={{border: "1px solid black"}}>
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center" style={{textDecoration: "underline", marginBottom: "30px", fontFamily: "cursive"}}>Applications</h1>
                </div>
                <table className="table table-striped">
                <thead className="thead-light">
                    <tr>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}> Name</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Email Address</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Job Position</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Experience</th>
                    </tr>
                </thead>

                {
                    this.state.data.map((item, index) => (
                        <tbody key={item._id}>
                            <tr>
                                <td>{item.firstName}</td>
                                <td>{item.email}</td>
                                <td>{item.jobPosition}</td>
                                <td>{item.experience} Year(s)</td>
                                {this.props.userType !== "admin" ? null : (
                                    <button
                                        className="btn btn-warning"
                                        type="submit"
                                        name={item.email}
                                        onClick={this.handleRemove}
                                    >
                                        Remove
                                    </button>
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
 
export default Applications;