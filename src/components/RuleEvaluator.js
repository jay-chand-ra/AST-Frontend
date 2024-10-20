import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RuleEvaluator() {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get('/api/rules')
      .then(response => setRules(response.data))
      .catch(error => console.error('Error fetching rules:', error));
  }, []);

  const handleEvaluate = () => {
    const parsedData = JSON.parse(data);
    axios.post('/api/rules/evaluate', { rule: selectedRule, data: parsedData })
      .then(response => setResult(response.data.result))
      .catch(error => console.error('Error evaluating rule:', error));
  };

  return (
    <div>
      <h2>Evaluate Rule</h2>
      <div>
        <select value={selectedRule} onChange={e => setSelectedRule(e.target.value)}>
          <option value="">Select a rule</option>
          {rules.map(rule => (
            <option key={rule.id} value={rule.id}>{rule.name}</option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          value={data}
          onChange={e => setData(e.target.value)}
          placeholder="Enter JSON data to evaluate"
        />
      </div>
      <button onClick={handleEvaluate}>Evaluate</button>
      {result !== null && (
        <div>
          <h3>Result:</h3>
          <p>{result ? 'True' : 'False'}</p>
        </div>
      )}
    </div>
  );
}

export default RuleEvaluator;
