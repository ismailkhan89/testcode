import React, { useState } from "react";
import { Button, Container, Row, Col, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import '../../../styles/style.css';

function Login() {

  const navigate = useNavigate();
  const navigateToTask = () => {
    
    navigate('/task');
  };

  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [iconEye, SeticonEye] = useState('');
  return (
    <Container className="wrapper">
      <Row>
        <Col lg="12" className="loginForm">
            <h1>Login Page</h1>
            <form className="w100">
            <div className="form-group">
              <input
              value={email}
              onChange={(e) => {
                SetEmail(e.target.value)
              }}
              // onChange={(event) => {
              //   this.setState({
              //     email: event.target.value,
              //     emailError: "",
              //   });
              // }}
              // onBlur={(event) => {
              //   this.onBlur(event, "email");
              //   this.state.email === "" &&
              //     this.setState({ emailError: "Email is Required" });
              //   this.state.email !== "" &&
              //     this.setState({
              //       emailError: validateEmail(this.state.email),
              //     });
                
              // }}
            placeholder="Email"
            type="email"
          ></input>
          </div>
          <div className="form-group">
          <span onClick={()=> SeticonEye(!iconEye)}
          // onClick={() => this.onChangeIcon()}
          >{iconEye ? 'Hide' : 'Show'}</span>
            <input
              value={password}
              onChange={(e) => {
                SetPassword(e.target.value)
              }}
            placeholder="Password"
            type={iconEye ? "text" : "password"}
          ></input>
          </div>
          <div className="form-group">
          <Button onClick={navigateToTask}  className="my-4"
                              color="primary"
                              type="button"
                              // onClick={() => {
                              //   console.log("onClick res");
                              //   this.setState({
                              //     emailError: null,
                              //     passwordError: null,
                              //   });
                              //   let user = {
                              //     email: this.state.email,
                              //     password: this.state.password,
                              //     type: this.state.type,
                              //   };
                              //   if (this.validate())
                              //     login({ variables: { ...user } });
                              //   }}
                              >Log In</Button>
                              </div>
          </form>
        </Col>
      </Row>
    
    </Container>
  );
};

export default Login;
