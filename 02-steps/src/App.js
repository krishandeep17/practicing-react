import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function Button({ disabled, type, onClick, children }) {
  return (
    <button disabled={disabled} className={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const hasPrev = step > 1;
  const hasNext = step < messages.length;

  function handlePrevious() {
    if (hasPrev) {
      setStep((prevStep) => prevStep - 1);
    }
  }

  function handleNext() {
    if (hasNext) {
      setStep((prevStep) => prevStep + 1);
    }
  }

  return (
    <>
      <Button
        type="close-btn"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        {isOpen ? <span>&#215;</span> : <span>&#43;</span>}
      </Button>

      {isOpen && (
        <div className="container">
          <ul className="steps">
            {messages.map((message, i) => (
              <li key={message} className={step >= i + 1 ? "active" : null}>
                {i + 1}
              </li>
            ))}
          </ul>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button
              disabled={!hasPrev}
              type="primary-btn"
              onClick={handlePrevious}
            >
              👈 Previous
            </Button>
            <Button disabled={!hasNext} type="primary-btn" onClick={handleNext}>
              Next 👉
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
