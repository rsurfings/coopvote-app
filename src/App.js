import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agenda from './components/Agenda';
import VotingSession from './components/VotingSession';
import ReceiveMemberVotes from './components/ReceiveMemberVotes';

function App() {
  return (
    <Container className="mt-5">
      <h1>Coopvote Application</h1>
      <Agenda />
      <hr />
      <VotingSession />
      <hr />
      <ReceiveMemberVotes />
    </Container>
  );
}

export default App;
