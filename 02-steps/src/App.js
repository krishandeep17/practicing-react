import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const Button = ({ type, step, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={
        type === "previous" && step > 1
          ? "active"
          : type === "next" && step < 3
          ? "active"
          : ""
      }
    >
      {children}
    </button>
  );
};

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
    }
  };

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
            <li className={step >= 1 && "active"}>1</li>
            <li className={step >= 2 && "active"}>2</li>
            <li className={step >= 3 && "active"}>3</li>
          </ul>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button type="previous" step={step} onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button type="next" step={step} onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default App;
