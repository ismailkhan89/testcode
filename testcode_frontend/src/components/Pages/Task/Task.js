import React, { useState } from "react";
import { Button, Container, Row, Col, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import Sidebar from "../../Sidebar/Sidebar";
import Modal from 'react-modal';
import '../../../styles/style.css';

export default function Task () {
 
  let Incompleted = [
    {
        title : 'Submit my resume',
        time : '⏰ Today, 17.00'
    },
    {
        title : 'Complete the test',
        time : '⏰ Tomorrow, 14:00'
    },
    {
        title : 'Meeting wtih Jack',
        time : '⏰ 24 Feb, 15:00'
    },
    {
        title : 'Buy a chocolate for Mom',
        time : '⏰ 24 Feb, 11:00'
    },
    {
        title : 'Facetime with Dad',
        time : '⏰ 24 Feb, 18:00'
    }
]

let completed = [
{
    id : 1,
    title : 'Respond to Jane email',
},
{
    id : 2,
    title : 'Rechedule weekly meeting',
},
{
    id : 3,
    title : 'Service my bike',
},
{
    id : 4,
    title : 'Recheck the agreement document',
},
]

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width:'50%',
    backgroundColor:'white',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const [modalIsOpen, setIsOpen] = useState(false);
const [summary, SetSummary] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function ModalCode(){
    return(

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        contentLabel="Example Modal"
      >
        <h2 className="ModalHead">New Task</h2>
        <form className="ModalForm">
          <div class="single-field">
            <img src="assets/images/summary-icon.png"></img>
          <input
              value={summary}
              onChange={(e) => {
                SetSummary(e.target.value)
              }}
            placeholder="Summary"
            type="text"
          ></input>
          </div>
          <div class="single-field">
            <img src="assets/images/description-icon.png"></img>
            <textarea value={summary}
              onChange={(e) => {
                SetSummary(e.target.value)
              }}
            placeholder="Description"></textarea>
          
          </div>
          <div class="single-field">
            <img src="assets/images/date-icon.png"></img>
          <input
              value={summary}
              onChange={(e) => {
                SetSummary(e.target.value)
              }}
            placeholder="Due Date"
            type="date"
          ></input>
          </div>
          <div className="single-field text-center">
            <Button  className="mt-1 submit-btn" color="primary" type="button" >Save</Button>
          </div>
          <div className="text-center">
            <Button  className="mt-1 submit-btn cancel-btn" color="primary" type="button" >Cancel</Button>
          </div>
        </form>
      </Modal>
    )
  }

const [isChecked, SetisChecked] = useState(true);
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
                <a href="javascript::void(0)" onClick={openModal}>+ Add new task</a>
                
                <div className="incompletedTask">
                  <h2>Incomplete</h2>
                  <ul>
                  {Incompleted.map((d, index) =>{
                    return(
                      <li key={index}>
                      <input type="checkbox"></input>
                      <div>
                      <h4>{d.title}</h4>
                      <p>{d.time}</p>
                      </div>
                  </li>
                  )
                  })}
                  </ul>
                </div>
                <div className="completedTask">
                  <h2>Completed</h2>
                  <ul>
                  {completed.map((d, index) =>{
                    return(
                      <li key={index}>
                      <input type="checkbox" defaultChecked={isChecked} onChange={()=> SetisChecked(!isChecked)}></input>
                      <div>
                      <h4>{d.title}</h4>
                      
                      </div>
                  </li>
                  )
                  })}
                  </ul>
                </div>
              </div>
            </Col>
          <Col lg="6">
            
            <div className="submit-resume">
              <div className="resume-top">
                <div className="submit-text">
                  <h3>Submit my resume</h3>
                  <p>Send my resume to DigitalTolk</p>
                </div>
                <div className="submit-img">
                  <img src="assets/images/submit-img.png"></img>
                </div>
              </div>
              <div className="resume-skip">
                <Link to="#">Skip</Link>
                <Link to="#">Remind me later</Link>
              </div>
            </div>
            
          </Col>
          </Row>
          
        
        </Col>
      </Row>
               <ModalCode/>  
    
    </Container>
  );
};
