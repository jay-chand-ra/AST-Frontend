import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RuleList() {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rules');
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
      setError(`Failed to fetch rules. Error: ${error.message}`);
    }
  };

  return (
    <div className="component-container">
      <h2>Rule List</h2>
      {error && <p className="error">{error}</p>}
      {rules.length === 0 ? (
        <p>No rules found.</p>
      ) : (
        <ul>
          {rules.map((rule) => (
            <li key={rule.id}>
              <strong>{rule.name}</strong>: {rule.ruleString}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RuleList;
