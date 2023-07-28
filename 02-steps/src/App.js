import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function Button({ disabled, onClick, children }) {
  return (
    <button disabled={disabled} onClick={onClick}>
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
      <button
        className="close"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        {isOpen ? <span>&#215;</span> : <span>&#43;</span>}
      </button>

      {isOpen && (
        <div className="container">
          <ul className="steps">
            {Array.from({ length: messages.length }, (_, i) => i + 1).map(
              (num) => (
                <li className={step >= num && "active"}>{num}</li>
              )
            )}
          </ul>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button disabled={!hasPrev} onClick={handlePrevious}>
              👈 Previous
            </Button>
            <Button disabled={!hasNext} onClick={handleNext}>
              Next 👉
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
