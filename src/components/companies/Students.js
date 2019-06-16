import React, { Component } from 'react';
import axios from "axios";

class Students extends Component {
    state = {
        data: []
      };
      componentDidMount() {
        axios.get("http://localhost:4000/api/student/").then(res => {
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
            .delete(`http://localhost:4000/api/student`, {
              data: { email: event.target.name }
            })
            .then(res => {
              if (res.status === 200) {
                axios.get("http://localhost:4000/api/student/").then(res => {
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
        const { data } = this.state;
        return ( 
            <div className="container">
            <div className="jumbotron mt-5" style={{border: "1px solid black"}}>
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center" style={{textDecoration: "underline", marginBottom: "30px", fontFamily: "cursive"}}>Students</h1>
                </div>
                <table className="table table-striped">
                <thead className="thead-light">
                    <tr>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Serial No.</th>
                    <th scope="col" style={{fontWeight: "bold", fontSize: 20,}}>Student Name</th>
                    </tr>
                </thead>

                {
                    data.map((item, index) => (
                        <tbody key={item._id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.fullname}</td>
                                {this.props.userType === "admin" ? (
                                  <td>
                                      <button
                                          className="btn btn-warning"
                                          type="submit"
                                          name={item.email}
                                          onClick={this.handleDelete}
                                          style={{fontFamily: "cursive"}}
                                      >
                                          Remove
                                      </button>
                                    </td>
                                ) : null}
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
 
export default Students;