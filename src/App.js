import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RuleList from './components/RuleList';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';
import Documentation from './components/Documentation';
import './App.css'; // Make sure to create this file for the styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Rule Engine with AST</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="/">Rule List</Link></li>
            <li><Link to="/create">Create Rule</Link></li>
            <li><Link to="/combine">Combine Rules</Link></li>
            <li><Link to="/evaluate">Evaluate Rule</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<RuleList />} />
            <Route path="/create" element={<CreateRule />} />
            <Route path="/combine" element={<CombineRules />} />
            <Route path="/evaluate" element={<EvaluateRule />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Rule Engine App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
