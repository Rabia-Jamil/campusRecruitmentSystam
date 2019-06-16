import React, { Component } from 'react';
import Jobs from "./Jobs";
import Header from '../Header'
import Companies from "./Companies";

class Student extends Component {
    state = {
        jobs: [],
        companies: [],
        componentToShow: "jobs",
      };
      
      handleComponent = (event) => {
        if (event.target.name === "jobs") {
          this.setState({
            componentToShow: "jobs"
          });
        } else {
          this.setState({
            componentToShow: "companies"
          });
        }
      };
    render() { 
        return ( 
          <div className="container-fluid">
            <Header/>
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="text-center" style={{fontWeight: "bold", marginTop: "20px", fontFamily: "cursive", borderBottom: "6px solid #ffc107"}}>Welcome Student!</h3>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="row" style={{ border: "6px solid #ffc107"}}>
                      <div className="col-3" style={{marginTop: "50px", }}>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" href="#dashboard" aria-orientation="vertical">
                          <a className="nav-link  btn-outline-warning  active" id="v-pills-home-tab" data-toggle="pill" href="#dashboard" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="jobs" role="tab" aria-controls="v-pills-home" aria-selected="true">View Jobs</a>
                          <a className="nav-link  btn-outline-warning " id="v-pills-profile-tab" data-toggle="pill" href="#dashboard" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="companies" role="tab" aria-controls="v-pills-profile" aria-selected="false">View Companies</a>
                        </div>
                      </div>
                      <div className="col-9">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">{this.state.componentToShow === "companies" ? (
                        <div className="col-sm-12">
                            <Companies/>
                        </div>
                    ) : (
                        <div className="col-sm-12">
                            <Jobs userType={this.props.history.location.state} />
                        </div>
                    )
                  }</div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
         );
    }
}
 
export default Student;