import React, { useState, FormEvent } from 'react';

interface CardProps {
  title: string;
  description: JSX.Element;
  sourceCode?: string;
  form: JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, description, sourceCode, form }) => {
  const [inputString, setInputString] = useState('');
  const [uppercasedString, setUppercasedString] = useState('');

  const handleStringSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Perform the desired logic here to handle the form submission
    setUppercasedString(inputString.toUpperCase());
  };

  return (
    <div className="card">
      <div className="card-title">
        <h2>{title}</h2>
      </div>
      <div className="card-content">
        <div className="card-description">
          {description}<br /><br />
            {sourceCode && (
              <a href={sourceCode} target="_blank">Source Code</a>
            )}
        </div>
          {form}
      </div>
    </div>
  );
};

export default Card;
