import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

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
        onClick={() => setIsOpen((prevValue) => !prevValue)}
      >
        &times;
      </button>

      {isOpen && (
        <div className="container">
          <ul className="steps">
            <li className={step >= 1 ? "active" : ""}>1</li>
            <li className={step >= 2 ? "active" : ""}>2</li>
            <li className={step >= 3 ? "active" : ""}>3</li>
          </ul>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              className={step > 1 ? "active" : ""}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button className={step < 3 ? "active" : ""} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default App;
