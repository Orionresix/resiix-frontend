import React, { useState, useEffect } from 'react';
import './StartWork.css'; 

const StartWork = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    fetch('API_ENDPOINT')
      .then(response => response.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="complete-issue">
      <div className="complete-welcome">
        <h1>Tenant Requests</h1>
      </div>
      <div className="complete-form">
        {loading ? (
          <p>Loading...</p>
        ) : (
          requests.map(request => (
            <div className="request-card" key={request.id}>
              <h3>Ticket ID: {request.ticketId}</h3>
              {request.image && <img src={request.image} alt="Request Image" />}
              <p>Priority: {request.priority}</p>
              <p>Type of Request: {request.requestType}</p>
              <p>Description: {request.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StartWork;
