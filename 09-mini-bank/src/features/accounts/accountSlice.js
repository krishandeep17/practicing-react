// ------------------------------------------------- //
// ---------- USING MODERN REDUX TOOLKIT ---------- //
// ------------------------------------------------- //

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    // If you need to customize the creation of the payload value of an action creator by means of a `prepare callback`, the value of the appropriate field of the `reducers` argument object should be an object instead of a function. This object must contain two properties: `reducer` and `prepare`. The value of the `reducer` field should be the case reducer function while the value of the `prepare` field should be the prepare callback function:

    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

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

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

export default accountSlice.reducer;
