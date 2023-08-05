import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "dec": {
      return { ...state, count: state.count - state.step };
    }
    case "inc": {
      return { ...state, count: state.count + state.step };
    }
    case "set_count": {
      return { ...state, count: action.setCount };
    }
    case "set_step": {
      return { ...state, step: action.setStep };
    }
    case "reset": {
      return initialState;
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const DateCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "set_count", setCount: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "set_step", setStep: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
export default DateCounter;
