import React, { useState } from "react";
import axios from "axios";
import './normalize.css';
import './App.css';

const App: React.FC = () => {
  const [inputString, setInputString] = useState("");
  const [uppercasedString, setUppercasedString] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState(0);

  const handleStringSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/uppercase", { inputString });
      setUppercasedString(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sum", { num1, num2 });
      setSum(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card-grid">
        <div className="card">
          <h2>Uppercase String</h2>
          <form onSubmit={handleStringSubmit}>
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {uppercasedString && <p>{uppercasedString}</p>}
        </div>
        <div className="card">
          <h2>Sum Numbers</h2>
          <form onSubmit={handleSumSubmit}>
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
          </form>
          {sum && <p>{sum}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
