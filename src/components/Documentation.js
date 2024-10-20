import React from 'react';

function Documentation() {
  return (
    <div className="component-container">
      <h2>Rule Engine with AST Documentation</h2>
      
      <section>
        <h3>Objective</h3>
        <p>
          This application is a simple 3-tier rule engine that determines user eligibility based on attributes like age, department, income, and experience. It uses Abstract Syntax Trees (AST) to represent conditional rules and allows for dynamic creation, combination, and modification of these rules.
        </p>
      </section>

      <section>
        <h3>Data Structure</h3>
        <p>The AST is represented by a Node structure with the following fields:</p>
        <ul>
          <li><strong>type:</strong> String indicating the node type ("operator" for AND/OR, "operand" for conditions)</li>
          <li><strong>left:</strong> Reference to another Node (left child)</li>
          <li><strong>right:</strong> Reference to another Node (right child for operators)</li>
          <li><strong>value:</strong> Optional value for operand nodes (e.g., number for comparisons)</li>
        </ul>
      </section>

      <section>
        <h3>Data Storage</h3>
        <p>Rules are stored in a SQLite database with the following schema:</p>
        <pre>
          {`
CREATE TABLE rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
  ruleString TEXT,
  ast TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
          `}
        </pre>
      </section>

      <section>
        <h3>Sample Rules</h3>
        <p>Here are two example rules:</p>
        <pre>
          {`
rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"

rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
          `}
        </pre>
      </section>

      <section>
        <h3>API Design</h3>
        <h4>1. create_rule(rule_string)</h4>
        <p>This function takes a string representing a rule and returns a Node object representing the corresponding AST.</p>

        <h4>2. combine_rules(rules)</h4>
        <p>This function takes a list of rule strings and combines them into a single AST. It returns the root node of the combined AST.</p>

        <h4>3. evaluate_rule(JSON data)</h4>
        <p>This function takes a JSON representing the combined rule's AST and a dictionary of data containing attributes. It evaluates the rule against the provided data and returns True if the user is of that cohort based on the rule, False otherwise.</p>
      </section>

      <section>
        <h3>Usage</h3>
        <p>To use this Rule Engine:</p>
        <ol>
          <li>Create individual rules using the "Create Rule" page.</li>
          <li>View and manage existing rules on the "Rule List" page.</li>
          <li>Combine multiple rules using the "Combine Rules" page.</li>
          <li>Evaluate rules against sample data using the "Evaluate Rule" page.</li>
        </ol>
      </section>

      <section>
        <h3>Additional Features</h3>
        <ul>
          <li>Error handling for invalid rule strings or data formats.</li>
          <li>Validation for attributes to be part of a predefined catalog.</li>
          <li>Modification of existing rules, including changing operators, operand values, or adding/removing sub-expressions within the AST.</li>
        </ul>
      </section>
    </div>
  );
}

export default Documentation;
