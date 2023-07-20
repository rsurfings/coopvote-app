import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../config';


const VotingSession = () => {
  const [selectedAgendaId, setSelectedAgendaId] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [agendas, setAgendas] = useState([]);

  const handleStartVotingSession = () => {
    // Perform API call to start voting session for the selected agenda with the specified duration
    axios.post(`${api.serverHost}/api/v1/agenda/${selectedAgendaId}/voting`, { duration: sessionDuration })
      .then((response) => {
        // Voting session started successfully
        console.log('Voting session started:', response.data);
        setSelectedAgendaId('');
        setSessionDuration('');
      })
      .catch((error) => {
        // Handle error
        console.error('Error starting voting session:', error);
      });
  };

  useEffect(() => {
    // Fetch all agendas from the backend
    axios.get(`${api.serverHost}/api/v1/agenda`)
      .then((response) => {
        // Update agendas state with the fetched data
        setAgendas(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching agendas:', error);
      });
  }, []);

  return (
    <div>
      <h2>Voting Session</h2>
      <div className="form-group">
        <label htmlFor="agendaSelect">Select Agenda:</label>
        <select
          id="agendaSelect"
          className="form-control"
          value={selectedAgendaId}
          onChange={(e) => setSelectedAgendaId(e.target.value)}
          required
        >
          <option value="">-- Select Agenda --</option>
          {agendas.map((agenda) => (
            <option key={agenda.id} value={agenda.id}>{agenda.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sessionDuration">Voting Session Duration (in minutes)</label>
        <input
          type="number"
          id="sessionDuration"
          className="form-control"
          value={sessionDuration}
          onChange={(e) => setSessionDuration(e.target.value)}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleStartVotingSession}
        disabled={!selectedAgendaId || !sessionDuration}
      >
        Start Voting Session
      </button>
    </div>
  );
};

export default VotingSession;
