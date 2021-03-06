import React, { Component } from 'react';

import './Auth.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import logo from '../media/logo.png';
import hands1 from '../media/hands1.jpeg';
import hands2 from '../media/hands2.jpeg';
import hands3 from '../media/hands3.jpg';
// import carousel1 from '../media/carousel1.jpeg';
// import carousel2 from '../media/carousel2.jpg';
// import carousel3 from '../media/carousel3.jpg';
import AuthContext from '../context/auth-context';
import Row from 'react-bootstrap/Row';

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
      <div id="maindiv">
        <Jumbotron fluid id="jumbo">
          <div id="flex-container">
            <img id="logo" alt="Helping Hands" src={logo}></img>
          </div>
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
            <Form.Text className="text-muted">
              "Giving is not about making a donation, it is about making a difference."
    </Form.Text>
          </Form>
        </Jumbotron>

        <Row>
          <CardGroup>
            <Card className="card">
              <Card.Img variant="top" id="img1" src={hands1} />
              <Card.Body>
                <Card.Title>Volunteer</Card.Title>
                <Card.Text>
                  Spend your time making an impact on the lives of those around you
      </Card.Text>
                <Button variant="primary" id="button">Save Your Spot</Button>
              </Card.Body>

            </Card>
            <Card className="card">
              <Card.Img variant="top" id="img2" src={hands2} />
              <Card.Body>
                <Card.Title>Organize</Card.Title>
                <Card.Text>
                  Put your best foot forward and step into a leadership role{' '}
                </Card.Text>
                <Button variant="primary" id="button">Learn More</Button>
              </Card.Body>

            </Card>
            <Card className="card">
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
        </Row>

        <Container>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/678637/pexels-photo-678637.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="First slide"
                id="img-1"
              />
              <Carousel.Caption>
                <h3>Impact Lives</h3>
                {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2017/07/29/00/09/child-2550326_1280.jpg"
                alt="Third slide"
                id="img-2"
              />

              <Carousel.Caption>
                <h4>Change Futures</h4>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2017/02/03/17/41/poverty-2035694_1280.jpg"
                alt="Third slide"
                id="img-3"
              />

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
              <ListGroup variant="flush" className="info1">
                <h1>Get Involved</h1>
                <ListGroup.Item className="info">Donate</ListGroup.Item>
                <ListGroup.Item className="info">Upcoming Events</ListGroup.Item>
                <ListGroup.Item className="info">Corporate Partnership</ListGroup.Item>
                <ListGroup.Item className="info">Volunteer Opportunities</ListGroup.Item>
                <ListGroup.Item className="info">Join Our Support Team</ListGroup.Item>
                <ListGroup.Item className="info">Internship Opportunities</ListGroup.Item>
                <ListGroup.Item className="info">Sign up for our Newsletter</ListGroup.Item>
              </ListGroup>
            </Card>

            <Card style={{ width: '18rem' }}>
              <ListGroup variant="flush" className="info1">
                <h1 className="about">About</h1>
                <ListGroup.Item className="info">Blog</ListGroup.Item>
                <ListGroup.Item className="info">Our Mission</ListGroup.Item>
                <ListGroup.Item className="info">The Impact</ListGroup.Item>
                <ListGroup.Item className="info">Financials/Annual Reports</ListGroup.Item>
                <ListGroup.Item className="info">Videos</ListGroup.Item>
              </ListGroup>
            </Card>

            <Card style={{ width: '18rem' }}>
              <ListGroup variant="flush" className="info">
                <h1 className="contact">Contact</h1>
                <ListGroup.Item className="info">Contact Us</ListGroup.Item>
                <ListGroup.Item className="info">Become a Partner</ListGroup.Item>
                <ListGroup.Item className="info">Locations</ListGroup.Item>
                <ListGroup.Item className="info">111-111-1111</ListGroup.Item>
              </ListGroup>
            </Card>
          </CardGroup>
        </Container>
      </div>
    );
  }
}

export default AuthPage;