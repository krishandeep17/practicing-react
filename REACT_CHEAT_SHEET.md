# React CheatSheet

## Table of Contents

- [JSX](#jsx)

- [React Elements](#react-elements)
  - [React Element Tags](#react-element-tags)
  - [React Element Attributes](#react-element-attributes)
  - [React Elements Embedded Javascript](#react-elements-embedded-javascript)
  - [React Fragments](#react-fragments)
- [React Components](#react-components)
  - [Functional Components](#functional-components)
  - [Component Props](#component-props)
  - [The Children Prop](#the-children-prop)
  - [Conditional Rendering](#conditional-rendering)
  - [Lists in Components](#lists-in-components)
- [Hooks](#hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useRef](#useref)
  - [Custom Hooks](#custom-hooks)
  - [useReducer](#usereducer)
- [Context API](#context-api)
  - [Advanced Pattern](#advanced-pattern-a-custom-provider-and-hook)
- [State Placement Options](#state-placement-options)
- [State Management Tool Options](#state-management-tool-options)

## JSX

Almost all React code is written in JSX. JSX is a syntax extension of Javascript that allows us to write HTML-like syntax in Javascript.

## React Elements

### React Element Tags

React elements look just like HTML, in fact they render the same equivalent HTML elements.

```html
<h1>My Header</h1>
<button>My Button</button>
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
</ul>
```

Single tag elements like the `img` element and the `br` element must be closed like so

```html
<img src="my-image-source.jpeg" /> <br />
```

### React Element Attributes

React elements have different attributes compares to their HTML counterparts. Since JSX is still javascript, we use camelCase. Also, `class` is a protected keyword in javascript (creating classes) so the HTML `class` attribute in JSX is `className`.

```html
<div className="my-container">
  <img className="my-container-image" src="my-image.jpeg" />
</div>
```

### React Elements Embedded Javascript

The power of JSX is that it’s javascript and HTML. This means you can write javascript to render different attributes directly in your javascript using curly braces `{}`.

```js
const divClass = "my-div-class"

<div className={divClass}></div>
```

### React Element Inline Styles

React elements just like HTML elements can use the `style` attribute, but you pass them as javascript objects instead of double quote strings.

#### In HTML

```html
<h1 style="color: blue; text-align: center">This is a header</h1>
```

#### In JSX

```js
<h1 style={{ color: "blue", textAlign: "center" }}>This is a header</h1>
```

### React Fragments

React has a special element called a fragment. It’s a special element that doesn’t actually render into the DOM, but can act as a parent to a group of elements.

```js
import { Fragment } from "react";

<Fragment>
  <h1>My H1</h1>
  <p>My Paragraph</p>
</Fragment>;
```

If you don’t want to import `Fragment` from the React library, you can also use `<>`.

```js
<>
  <h1>My H1</h1>
  <p>My Paragraph</p>
</>
```

Fragments are useful in components since components require us to return one parent level element, and if we don’t want to needlessly add HTML elements to our website, we can just use fragments.

### React Components

Components are the building blocks of your web application. We use them to organize groups of React elements together so they’re reusable. There are two kinds of components, class components and functional components but functional components are the de facto standard today. They both follow the same two rules:

1. Component names must be capitalized i.e. MyComponent instead of myComponent
2. They must return JSX, more specifically one parent level JSX element (more on this later).

### Functional Components

Functional components are just javascript functions that return JSX. Here's how you create a functional component using function declaration:

```js
function MyComponent() {
  return <h1>My Component</h1>;
}
```

You can also use an arrow function:

```js
const MyComponent = () => {
  return <h1>My Component</h1>;
};
```

The component can then be used like any React element.

```js
const MyComponent = () => {
  return <h1>My Component</h1>;
};

const MyOtherComponent = () => {
  return (
    <div>
      <MyComponent /> // <h1>My Component</h1>
      <p>Sample Text</p>
    </div>
  );
};
```

### Component Props

We can pass data to our components through custom attributes on the component element. We can choose any name for the attribute as long they don’t overlap with the existing general element attributes (i.e. `className` , `styles` , `onClick` etc.). These properties are then grouped into an object where the attribute name is the key, and the value is the value. Here we are passing a prop `title` from the App component to our component `MyComponent` .

```js
const MyComponent = (props) => {
  return <h1>{props.title}</h1>;
};

const App = () => {
  return (
    <MyComponent title="Hello World" /> // Props == { title: "Hello World" }
  );
};
```

Remember, you can embed any of the values in your props object in JSX since it’s just javascript, just remember to use curly braces (`{}`).

Since the props are just an object, it’s common to destructure the values for cleaner,
simpler code.

```js
const MyComponent = ({ title }) => {
  return <h1>{title}</h1>;
};

const App = () => {
  return <MyComponent title="Hello World" />;
};
```

Any JavaScript value can be passed as a prop such as arrays, objects, other elements
and components!

### The Children Prop

All component have a special prop called `children`. Any data (usually components and react elements) sitting between the opening and closing tags of the component get
passed in as `children`.

```js
const Greeting = ({ children }) => {
  return children; // <h1>Hello World!</h1>
};

const App = () => {
  return (
    <Greeting>
      <h1>Hello World!</h1>
    </Greeting>
  );
};
```

We can render it anywhere in our component’s JSX! Just remember that it’s a javascript variable so make sure it’s wrapped in curly braces `{}`.

```js
const GreetingCard = ({ children }) => {
  return (
    <div>
      <h1>Greetings!</h1>
      {children}
      {/* 
        <p>Example Children Paragraph</p> 
        <button>Example Children Button</button>
      */}
    </div>
  );
};

const App = () => {
  return (
    <GreetingCard>
      <p>Example Children Paragraph</p>
      <button>Example Children Button</button>
    </GreetingCard>
  );
};
```

### Conditional Rendering

Since our components are written in JSX which is just javascript, we can conditionally render different things with javascript. A basic example is to use an `if` statement in our functional component.

```js
const Greeting = ({ large }) => {
  if (large) {
    return <h1>Hello World!</h1>;
  }
  return <p>Hello World!</p>;
};

const App = () => {
  return (
    <div>
      <Greeting large={true} /> // <h1>Hello World!</h1>
      <Greeting large={false} /> // <p>Hello World!</p>
    </div>
  );
};
```

We can also use a ternary operator!

```js
const Greeting = ({ large }) => {
  return large ? <h1>Hello World!</h1> : <p>Hello World!</p>;
};

const App = () => {
  return (
    <div>
      <Greeting large={true} /> {/* <h1>Hello World!</h1> */}
      <Greeting large={false} /> {/* <p>Hello World!</p> */}
    </div>
  );
};
```

In a component, if we return null nothing will render to the DOM.

```js
const Greeting = ({ display, message }) => {
  return display ? <h1>{message}</h1> : null;
};

const App = () => {
  return (
    <div>
      <Greeting message="rendered!" display={true} /> // <h1>rendered!</h1>
      <Greeting message="not rendered!" display={false} /> // nothing rendered
    </div>
  );
};
```

### Lists in Components

If we want to duplicate elements/components, we can do so by looping through an array with the `.map()` method as long as we return JSX from the callback.

Remember, this is javascript so wrap your `map` call in `{}`. We must remember to add the attribute `key` to the top level JSX element we return from `map`, the value must also be a
unique value for each iteration.

```js
const ShoppingList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}> {item} </li>
      ))}
    </ul>
  );
};

const App = () => {
  const groceries = ["broccoli", "carrots", "chicken", "garlic"];

  return <ShoppingList items={groceries} />;
};
```

> **_IMPORTANT REMINDER_**  
> Remember, when mapping over an array into JSX, you **must** include a `key` attribute with a unique value. It’s tempting to use the index from `map` but this may cause issues down the road.

The reason is because React uses the key to determine which components to re-render, with the keys themselves being unique identifiers hence why the values need to be unique. Indexes are just numbers and in lists where there are multiple maps, if you always use the index as the key React may get confused.

```js
const ShoppingList = () => {
  const vegetables = ["broccoli", "carrots", "garlic"];
  const meats = ["chicken", "beef"];

  return (
    <ul>
      {vegetables.map((veg, idx) => (
        <li key={idx}>{veg}</li>
      ))}

      {meats.map((meat, idx) => (
        <li key={idx}>{meat}</li>
      ))}
    </ul>
  );
};
```

As you can see in the above example, the `map` of vegetables has indexes 0, 1 and 2 since there are 3 items. The `map` for meats will be have index 0 and 1 since there are 2 items. This is a problem since React can’t differentiate the vegetable item with `key`0 and the meat item with `key`0, or the vegetable item with `key`1 and the meat item with `key`1.  
This is why we need to use unique keys !

Below we can fix this using the name attribute, which we know are unique.

```js
const ShoppingList = () => {
  const vegetables = ["broccoli", "carrots", "garlic"];
  const meats = ["chicken", "beef"];

  return (
    <ul>
      {vegetables.map((veg) => {
        <li key={veg}>{veg}</li>;
      })}

      {meats.map((meat) => {
        <li key={meat}>{meat}</li>;
      })}
    </ul>
  );
};
```

## Hooks

Hooks were introduced in React version 16.8 as a way to extend additional functionality into functional components. Previously this functionality was only available to class components, but through hooks we can super charge our functional components!

To better understand hooks, we need to understand the React component lifecycle. There are three main phases of any React component:

1. The mounting phase when a component is created and inserted into the DOM. This is the initial render and only happens once in a components lifecycle.
2. The updating phase is when a component re-renders due to updates. This happens either due to prop changes or state changes (more below).
3. The final phase is the un-mounting phase, when a component is removed from the DOM.

Hooks are normally called at the _top_ of our components.

### useState

**`useState` hook allows us to store values scoped to a component. Any changes to those values will cause the component and any of it’s child components to rerender.**

As mentioned above, components re-render in the updating phase (2) due to prop changes and state changes. State is data stored inside of a component that can be updated/changed. When this state data changes, this will trigger a re-render of the component. While we can store and change data in a variable, those changes will not trigger a re-render. With the `useState` hook, it does allow us to trigger re-renders on changes to that data.

`useState` is a function that we can pass an optional argument representing the initial value we want to store. The `useState` hook returns back an array containing two values, the first is the current state value, the second is a setter function to update this state value.

```js
import { useState } from "react";

const MyComponent = () => {
  const [value, setValue] = useState(initialValue);
};
```

The `setValue` function we de-structured is called the _setter_ function. When we call this setter function, we pass it the new value we want to set the state to.

Let’s look at a basic counter example

```js
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      {count}
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};
```

Whenever `setCount` is called, the `Counter` component will re-render, which is the behaviour we want since `count` is has updated and we want our DOM to display the new value.

It’s important to note that the setter function from `useState` is asynchronous. This means that if you try to log the state immediately after setting it, you might not see the updated
state.

### useEffect

**`useEffect` is a hook that allows us to create side effects in our functional components.**

`useEffect` takes two arguments:

1. The first argument is a callback function called the _effect function_ that contains the side effect code we want to run.
2. The second argument is an array called the _dependency array_ which contains values from outside the scope of the effect function. Whenever one of these values changes, `useEffect` will run the effect function.

```js
import { useEffect } from "react";

const MyComponent = () => {
  useEffect(
    () => {
      // side effect code here
    },
    [
      // dependencies go here
    ]
  );
};
```

The _effect function_ will run

1. Once when the component mounts.
2. Whenever any value in the dependency array changes.

A common use case for `useEffect` is to fetch some data and store it in a state variable.

```js
import { useState, useEffect } from "react";

const url = "https://api.github.com/users";

const FetchData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // you can also setup function outside
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <h3>github users</h3>
      <ul className="users">
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h5>{login}</h5>
                <a href={html_url}>profile</a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FetchData;
```

Passing an empty _dependency array_ will only call our _effect function_ once during the mounting phase since there are no dependencies to react to.

The _effect function_ will run every time a value in the dependency array changes. Values the _effect function_ relies on but comes from outside of it’s scope are added to the _dependency array_. These include props:

```javascript
import { useState, useEffect } from "react";

const UserList = ({ sourceURL }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch(sourceURL)
      .then((response) => response.json())
      .then((users) => setUserList(users));
  }, [sourceURL]);

  return (
    <div>
      {userList.map((user) => (
        <h2 key={user.id}>{user.name}</h2>
      ))}
    </div>
  );
};
```

As well as other state variables:

```js
import { useState, useEffect } from "react";

import User from "../components/user";
import { userAPI } from "../api/userAPI";

const UserList = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);

  const handleTextChange = (e) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    userAPI.getByUsername(userName).then((user) => setUser(user));
  }, [userName]);

  return (
    <div>
      <h2>Search by username</h2>
      <input type="text" onChange={handleTextChange} />
      <User user={user} />
    </div>
  );
};
```

#### Cleanup Function

If we want to run a callback when the component unmounts, we can do so by returning that callback from the _effect function_. This is useful for cleanup functions that need to undo effects like subscriptions.

```js
import { useEffect, useState } from "react";

const CleanupFunction = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button className="btn" onClick={() => setToggle(!toggle)}>
        toggle component
      </button>
      {toggle && <RandomComponent />}
    </div>
  );
};

const RandomComponent = () => {
  useEffect(() => {
    const intID = setInterval(() => {
      console.log("hello from interval");
    }, 1000);
    // does not stop, keeps going
    // every time we render component new interval gets created
    return () => clearInterval(intID);
  }, []);

  return <h1>hello there</h1>;
};

export default CleanupFunction;
```

It’s important to note, the _effect function_ runs _after_ React renders/re-renders the component to ensure our effect callback does not block browser painting.

### useRef

**`useRef` is a hook that stores a value in a component like `useState` except changes to that value won’t cause the component to re-render.**

It accepts one argument as the initial value and returns a _reference_ object.

```js
import { useRef } from "react";

const MyComponent = () => {
  const ref = useRef(initialValue);

  // ...remaining component code
};
```

The value of `ref` is:

```js
{
  current: initialValue;
}
```

We can access and mutate the current value of the ref through the `ref.current` property. This value will persist across re-renders.

```js
import { useRef } from "react";

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
  }

  return (
    <>
      <h1>count: {ref.current} </h1>
      <button onClick={handleClick}>Click me!</button>
    </>
  );
}
```

Every time we click the button and trigger `handleClick` , we are incrementing the `ref.current` value. However, because this mutation does not trigger the component to re-render, so the count does not update in the DOM even though the stored value is updating.

It is common to store DOM node references in a ref.

```js
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

When the `InputFocus` component mounts, we will call on the DOM node for the input and automatically focus it.

### Custom Hooks

- Allow us to reuse **non-visual logic** in multiple components
- One custom hook should have **one purpose**, to make it **reusable** and **portable** (even across multiple projects)
- **Rules of hooks** apply to custom hooks too

```js
// Needs to use one or more hooks
import { useEffect, useState } from "react";

// Function name needs to start with use - `useLocalStorage`
const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
  // Unlike components, can receive and return any relevant data (usually [] or {})
};

export default useLocalStorage;
```

### useReducer

State management with `useState` is not enough in certain situations:

1. When components have **a lot of state variables and state updates**, spread across many event handlers **all over the component**
2. When **multiple state updates** need to happen **at the same time** (as a reaction to the same event, like "starting a game")
3. When updating one piece of state **depends on one or multiple other pieces of state**

In all these situations, `useReducer` can be of great help

#### Managing State with `useReducer`

- An alternative way of setting state, ideal for **complex state** and **related piece of state**
- Stores related pieces of state in `state` object
- useReducer needs `reducer`: function containing **all logic to update state. Decouples state logic from component**
- `reducer`: pure function (**_no side effects!_**) that takes current state and action, **and returns the next state**
- `action`: object and describes **how to update state**
- `dispatch`: function to trigger state updates, by **"sending" actions** from event handlers to the **reducer**

```js
import { useEffect, useReducer } from "react";

const initialState = {
  cities: [],
  error: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }

    case "cities/loaded": {
      return { ...state, cities: action.payload, isLoading: false };
    }

    case "rejected": {
      return { ...state, error: action.payload };
    }

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, error, isLoading } = state;

  useEffect(() => {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(import.meta.env.VITE_SERVER);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error in loading the cities...",
        });
      }
    }

    getCities();
  }, []);

  if (isLoading) return <Loader />;

  if (error) return <Error message={error} />;

  return (
    <div>
      <Cities cities={cities} />
    </div>
  );
}
```

## Context API

- System to pass data throughout the app **without manually passing props** down the tree
- Allow us to **"broadcast global state"** to the entire app

1. **Provider:** gives all child components access to the value
2. **value:** data that we want to make available (usually state and functions)
3. **Consumers:** all components that read the provided context value

### Advanced Pattern: A Custom Provider and Hook

It is composed of two parts basically. First, the `Provider` and then our own `Custom Hook` to read the value out of the context.

This is basically like a recipe that you can always follow in all your own projects when you want to use Context API

> To use the following recipe, simply replace `Global` with your own `Context` name

```js
// GlobalContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// CREATE A CONTEXT
const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [name, setName] = useState("krishandeep");

  // PROVIDE VALUE TO THE CHILD COMPONENTS
  return (
    <GlobalContext.Provider value={{ name, setName }}>
      {children}
    </GlobalContext.Provider>
  );
}

// CUSTOM HOOK
export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (context === undefined)
    throw new Error("GlobalContext was used outside of the GlobalProvider");

  return context;
}
```

Wrap your `App` component inside `GlobalProvider` so that you can consume context value in your entire application.

> Usually, we create one `context` per state domain like `PostContext` or `SearchContext`

```js
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalProvider } from "./contexts/GlobalContext.js"; // 👈🏻

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
```

Consuming context value

```js
// User.jsx
import { useGlobalContext } from "../contexts/GlobalContext";

export default function User() {
  const { name, setName } = useGlobalContext();

  return (
    <div>
      <h2>{name}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
```

## State Placement Options

| 🤔 **Where to place state?** | **Tools** 👇🏻                          | **When to use?** 👇🏻                |
| ---------------------------- | ------------------------------------- | ---------------------------------- |
| 🏠 Local Component           | useState, useReducer or useRef        | Local State                        |
| 🧑🏻‍👩🏻‍👦🏻 Parent Component    | useState, useReducer or useRef        | Lifting Up State                   |
| 🌐 Context                   | Context API + useState or useReducer  | Global State (preferably UI State) |
| 🗃️ 3rd Party Library         | Redux, React Query, SWR, Zustand etc. | Global State (remote or UI)        |
| 🔗 URL                       | React Router                          | Global State passing between pages |
| 💻 Browser                   | Local storage, session storage, etc.  | Storing data in user's browser     |

## State Management Tool Options

|                  | **LOCAL STATE**                                              | **GLOBAL STATE**                                                                                                                           |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **UI STATE**     | <ul><li>useState</li><li>useReducer</li><li>useRef</li></ul> | <ul><li>Context API + useState/useReducer</li><li>Redux, Zustand, Recoil, etc.</li><li>React Router</li></ul>                              |
| **REMOTE STATE** | <ul><li>fetch + useEffect + useState/useReducer</li></ul>    | <ul><li>Context API + useState/useReducer</li><li>Redux, Zustand, Recoil, etc.</li><li>React Query</li><li>SWR</li><li>RTK Query</li></ul> |
