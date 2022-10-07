import React, { useState } from "react";
import { Button, Container, Row, Col, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import Sidebar from "../../Sidebar/Sidebar";
import '../../../styles/style.css';
function Location() {

  let CurrentLocation = [
    {
        title : 'Halsingegätan, Stockholm, SE',
        location : '59.3293° N, 18.0686° E'
    },
]
  let PreviousLocation = [
    {
        title : 'Halsingegätan, Stockholm, SE',
        location : '59.3293° N, 18.0686° E'
    },
    {
        title : 'Pustegränd, Stockholm, SE',
        location : '59.3293° N, 18.0686° E'
    },
    {
        title : 'Långa Gatan, Stockholm, SE',
        location : '59.3293° N, 18.0686° E'
    },
    {
        title : 'Djurgården, Stockholm, SE',
        location : '59.3293° N, 18.0686° E'
    },
    {
        title : 'Svartensgatan, Stockholm, SE',
        location : '59.3293° N, 18.0686° E'
    }
]

  return (
    <Container className="wrapper h100vh mt-50" fluid>
      <Row>
        <Col lg="3" className="no-pad">
          <Sidebar/>
        </Col>
        <Col lg="9" className="main-area">
          <Row>
            <Col lg="6">
              <div className="task-page">
                <a href="#">+ Check In</a>
                <div className="incompletedTask previous-locations">
                  <h2>Current Location</h2>
                  <ul>
                  {CurrentLocation.map((d, index) =>{
                    return(
                      <li key={index}>
                        <img src="assets/images/location-new-icon.png"></img>
                      <div>
                      <h4>{d.title}</h4>
                      <p>{d.location}</p>
                      </div>
                  </li>
                  )
                  })}
                  </ul>
                </div>
                <div className="incompletedTask previous-locations">
                  <h2>Previous Location</h2>
                  <ul>
                  {PreviousLocation.map((d, index) =>{
                    return(
                      <li key={index}>
                        <img src="assets/images/location-new-icon.png"></img>
                      <div>
                      <h4>{d.title}</h4>
                      <p>{d.location}</p>
                      </div>
                  </li>
                  )
                  })}
                  </ul>
                </div>
                
              </div>
            </Col>
          </Row>
          
        
        </Col>
      </Row>

    
    </Container>
  );
};

export default Location;
