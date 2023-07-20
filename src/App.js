import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agenda from './components/Agenda';

function App() {
  return (
    <Container className="mt-5">
      <h1>Coopvote Application</h1>
      <Agenda />
    </Container>
  );
}

export default App;
