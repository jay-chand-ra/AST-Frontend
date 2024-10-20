import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRule() {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Creating rule...');
    try {
      console.log('Sending request to create rule:', { name: ruleName, ruleString: ruleString });
      const response = await axios.post('http://localhost:5000/api/rules', { name: ruleName, ruleString: ruleString }, { timeout: 10000 });
      console.log('Rule created:', response.data);
      setMessage(`Rule created successfully: ${response.data.name}`);
      setRuleName('');
      setRuleString('');
      // Navigate to the rule list page after successful creation
      navigate('/');
    } catch (error) {
      console.error('Error creating rule:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setMessage(`Failed to create rule: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        console.error('No response received');
        setMessage('Failed to create rule: No response from server. Please check your network connection.');
      } else {
        console.error('Error setting up request:', error.message);
        setMessage(`Failed to create rule: ${error.message}`);
      }
    }
  };

  return (
    <div className="component-container">
      <h2>Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          placeholder="Rule Name"
          required
        />
        <textarea
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Rule String (e.g., age > 30 AND department = 'Sales')"
          rows="4"
          required
        />
        <button type="submit">Create Rule</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateRule;
