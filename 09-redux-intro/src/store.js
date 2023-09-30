import { legacy_createStore as createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Back in the day, react developers used to place these strings into separate variables
// const ACCOUNT_DEPOSIT = "account/deposit";

const store = createStore(reducer);

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit": {
      return { ...state, balance: state.balance + action.payload };
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
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
