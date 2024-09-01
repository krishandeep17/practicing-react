# Redux CheatSheet

## Table of Contents

- [Redux](#redux)
  - [Creating a Redux Store](#creating-a-redux-store)
  - [Connecting our Redux App with React](#connecting-our-redux-app-with-react)
  - [Redux Middleware](#redux-middleware)
  - [Redux Thunks](#redux-thunks)
- [Redux Toolkit (RTK)](#redux-toolkit-rtk)
  - [Create a Redux Store](#create-a-redux-store)
  - [Provide the Redux Store to React](#provide-the-redux-store-to-react)
  - [Create a Redux State Slice](#create-a-redux-state-slice)
  - [Add Slice Reducers to the Store](#add-slice-reducers-to-the-store)
  - [Use Redux State and Actions in React Components](#use-redux-state-and-actions-in-react-components)
  - [createAsyncThunk](#createasyncthunk)
- [Redux Toolkit Query (RTK Query)](#redux-toolkit-query-rtk-query)
  - [Install Redux Toolkit and React-Redux](#install-redux-toolkit-and-react-redux-1)
  - [Create API services](#create-api-services)
  - [Add the service to your store](#add-the-service-to-your-store)
  - [Wrap your application with the Provider](#wrap-your-application-with-the-provider)
  - [Use the query in a component](#use-the-query-in-a-component)
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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Install Redux Toolkit and React-Redux

```
npm install @reduxjs/toolkit react-redux
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Create a Redux Store

**`configureStore()`**: wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Provide the Redux Store to React

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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Create a Redux State Slice

**`createSlice()`**: accepts an object of **reducer functions**, a **slice name**, and an **initial state value**, and automatically generates a slice reducer with corresponding action creators and action types.

```js
// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Add Slice Reducers to the Store

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Use Redux State and Actions in React Components

```js
// src/features/counter/Counter.js
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleDecrement() {
    dispatch(decrement());
  }

  function handleIncrement() {
    dispatch(increment());
  }

  return (
    <div>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span>{count}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### createAsyncThunk

A function that accepts a Redux action type string and a callback function that should return a promise.

Now, what's special about this is that, this `createAsyncThunk` will basically produce three additional action types. So one for the `pending` promise state, one for the `fulfilled` state and one for the `rejected` state.

```js
// userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // code that we want to execute as soon as this action will be dispatched

  return { position, address }; // Payload of the FULFILLED state
});

// Initial State
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  // `createAsyncThunk` will basically produce three additional action types:
  // `pending`, `fulfilled`, and `rejected`
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Redux Toolkit Query (RTK Query)

RTK Query is an advanced data fetching and caching tool, designed to simplify common cases for loading data in a web application. RTK Query itself is built on top of the Redux Toolkit core, and leverages RTK's APIs like `createSlice` and `createAsyncThunk` to implement its capabilities.

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Install Redux Toolkit and React-Redux

```
npm install @reduxjs/toolkit react-redux
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Create API services

#### apiSlice.js:

This will be a base file to set up the `createApi` instance that other slices will use.

```js
// src/services/apiSlice.js
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product"],
  endpoints: () => ({}),
});
```

#### productsApiSlice.js:

Injecting & exporting additional endpoints

```js
// src/services/productsApiSlice.js
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [
              ...result.map((product) => ({
                type: "Product",
                id: product._id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    getProduct: builder.query({
      query: (productId) => `products/${productId}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `products/${product._id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg._id },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} = productsApiSlice;
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Add the service to your store

```js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./services/apiSlice";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Wrap your application with the Provider

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Use the query in a component

```js
import { useGetProductsQuery } from "../../services/productsApiSlice";

export default function Products() {
  // Using a query hook automatically fetches data and returns query values
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Use the mutation in a component

```js
import { useAddProductMutation } from "../../services/productsApiSlice";

export default function AddProductForm() {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleAddPost = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newProduct = Object.fromEntries(formData.entries());

    try {
      await addProduct(newProduct).unwrap();
    } catch (error) {
      console.log("Failed to add product.");
    }

    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" />
      </div>
      <div>
        <label htmlFor="brand">Brand</label>
        <input type="text" id="brand" name="brand" />
      </div>
      <div>
        <label htmlFor="stock">Stock</label>
        <input type="number" id="stock" name="stock" />
      </div>

      <button type="submit" disabled={isLoading}>
        Add Products
      </button>
    </form>
  );
}
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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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
