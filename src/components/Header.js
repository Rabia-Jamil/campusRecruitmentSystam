import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import logo from '../img/logo.png'

class Header extends Component {
    logOut (e) {
        e.preventDefault()
        this.props.history.push(`/`)
    }
    render() { 
            return (
                <nav className="navbar navbar-expand-lg navbar-light rounded" style={{ backgroundColor: "#ffc107",marginBottom: "20px"}}>
                     <img src={logo} className="navbar-brand" alt="logo" style={{width: "80px", height:"80px", borderRadius: "50%"}} href="#"/>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar1"
                        aria-controls="navbar1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse " id="navbar1">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link btn-block btn btn-lg btn-warning " style={{fontWeight: "bold", fontSize: "20px",}} onClick={this.logOut.bind(this)} >
                                    Logout
                                </button>
                            </li>
                         </ul>
                    </div>
                </nav>
            )
        }
}
 
export default withRouter(Header);