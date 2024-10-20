import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RuleCombiner() {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState(null);

  useEffect(() => {
    axios.get('/api/rules')
      .then(response => setRules(response.data))
      .catch(error => console.error('Error fetching rules:', error));
  }, []);

  const handleCombine = () => {
    axios.post('/api/rules/combine', { rules: selectedRules })
      .then(response => setCombinedRule(response.data))
      .catch(error => console.error('Error combining rules:', error));
  };

  return (
    <div>
      <h2>Combine Rules</h2>
      <div>
        {rules.map(rule => (
          <label key={rule.id}>
            <input
              type="checkbox"
              value={rule.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRules([...selectedRules, rule.rule_string]);
                } else {
                  setSelectedRules(selectedRules.filter(r => r !== rule.rule_string));
                }
              }}
            />
            {rule.name}
          </label>
        ))}
      </div>
      <button onClick={handleCombine}>Combine Selected Rules</button>
      {combinedRule && (
        <div>
          <h3>Combined Rule:</h3>
          <p>{combinedRule.ruleString}</p>
        </div>
      )}
    </div>
  );
}

export default RuleCombiner;
