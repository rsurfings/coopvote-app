import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../config';

const Agenda = () => {
  const [agendaName, setAgendaName] = useState('');
  const [agendas, setAgendas] = useState([]);

  const handleCreateAgenda = (e) => {
    e.preventDefault();
    // Perform API call to create agenda
    axios.post(`${api.serverHost}/api/v1/agenda`, { name: agendaName })
      .then((response) => {
        // Agenda created successfully, update agendas state with the new agenda
        setAgendas([...agendas, response.data]);
        setAgendaName('');
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating agenda:', error);
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
      <h2>Agenda</h2>
      <form onSubmit={handleCreateAgenda}>
        <div className="form-group">
          <label htmlFor="agendaName">Agenda</label>
          <input
            type="text"
            className="form-control"
            id="agendaName"
            value={agendaName}
            onChange={(e) => setAgendaName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Agenda</button>
      </form>
      <div className="mt-4">
        <h5>Existing Agendas:</h5>
        <ul className="list-group">
          {agendas.map((agenda) => (
            <li key={agenda.id} className="list-group-item">{agenda.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Agenda;
