import React, { Component } from 'react';
import Students from "./Students";
import Header from '../Header'
import Applications from './Applications'
import Post from "./Post";

class Company extends Component {
    state = {
        jobs: [],
        companies: [],
        componentToShow: "students"
      };
    
      handleComponent = (event) => {
       if (event.target.name === "students") {
          this.setState({
            componentToShow: "students"
          });
        } else if (event.target.name === "applications") {
          this.setState({
            componentToShow: "applications"
          });
        }
        else {
          this.setState({
            componentToShow: "post"
          });
        }
      };
    
      renderComponent = (componentToShow) => {
        if(componentToShow === "students"){
          return(
            <div className="container">
              <div className="row">
                  <div className="col-sm-12">
                      <Students userType={this.props.history.location.state} />
                  </div>
              </div>
          </div>
          )
        }
        else if(componentToShow === "applications"){
          return(
            <div className="container">
              <div className="row">
                  <div className="col-sm-12">
                      <Applications />
                  </div>
              </div>
          </div>  
          )
        }
        else if(componentToShow === "post"){
          return(
            <div className="container">
              <div className="row">
                  <div className="col-sm-12">
                      <Post />
                  </div>
              </div>
          </div>  
          )
        }
        else{
          this.setState({ componentToShow: "students" });
        }
      };
    render() { 
        return ( 
          <div className="container-fluid">
            <Header/>
                <div className="row">
                  <div className="col-sm-12">
                      <h3 className="text-center" style={{fontWeight: "bold", marginTop: "20px", marginBottom:"10px", fontFamily: "cursive", borderBottom: "6px solid #ffc107"}}>Welcome Company!</h3>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="row" style={{ border: "6px solid #ffc107"}}>
                      <div className="col-3" style={{marginTop: "50px"}}>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          <a className="nav-link  btn-outline-warning  active" id="v-pills-home-tab" data-toggle="pill" href="#dashboard" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="students" role="tab" aria-controls="v-pills-home" aria-selected="true"> View Students</a>
                          <a className="nav-link  btn-outline-warning" id="v-pills-home-tab" data-toggle="pill" href="#dashboard" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="applications" role="tab" aria-controls="v-pills-home" aria-selected="true"> View Job Applications</a>
                          <a className="nav-link  btn-outline-warning" id="v-pills-messages-tab" data-toggle="pill" href="#dashboard" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="post" role="tab" aria-controls="v-pills-messages" aria-selected="false">Post a Job</a>
                        </div>
                      </div>
                      <div className="col-9">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">{this.renderComponent(this.state.componentToShow)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
         );
    }
}
 
export default Company;