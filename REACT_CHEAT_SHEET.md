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

## JSX

Almost all React code is written in JSX. JSX is a syntax extension of Javascript that allows us to write HTML-like syntax in Javascript.

## React Elements

### React Element Tags

React elements look just like HTML, in fact they render the same equivalent HTML elements.

```javascript
<h1>My Header</h1>
<button>My Button</button>
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li>list item 3</li>
</ul>
```

Single tag elements like the `img` element and the `br` element must be closed like so

```javascript
<img src="my-image-source.jpeg" />
<br />
```

### React Element Attributes

React elements have different attributes compares to their HTML counterparts. Since JSX is still javascript, we use camelCase. Also, `class` is a protected keyword in javascript (creating classes) so the HTML `class` attribute in JSX is `className`.

```javascript
<div className="my-container">
  <img className="my-container-image" src="my-image.jpeg" />
</div>
```

### React Elements Embedded Javascript

The power of JSX is that it’s javascript and HTML. This means you can write javascript to render different attributes directly in your javascript using curly braces `{}`.

```javascript
const divClass = "my-div-class"

<div className={divClass}></div>
```

### React Element Inline Styles

React elements just like HTML elements can use the `style` attribute, but you pass them as javascript objects instead of double quote strings.

#### In HTML

```javascript
<h1 style="color: blue; text-align: center">This is a header</h1>
```

#### In JSX

```javascript
<h1 style={{ color: "blue", textAlign: "center" }}>This is a header</h1>
```

### React Fragments

React has a special element called a fragment. It’s a special element that doesn’t actually render into the DOM, but can act as a parent to a group of elements.

```javascript
import { Fragment } from "react";

<Fragment>
  <h1>My H1</h1>
  <p>My Paragraph</p>
</Fragment>;
```

If you don’t want to import `Fragment` from the React library, you can also use `<>`.

```javascript
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

```javascript
function MyComponent() {
  return <h1>My Component</h1>;
}
```

You can also use an arrow function:

```javascript
const MyComponent = () => {
  return <h1>My Component</h1>;
};
```

The component can then be used like any React element.

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
const GreetingCard = ({ children }) => {
  return (
    <div>
      <h1>Greetings!</h1>
      {children}
      // <p>Example Children Paragraph</p>
      // <button>Example Children Button</button>
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

```javascript
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

```javascript
const Greeting = ({ large }) => {
  return large ? <h1>Hello World!</h1> : <p>Hello World!</p>;
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

In a component, if we return null nothing will render to the DOM.

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
import { useState } from "react";

const MyComponent = () => {
  const [value, setValue] = useState(initialValue);
};
```

The `setValue` function we de-structured is called the _setter_ function. When we call this setter function, we pass it the new value we want to set the state to.

Let’s look at a basic counter example

```javascript
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

## useEffect

**`useEffect` is a hook that allows us to create side effects in our functional components.**

`useEffect` takes two arguments:

1. The first argument is a callback function called the _effect function_ that contains the side effect code we want to run.
2. The second argument is an array called the _dependency array_ which contains values from outside the scope of the effect function. Whenever one of these values changes, `useEffect` will run the effect function.

```javascript
import { useEffect } from 'react';

const MyComponent = () => {

 useEffect(() => {

  // side effect code here

 }, [// dependencies go here]);
}
```

The _effect function_ will run

1. Once when the component mounts.
2. Whenever any value in the dependency array changes.

A common use case for `useEffect` is to fetch some data and store it in a state variable.

```javascript
import { useState, useEffect } from "react";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setUserList(users));
  }, []);

  return (
    <div>
      {userList.map((user) => (
        <h2 key={user.id}>{user.name}</h2>
      ))}
    </div>
  );
};
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

```javascript
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

If we want to run a callback when the component unmounts, we can do so by returning that callback from the _effect function_. This is useful for cleanup functions that need to undo effects like subscriptions.

```javascript
useEffect(() => {
  ChatAPI.subscribeToUser(userID);

  return () => {
    // This function runs on unmount
    ChatAPI.unsubscribeFromUser(userID);
  };
}, []);
```

It’s important to note, the _effect function_ runs _after_ React renders/re-renders the component to ensure our effect callback does not block browser painting.
