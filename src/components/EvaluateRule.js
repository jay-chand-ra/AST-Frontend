import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EvaluateRule() {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      console.log('Fetching rules...');
      const response = await axios.get('http://localhost:5000/api/rules');
      console.log('Fetched rules:', response.data);
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
      setError(`Failed to fetch rules. Error: ${error.message}`);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  const handleEvaluate = async () => {
    try {
      setError('');
      setResult(null);
      const parsedData = JSON.parse(data);
      console.log('Sending evaluation request:', { ruleId: selectedRule, data: parsedData });
      const response = await axios.post('http://localhost:5000/api/rules/evaluate', {
        ruleId: selectedRule,
        data: parsedData
      });
      console.log('Evaluation response:', response.data);
      setResult(response.data.result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      if (error.response) {
        setError(`Failed to evaluate rule: ${error.response.data.message}`);
      } else if (error.request) {
        setError('Failed to evaluate rule: No response from server. Please check your network connection.');
      } else {
        setError(`Failed to evaluate rule: ${error.message}`);
      }
    }
  };

  return (
    <div className="component-container">
      <h2>Evaluate Rule</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <h3>Select a Rule:</h3>
        <select value={selectedRule} onChange={(e) => setSelectedRule(e.target.value)}>
          <option value="">Select a rule</option>
          {rules.map((rule) => (
            <option key={rule.id} value={rule.id}>{rule.name}: {rule.ruleString}</option>
          ))}
        </select>
      </div>
      <div>
        <h3>Enter Data (JSON format):</h3>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder='{"age": 25, "salary": 50000}'
          rows="4"
        />
      </div>
      <button onClick={handleEvaluate} disabled={!selectedRule || !data}>Evaluate Rule</button>
      {result !== null && (
        <div>
          <h3>Evaluation Result:</h3>
          <p>{result.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default EvaluateRule;
