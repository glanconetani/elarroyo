import React, { Component } from 'react';
import logo from './ealogo.png';
import './App.css';
import axios from 'axios';

import {
  Input,
  Label,
  Button,
  Container,
  Row, Col,
  Form,
  FormGroup
} from 'reactstrap';

class App extends Component {

  state = { previous: "", next: "", pull: "", remove: "" };

  diffSigns = (e) => {
    e.preventDefault();
    axios.post('/api/diff', { previous: this.state.previous, next: this.state.next })
        .then(response => this.setState({ pull: response.data.pull, remove: response.data.remove }));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toUpperCase()
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <Container className="m-5">
            <Row className="justify-content-center">
              <Col md="6">
                <Form onSubmit={this.diffSigns}>
                  <FormGroup>
                    <Label>Previous</Label>
                    <Input name="previous" placeholder="Previous Sign" onChange={this.handleChange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label>Next</Label>
                    <Input name="next" placeholder="Next Sign" onChange={this.handleChange} required/>
                  </FormGroup>
                  <Button type="submit">Diff Signs</Button>
                </Form>

              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col md="6">
                <p>Pull: {this.state.pull}</p>
                <p>Remove: {this.state.remove}</p>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
