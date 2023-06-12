import React, { useState } from "react";
import './normalize.css';
import './App.css';

const CardGrid: React.FC = () => {
  const [inputString, setInputString] = useState("");
  const [uppercasedString, setUppercasedString] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState(0);

  const handleStringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUppercasedString(inputString.toUpperCase());
  };

  const handleSumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSum(num1 + num2);
  };

  return (
    <div>
      <div className="card-grid">
        <div className="card">
          <h2>Uppercase String</h2>
          <form onSubmit={handleStringSubmit} className="card-content">
            <div className="card-inputs">
              <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
              />
              <button type="submit">Submit</button>
            </div>
            {uppercasedString && (
              <div className="card-output">
                <p>{uppercasedString}</p>
              </div>
            )}
          </form>
        </div>
        <div className="card">
          <h2>Sum Numbers</h2>
          <form onSubmit={handleSumSubmit} className="card-content">
            <div className="card-inputs">
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
              />
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
              />
              <button type="submit">Submit</button>
            </div>
            {sum && (
              <div className="card-output">
                <p>{sum}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
