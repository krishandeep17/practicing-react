# Redux CheatSheet

## Table of Contents

- [Redux](#redux)
  - [Creating a Redux Store](#creating-a-redux-store)
  - [Connecting our Redux App with React](#connecting-our-redux-app-with-react)
  - [Redux Middleware](#redux-middleware)
  - [Redux Thunks](#redux-thunks)
- [Redux Toolkit (RTK)](#redux-toolkit-rtk)
- [Context API VS. Redux](#context-api-vs-redux)

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Redux

- 3rd-party library to manage **global state**
- **Standalone** library, but easy to integrate with React apps using react-redux library
- All global state is stored in one **globally accessible store**, which is easy to update using **"actions"** (like useReducer)
- It's conceptually similar to using the Context API + useReducer

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Creating a Redux Store

```
npm install redux
```

```js
// store.js
import { legacy_createStore as createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Turns an object whose values are different reducer functions, into a single reducer function.
const rootReducer = combineReducers({
  account: accountReducer,
  // ...
});

// CREATE STORE
const store = createStore(rootReducer);

// REDUCER
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return { ...state, balance: state.balance + action.payload };
    }

    case "account/withdraw": {
      return { ...state, balance: state.balance - action.payload };
    }

    // ...

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
// ...

// DISPATCH
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
// ...

console.log(store.getState());
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Connecting our Redux App with React

```
npm install react-redux
```

```js
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./styles.css";
import App from "./App.jsx";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

```js
// src/features/accounts/BalanceDisplay.jsx
import { useSelector } from "react-redux";

export default function BalanceDisplay({ balance }) {
  const account = useSelector((state) => state.account); // A hook to access the redux store's state

  return <div className="balance">{account.balance}</div>;
}
```

```jsx
// src/features/accounts/AccountOperations.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deposit, withdraw } from "./accountSlice";

export default function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  const dispatch = useDispatch(); // A hook to access the redux dispatch function.

  function handleDeposit() {
    if (!depositAmount) return;

    dispatch(deposit(depositAmount));

    setDepositAmount("");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;

    dispatch(withdraw(withdrawalAmount));

    setWithdrawalAmount("");
  }

  // ...
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Redux Middleware

A function that sits between dispatching the action and the store. Allows us to run code **_after_** dispatching, but **_before_** reaching the reducer in the store.

- Perfect for asynchronous code
- API calls, timers, logging, etc.
- The place for side effects

### Redux Thunks

Thunks allow us to write additional Redux-related logic separate from a UI layer. This logic can include side effects, such as async requests or generating random values, as well as logic that requires dispatching multiple actions or access to the Redux store state.

A _thunk function_ is a function that accepts two arguments: the Redux store `dispatch` method, and the Redux store `getState` method.

```
npm install redux-thunk
```

```js
// stores.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

// ...

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // `applyMiddleware(thunk)`: we basically told Redux or our store that we want to use the `thunk` middleware in our application

export default store;
```

```js
// src/features/accounts/AccountOperations.jsx
// ...

function handleDeposit() {
  if (!depositAmount) return;

  // when we `dispatch` here and then call the `deposit` action creator instead of ending up with the event object, we'll end up a function
  // when a function dispatch, `Redux` know that, that function is the `thunk`
  dispatch(deposit(depositAmount, currency));

  setDepositAmount("");
  setCurrency("INR");
}

// ...
```

```js
// src/features/accounts/accountSlice.js
// ...

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

// ...
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Redux Toolkit (RTK)

- The **modern and preferred** way of writing Redux code
- An **opinionated** approach, forcing us to use Redux best practices
- 100% compatible with "classic" Redux, allowing us to **use them together**
- Allows us to write **a lot less code** to achieve the same result (less “boilerplate”)
- Gives us 3 big things (but there are many more…):
  1. We can write code that **"mutates"** state inside reducers (will be converted to **immutable** logic behind the scenes by "Immer" library)
  2. Action creators are **automatically** created
  3. **Automatic** setup of thunk middleware and DevTools

```
npm install @reduxjs/toolkit
```

```js
// stores.js
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

// configureStore(): wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.

export default store;
```

```js
// src/features/accounts/accountSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// createSlice(): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding `action creators` and `action types`.
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
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Context API VS. Redux

| <div align="center"><b>CONTEXT API + useReducer</b></div>                                            | <div align="center"><b>REDUX</b></div>                            |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 👍🏻 Built into React                                                                                  | 👎🏻 Requires additional package (larger bundle size)               |
| 👍🏻 Easy to set up a **single context**                                                               | 👎🏻 More work to set up **initially**                              |
| 👎🏻 Additional state "slide" requires new context **set up from scratch** ("provider hell" in App.js) | 👍🏻 Once set up, it’s easy to create **additional state "slices"** |
| 👎🏻 **No** mechanism for async operations                                                             | 👍🏻 Supports **middleware** for async operations                   |
| 👎🏻 Performance optimization is a **pain**                                                            | 👍🏻 Performance is optimized **out of the box**                    |
| 👎🏻 Only React DevTools                                                                               | 👍🏻 Excellent DevTools                                             |

### When to use Context API or Redux?

| <div align="center"><b>CONTEXT API + useReducer</b></div>                                                                    | <div align="center"><b>REDUX</b></div>                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use the Context API for global state management in `small` apps**                                                          | **Use Redux for global state management in `large` apps**                                                                                                                         |
| When you just need to share a value that **doesn’t change often** [*Color theme, preferred language, authenticated user, …*] | When you have lots of global UI state that needs to be **updated frequently** (because Redux is optimized for this) [*Shopping cart, current tabs, complex filters or search, …*] |
| When you need to solve a simple **prop drilling** problem                                                                    | When you have **complex state** with nested objects and arrays (_because you can mutate state with Redux Toolkit_)                                                                |

> **REMEMBER: There is no right answer that fits every project. It all depends on the project needs!**

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>
