import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import logo from '../media/logo.png';
import hands1 from '../media/hands1.jpeg';
import hands2 from '../media/hands2.jpeg';
import hands3 from '../media/hands3.jpg';
import carousel1 from '../media/carousel1.jpeg';
import carousel2 from '../media/carousel2.jpg';
import carousel3 from '../media/carousel3.jpg';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="maindiv">
        <Jumbotron fluid id="jumbo">
          <div id="flex-container">
            <div id="img">
              <img alt="" src={logo} height="500px" width="500px"></img>
            </div>

            <div>

              <Form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                  <Form.Label htmlFor="email">E-Mail</Form.Label>
                  <input type="email" id="email" ref={this.emailEl} />
                </div>
                <div className="form-control">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <input type="password" id="password" ref={this.passwordEl} />
                </div>
                <div className="form-actions">
                  <Button type="submit">Submit</Button>
                  <Button type="button" onClick={this.switchModeHandler}>
                    Switch to {this.state.isLogin ? 'Signup' : 'Login'}
                  </Button>
                </div>
              </Form>

            </div>
            <div>
              <h8>"Giving is not about <br></br>making a donation, <br></br>it is about making <br></br>a difference."</h8>
            </div>
          </div>
        </Jumbotron>

        <CardGroup id="card1">
          <Card>
            <Card.Img variant="top" id="img1" src={hands1} />
            <Card.Body>
              <Card.Title>Volunteer</Card.Title>
              <Card.Text>
                Spend your time making an impact on the lives of those around you
</Card.Text>
              <Button variant="primary" id="button">Save Your Spot</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img variant="top" id="img2" src={hands2} />
            <Card.Body>
              <Card.Title>Organize</Card.Title>
              <Card.Text>
                Put your best foot forward and step into a leadership role{' '}
              </Card.Text>
              <Button variant="primary" id="button">Learn More</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img variant="top" id="img3" src={hands3} />
            <Card.Body>
              <Card.Title>Donate</Card.Title>
              <Card.Text>
                Whether it is time, money or positivity we appreciate your awareness
</Card.Text>
              <Button variant="primary" id="button">Start Here</Button>
            </Card.Body>
          </Card>
        </CardGroup>

        <Container>
          <Carousel>
            <Carousel.Item data-interval="500">
              <img
                className="d-block w-100"
                src={carousel1}
                alt="First slide"
                id="img-1" />

              <Carousel.Caption>
                <h3>Impact Lives</h3>
                {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item data-interval="500">
              <img
                className="d-block w-100"
                src={carousel2}
                alt="Third slide"
                id="img-2" />

              <Carousel.Caption>
                <h4>Change Futures</h4>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item data-interval="500">
              <img
                className="d-block w-100"
                src={carousel3}
                alt="Third slide"
                id="img-3" />
              <Carousel.Caption>
                <h2>Lend A Helping Hand</h2>
                {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>

        <Container id="last">
          <CardGroup>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Text>
                  <div className="flex-container">
                    <div id="info">
                      <h1 id="info1">Stay Connected</h1>
                      <ListGroup className="list-group-flush" id="info2">
                        <ListGroupItem>-Sign-up to stay connected to our work and hear about how you can make a difference worldwide.-</ListGroupItem>
                        <ListGroupItem>
                          <Form.Group controlId="formBasicEmail" onSubmit={this.submitHandler}>
                            <Form.Label>
                            </Form.Label>
                            <Form.Label>Email address: </Form.Label>
                            <br></br>
                            <input type="email" id="email" ref={this.emailEl} />
                          </Form.Group>
                          <Button variant="primary" type="submit" id="button">
                            Stay Connected
  </Button>
                        </ListGroupItem>
                      </ListGroup>
                    </div>
                    <div id="info">
                      <h1 id="info1">Get Involved</h1>
                      <br></br>
                      <h6>Donate</h6>
                      <h6>Upcoming Events</h6>
                      <h6>Corporate Partnership</h6>
                      <h6>Volunteer Opportunities</h6>
                      <h6>Join Our Support Team</h6>
                      <h6>Internship Opportunities</h6>
                      <h6>Sign up for our Newsletter</h6>
                    </div>
                    <div id="info">
                      <h1 id="info1" className="about">About</h1>
                      <br></br>
                      <h6>Blog</h6>
                      <h6>Our Mission</h6>
                      <h6>The Impact</h6>
                      <h6>Financials/Annual Report</h6>
                      <h6>Program Impact</h6>
                      <h6>Videos</h6>
                    </div>
                    <div id="info">
                      <h1 id="info1" className="contact">Contact</h1>
                      <br></br>
                      <h6>Contact Us</h6>
                      <h6>Become a Partner</h6>
                      <h6>Locations</h6>
                      <h6>111-111-1111</h6>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container>

        <Card>
          <Card.Body id="footer">
            <Card.Title>Helping Hands 2019
    <br></br>
              UCF Coding Bootcamp
    </Card.Title>
            <Card.Text>
              Eric Naiman<br></br>
              Dylan Armstrong<br></br>
              Kyle Caplis<br></br>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AuthPage;