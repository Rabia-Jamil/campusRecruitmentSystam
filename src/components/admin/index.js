import React, {Component} from "react";
import Companies from "../students/Companies";
import Jobs from "../students/Jobs";
import Header from "../Header";
import Students from "../companies/Students";


class Admin extends Component {
  state = {
    jobs: [],
    companies: [],
    componentToShow: "students",
  };

  

  handleComponent = (event) => {
    if(event.target.name === "students"){
      this.setState({ componentToShow: "students" });
    }
    else if(event.target.name === "companies"){
      this.setState({ componentToShow: "companies" });
    }
    else if(event.target.name === "jobs"){
      this.setState({ componentToShow: "jobs" });
    }
    else{
      this.setState({ componentToShow: "students" });
    }

  };

  renderComponent = componentToShow => {
    if(componentToShow === "companies"){
      return(
        <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <Companies userType = {this.props.history.location.state}/>
            </div>
        </div>
      </div>
      )
    }
    else if(componentToShow === "jobs"){
      return(
        <div className="container">
          <div className="row">
              <div className="col-sm-12">
                  <Jobs userType = {this.props.history.location.state} />
              </div>
          </div>
        </div>  
      )
    }
    else if(componentToShow === "students"){
      return(
        <div className="container">
          <div className="row">
              <div className="col-sm-12">
                  <Students  userType = {this.props.history.location.state}/>
                  </div>
          </div>
        </div> 
      )
    }
    else{
      return "Please select";
    }
  };

  render() {
   // console.log("userType is ",this.props.history.location.state)
    return (
      <div className="container-fluid">
        <Header/>
            <div className="row">
                  <div className="col-sm-12" style={{marginTop: "20px"}}>
                    <h3 className="text-center" style={{fontWeight: "bold", marginBottom:"10px", marginTop: "20px", fontFamily: "cursive", borderBottom: "6px solid #ffc107"}}>Welcome Admin!</h3>
                  </div>
            </div>
                  <div className="col-sm-12">
                  <div className="row" style={{ border: "6px solid #ffc107"}}>
                      <div className="col-3" style={{marginTop: "50px"}}>
                        <div className="nav flex-column nav-pills"id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          <a className="nav-link  btn-outline-warning active" href="#dashboard" id="v-pills-home-tab" data-toggle="pill" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="students" role="tab" aria-controls="v-pills-home" aria-selected="true">Students</a>
                          <a className="nav-link  btn-outline-warning"  href="#dashboard"  id="v-pills-profile-tab"   data-toggle="pill" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="jobs" role="tab" aria-controls="v-pills-profile" aria-selected="false">Jobs</a>
                          <a className="nav-link  btn-outline-warning"  href="#dashboard"  id="v-pills-messages-tab" data-toggle="pill" style={{textAlign: "center", color: "black", fontWeight: "bold", fontStyle: "italic", fontSize: "20px", fontFamily: "cursive"}} onClick={this.handleComponent} name="companies" role="tab" aria-controls="v-pills-messages" aria-selected="false">Companies</a>
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

export default Admin;
