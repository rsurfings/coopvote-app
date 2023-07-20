import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../config';

const ReceiveMemberVotes = () => {
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [memberId, setMemberId] = useState('');
  const [vote, setVote] = useState('Yes');
  const [agendas, setAgendas] = useState([]);

  const handleVoteSubmission = (e) => {
    e.preventDefault();
    // Perform API call to submit member vote
    axios.put(`${api.serverHost}/api/v1/voting/vote`, { agendaId: selectedAgenda.id, memberId, vote })
      .then((response) => {
        // Vote submitted successfully
        console.log('Vote submitted:', response.data);
        setSelectedAgenda(null);
        setMemberId('');
        setVote('Yes');
      })
      .catch((error) => {
        // Handle error
        console.error('Error submitting vote:', error);
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
      <h2>Receive Member Votes</h2>
      {selectedAgenda ? (
        <>
          <h5>Selected Agenda:</h5>
          <p>{selectedAgenda.name}</p>
          <form onSubmit={handleVoteSubmission}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="memberId">Member ID</label>
                <input
                  type="text"
                  id="memberId"
                  className="form-control"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="vote">Vote</label>
                <select
                  id="vote"
                  className="form-control"
                  value={vote}
                  onChange={(e) => setVote(e.target.value)}
                  required
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit Vote</button>
          </form>
        </>
      ) : (
        <p>No agenda selected</p>
      )}
      <div className="mt-4">
        <h5>Select Agenda:</h5>
        <select
          className="form-control"
          value={selectedAgenda ? selectedAgenda.id : ''}
          onChange={(e) => {
            const selectedId = e.target.value;
            setSelectedAgenda(agendas.find((agenda) => agenda.id === selectedId));
          }}
        >
          <option value="">-- Select Agenda --</option>
          {agendas.map((agenda) => (
            <option key={agenda.id} value={agenda.id}>{agenda.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReceiveMemberVotes;
