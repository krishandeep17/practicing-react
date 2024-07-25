// ------------------------------------------ //
// ---------- USING CLASSIC REDUX ---------- //
// ------------------------------------------ //

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// REDUCER
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    }

    case "account/convertingCurrency": {
      return { ...state, isLoading: true };
    }

    case "account/withdraw": {
      return { ...state, balance: state.balance - action.payload };
    }

    case "account/requestLoan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    }

    case "account/payLoan": {
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    }

    default: {
      return state;
    }
  }
}

// ACTION CREATOR FUNCTIONS
export function deposit(amount, currency) {
  if (currency === "INR") {
    return { type: "account/deposit", payload: amount };
  }

  // if we return a function here then `Redux` knows that this is asynchronous action that we want to execute before dispatching anything
  return async function (dispatch, getState) {
    // API call
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
    );

    const data = await res.json();

    const convertedAmount = data.rates.INR;

    // return action
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
