import React, { useState } from 'react';
import axios from 'axios';

function RuleCreator() {
  const [name, setName] = useState('');
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/rules/create', { name, ruleString })
      .then(response => {
        console.log('Rule created:', response.data);
        setName('');
        setRuleString('');
      })
      .catch(error => console.error('Error creating rule:', error));
  };

  return (
    <div>
      <h2>Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Rule String: </label>
          <input type="text" value={ruleString} onChange={e => setRuleString(e.target.value)} required />
        </div>
        <button type="submit">Create Rule</button>
      </form>
    </div>
  );
}

export default RuleCreator;
