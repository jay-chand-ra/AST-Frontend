import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CombineRules() {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState('');
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
      setError('Failed to fetch rules. Please try again later.');
    }
  };

  const handleRuleSelection = (ruleId) => {
    setSelectedRules(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleCombineRules = async () => {
    try {
      setError('');
      console.log('Combining rules:', selectedRules);
      const response = await axios.post('http://localhost:5000/api/rules/combine', { rules: selectedRules });
      setCombinedRule(response.data.ruleString);
    } catch (error) {
      console.error('Error combining rules:', error);
      if (error.response) {
        setError(`Failed to combine rules: ${error.response.data.message}`);
      } else if (error.request) {
        setError('Failed to combine rules: No response from server. Please check your network connection.');
      } else {
        setError(`Failed to combine rules: ${error.message}`);
      }
    }
  };

  return (
    <div className="component-container">
      <h2>Combine Rules</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <h3>Available Rules:</h3>
        <ul>
          {rules.map((rule) => (
            <li key={rule.id}>
              <input
                type="checkbox"
                id={`rule-${rule.id}`}
                checked={selectedRules.includes(rule.id)}
                onChange={() => handleRuleSelection(rule.id)}
              />
              <label htmlFor={`rule-${rule.id}`}>{rule.name}: {rule.ruleString}</label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleCombineRules} disabled={selectedRules.length < 2}>Combine Selected Rules</button>
      {combinedRule && (
        <div>
          <h3>Combined Rule:</h3>
          <p>{combinedRule}</p>
        </div>
      )}
    </div>
  );
}

export default CombineRules;
