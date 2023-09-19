# React Router DOM v6

## Table of Contents

- [React Router Basics](#react-router-basics)
  - [Installation](#installation)
  - [Setup The Router](#setup-the-router)
  - [Defining Routes](#defining-routes)
  - [Handling Navigation](#handling-navigation)
- [Advanced Route Definitions](#advanced-route-definitions)
  - [Dynamic Routing](#dynamic-routing)
  - [Routing Priority](#routing-priority)
  - [Universal Route](#universal-route)
  - [Nested Routes](#nested-routes)
  - [Shared Layouts](#shared-layouts)
  - [Outlet Context](#outlet-context)
- [Handle Navigation](#handle-navigation)
  - [Link Navigation](#link)
  - [NavLink Navigation](#navlink)
  - [Manual Navigation](#manual-navigation)
    - [Navigate Component](#navigate-component)
    - [useNavigation Hook](#usenavigation-hook)
  - [Navigation Data](#navigation-data)
    - [Dynamic Parameters](#dynamic-parameters)
    - [Search Parameters](#search-parameters)
    - [State/Location Data](#statelocation-data)

## React Router Basics

### Installation

```
npm i react-router-dom
```

### Setup The Router

```js
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈🏻

import "./styles.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      // Wrap your `App` component inside `BrowserRouter` so that you can do
      routing and use all the custom hooks from React Router in your entire
      application.
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Defining Routes

```js
// App.jsx
import { Route, Routes } from "react-router-dom";

import { BookList, Home } from "./components";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookList />} />
    </Routes>
  );
}
```

### Handling Navigation

Normally in an application you would navigate with anchor tags `<a></a>`, but React Router uses its own custom `Link` or `NavLink` component to handle navigation.

The only difference between the `Link` component and an anchor tag is that we used the `to` prop to set the URL instead of the `href`.

```js
// Navbar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

## Advanced Route Definitions

### Dynamic Routing

```js
<Route path="/books/:id" element={<Book />} />
```

```js
// Book.jsx
import { useParams } from "react-router-dom";

export default function Book() {
  const { id } = useParams();

  return <h1>Book {id}</h1>; // https://.../books/256 -> Book 256;
}
```

### Routing Priority

```js
<Route path="/books/:id" element={<Book />} />
<Route path="/books/new" element={<NewBook />} />
```

In older versions of React Router whichever route was defined first would be the one that is rendered so in our case the `/books/:id` route would be rendered which is obviously not what we want. Luckily, version 6 of React Router changed this so now React Router will use an algorithm to determine which route is most likely the one you want. In our case we obviously want to render the `/books/new` route so React Router will select that route for us.

### Universal Route

```js
<Route path="*" element={<NotFound />} />
```

A `*` will match anything at all which makes it perfect for things like a 404 page. A route that contains a `*` will also be less specific than anything else so you will never accidentally match a `*` route when another route would have also matched.

> **Note**: Always put this route at the end.

### Nested Routes

```js
<Route path="/books">
  <Route index element={<BookList />} /> // index is same as path="/"
  <Route path=":id" element={<Book />} /> // same as path="/books/:id"
  <Route path="new" element={<NewBook />} />
</Route>
```

### Shared Layouts

Let’s imagine that we want to render a nav section with links to each book as well the new book form from any of our book pages. To do this normally we would need to make a shared component to store this navigation and then import that into every single book related component. This is a bit of a pain, though, so React Router created its own solution to solve this problem. If you pass an `element` prop to a parent route it will render that component for every single child `Route` which means you can put a shared nav or other shared components on every child page with ease.

```js
<Route path="/books" element={<BooksLayout />}>
  <Route index element={<BookList />} />
  <Route path=":id" element={<Book />} />
  <Route path="new" element={<NewBook />} />
</Route>
```

```js
// BooksLayout.jsx
import { Link, Outlet } from "react-router-dom";

export default function BooksLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/books/1">Book 1</Link>
          </li>
          <li>
            <Link to="/books/2">Book 2</Link>
          </li>
          <li>
            <Link to="/books/new">New Book</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
```

The way our new code will work is whenever we match a route inside the `/book` parent `Route` it will render the `BooksLayout` component which contains our shared navigation. Then whichever child `Route` is matched will be rendered wherever the `Outlet` component is placed inside our layout component. The `Outlet` component is essentially a placeholder component that will render whatever our current page’s content is. This structure is incredibly useful and makes sharing code between routes incredibly easy.

Now the final way you can share layouts with React Router is by wrapping child `Route` components in a parent `Route` that only defines an `element` prop and no `path` prop.

```js
<Route element={<OtherLayout />}>
  <Route path="/contact" element={<Contact />} />
  <Route path="/about" element={<About />} />
</Route>
```

This bit of code will create two routes, `/contact` and `/about`, which both are rendered inside the `OtherLayout` component. This technique of wrapping multiple `Route` components in a parent `Route` component with no `path` prop is useful if you want those routes to share a single layout even if they don’t have a similar path.

### Outlet Context

The final important thing to know about Outlet components is they can take in a context prop which will work just like React context.

```js
import { Link, Outlet } from "react-router-dom";

export default function BooksLayout() {
  return (
    <>
      <nav>...</nav>

      <Outlet context={{ message: "hey there!" }} />
    </>
  );
}
```

```js
import { useParams, useOutletContext } from "react-router-dom";

export default function Book() {
  const { id } = useParams();

  const context = useOutletContext(); // 👈🏻
  // `useOutletContext` hook to access the value for our context.

  return (
    <h1>Book {id}</h1> // https://.../books/256 -> Book 256
    <p>{context.message}</p> // hey there!
  );
}
```

## Handle Navigation

### Link

```js
<Link to="/">Home</Link>
<Link to="../">Back</Link>
<Link to="edit">Edit</Link>
```

Besides the `to` prop, there are other props also that are important to the `Link` component.

#### `replace`

The replace prop is a boolean that when set to true will cause this link to replace the current page in the browser history.

#### `reloadDocument`

This prop is another boolean and is very simple. If it is set to true your Link component will act like a normal anchor tag and do a full page refresh on navigation instead of just re-rendering the content inside your `Routes` component.

#### `state`

This prop lets you pass data along with your Link that does not show up anywhere in the URL.

### NavLink

This component works exactly the same as the `Link` component, but it is specifically for showing active states on links, for example in nav bars. By default if the `to` property of a `NavLink` is the same as the URL of the current page the link will have an `active` class added to it which you can use for styling.

### Manual Navigation

Now sometimes you want to manually navigate a user based on things like submitting a form or not having access to a specific page. For those use cases you will need to either use the `Navigate` component or the `useNavigation` hook.

#### Navigate Component

The `Navigate` component is a really simple component that when rendered will automatically redirect the user to the `to` prop of the `Navigate` component.

```js
<Navigate to="/" />
```

#### `useNavigation` Hook

This hook is a really simple hook that takes no parameters and returns a single `navigate` function which you can use to redirect a user to specific pages. This `navigate` function takes two parameters. The first parameter is the `to` location you want to redirect the user to and the second parameter is an object that can have keys for `replace`, and `state`.

```js
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function onSubmit() {
  // Submit form results
  navigate("/books", { replace: true, state: { bookName: "Fake Title" } });
}
```

Another way you can use the `navigate` function is to pass it a number. This will allow you to simulate hitting the forward/back button.

```js
navigate(-1); // Go back one page in history
navigate(-3); // Go back three pages in history
navigate(1); // Go forward one page in history
```

## Navigation Data

Finally it is time to talk about passing data between pages. There are 3 main ways you can pass data between pages.

1. Dynamic Parameters
2. Search Parameters
3. State/Location Data

### Dynamic Parameters

We have already talked about how to use dynamic parameters in URLs by using the `useParams` hook. This is the best way to handle passing information like ids.

### Search Parameters

Search parameters are all of the parameters that come after the `?` in a URL (`?name=Kyle&age=27`). In order to work with search parameters you need to use the `useSearchParams` hook which works very similarly to the `useState` hook.

```js
import { useSearchParams } from "react-router-dom";

export default function SearchExample() {
  const [searchParams, setSearchParams] = useSearchParams({ n: 3 });

  const number = searchParams.get("n");

  return (
    <>
      <h1>{number}</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setSearchParams({ n: e.target.value })}
      />
    </>
  );
}
```

In this example we have an input that as we type in will update the search portion of our URL. For example if our input has the value of `32` our URL will look like `http://localhost:3000?n=32`.

### State/Location Data

The final type of data you can store is state and location data. This information is all accessible via the `useLocation` hook. Using this hook is very simple as it returns one value and takes no parameters.

```js
import { useSearchParams, Link } from "react-router-dom";

const location = useLocation();

console.log(location);
// URL -> `http://localhost/books?n=32#id`
//   {
//   pathname: "/books",
//   search: "?n=32",
//   hash: "#id",
//   key: "2JH3G3S",
//   state: { name: "Kyle" }
// }

return(
  <Link to="/books" state={{ name: "Kyle" }}>
)
```
