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
- [React Router v6.4+](#react-router-v64)
  - [createBrowserRouter](#createbrowserrouter)
  - [loader](#loader)
  - [useLoaderData](#useloaderdata)
  - [useNavigation](#usenavigation)
  - [errorElement](#errorelement)
  - [useRouteError](#userouteerror)
  - [Form](#form)
  - [action](#action)
  - [request](#request)
  - [useActionData](#useactiondata)
  - [params](#params)

## React Router Basics

### Installation

```
npm i react-router-dom
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Setup The Router

Wrap your `App` component inside `BrowserRouter` so that you can do
routing and use all the custom hooks from React Router in your entire
application.

```js
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈🏻

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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

  return (
    <h1>Book {id}</h1>{/* https://.../books/256 -> Book 256 */}
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Routing Priority

```js
<Route path="/books/:id" element={<Book />} />
<Route path="/books/new" element={<NewBook />} />
```

In older versions of React Router whichever route was defined first would be the one that is rendered so in our case the `/books/:id` route would be rendered which is obviously not what we want. Luckily, version 6 of React Router changed this so now React Router will use an algorithm to determine which route is most likely the one you want. In our case we obviously want to render the `/books/new` route so React Router will select that route for us.

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Universal Route

```js
<Route path="*" element={<NotFound />} />
```

A `*` will match anything at all which makes it perfect for things like a 404 page. A route that contains a `*` will also be less specific than anything else so you will never accidentally match a `*` route when another route would have also matched.

> **Note**: Always put this route at the end.

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Nested Routes

```js
<Route path="/books">
  <Route index element={<BookList />} /> {/* index is same as path="/" */}
  <Route path=":id" element={<Book />} /> {/* same as path="/books/:id" */}
  <Route path="new" element={<NewBook />} />
</Route>
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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

      {/* Renders the child route's element, if there is one. */}
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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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
    <h1>Book {id}</h1> {/* https://.../books/256 -> Book 256 */}
    <p>{context.message}</p> {/* hey there! */}
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### NavLink

This component works exactly the same as the `Link` component, but it is specifically for showing active states on links, for example in nav bars. By default if the `to` property of a `NavLink` is the same as the URL of the current page the link will have an `active` class added to it which you can use for styling.

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Manual Navigation

Now sometimes you want to manually navigate a user based on things like submitting a form or not having access to a specific page. For those use cases you will need to either use the `Navigate` component or the `useNavigation` hook.

#### Navigate Component

The `Navigate` component is a really simple component that when rendered will automatically redirect the user to the `to` prop of the `Navigate` component.

```js
<Navigate to="/" />
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

#### `useNavigate` Hook

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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Navigation Data

Finally it is time to talk about passing data between pages. There are 3 main ways you can pass data between pages.

1. Dynamic Parameters
2. Search Parameters
3. State/Location Data

### Dynamic Parameters

We have already talked about how to use dynamic parameters in URLs by using the `useParams` hook. This is the best way to handle passing information like ids.

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

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

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### State/Location Data

The final type of data you can store is state and location data. This information is all accessible via the `useLocation` hook. Using this hook is very simple as it returns one value and takes no parameters.

```js
import { useSearchParams, Link } from "react-router-dom";

const location = useLocation();

console.log(location);
/*
URL -> `http://localhost/books?n=32#id`
{
  pathname: "/books",
  search: "?n=32",
  hash: "#id",
  key: "2JH3G3S",
  state: { name: "Kyle" }
}
*/

return(
  <Link to="/books" state={{ name: "Kyle" }}>
)
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## React Router v6.4+

New way of fetching data right inside React Router (v6.4+) that is worth exploring ("**render-as-you-fetch**" instead of "**fetch-on-render**"). Not really state **management**, as it doesn't persist state.

### createBrowserRouter

```js
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:orderId", element: <Order /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### loader

Each route can define a "loader" function to provide data to the route element before it renders.

```js
import Menu, { menuLoader } from "./features/menu/Menu";
// ...
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      // ...
    ],
  },
]);
// ...
```

```js
// Menu.jsx
import { getMenu } from "../../services/apiRestaurant";
// ...
export async function menuLoader() {
  return await getMenu();
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### useLoaderData

This hook provides the value returned from your route loader.

```js
// Menu.jsx
import { useLoaderData } from "react-router-dom";
// ...
export default function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### useNavigation

This hook tells you everything you need to know about a page navigation to build pending navigation indicators and optimistic UI on data mutations. Things like:

```js
import { useNavigation } from "react-router-dom";

function SomeComponent() {
  const navigation = useNavigation();
  navigation.state; //
  navigation.location;
  navigation.formData;
  navigation.json;
  navigation.text;
  navigation.formAction;
  navigation.formMethod;
}
```

#### navigation.state

- **idle** - There is no navigation pending.
- **submitting** - A route action is being called due to a form submission using POST, PUT, PATCH, or DELETE
- **loading** - The loaders for the next routes are being called to render the next page

```js
import { Outlet, useNavigation } from "react-router-dom";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return <main>{isLoading ? <Loader /> : <Outlet />}</main>;
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### errorElement

When exceptions are thrown in loaders, actions, or component rendering, instead of the normal render path for your Routes `(<Route element>)`, the error path will be rendered `(<Route errorElement>)` and the error made available with `useRouteError`.

```js
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // When a route does not have an `errorElement`, errors will bubble up through parent routes.
    errorElement: <Error />,
    children: [
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      // ...
    ],
  },
]);
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### useRouteError

Inside of an `errorElement`, this hook returns anything thrown during an action, loader, or rendering.

```js
import { useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Form

The Form component is a wrapper around a plain HTML form that emulates the browser for client side routing and data mutations.

```js
// CreateOrder.jsx
export default function CreateOrder() {
  const cart = fakeCart;

  return (
    <Form method="POST">
      <div>
        <label>First Name</label>
        <input type="text" name="customer" required />
      </div>

      <div>
        <label>Phone number</label>
        <div>
          <input type="tel" name="phone" required />
        </div>
      </div>

      <div>
        <label>Address</label>
        <div>
          <input type="text" name="address" required />
        </div>
      </div>

      <div>
        <input type="checkbox" name="priority" id="priority" />
        <label htmlFor="priority">Want to yo give your order priority?</label>
      </div>

      <div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <button>Order now</button>
      </div>
    </Form>
  );
}
```

> **NOTE: Make sure your inputs have names or else the FormData will not include that field's value.**

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### action

The url to which the form will be submitted, just like HTML form action. The only difference is the default action. With HTML forms, it defaults to the full URL. With `<Form>`, it defaults to the relative URL of the closest route in context.

```js
{
  path: "/order/new",
  element: <CreateOrder />,
  action: createOrderAction,
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### request

This is a Fetch Request instance being sent to your route. The most common use case is to parse the FormData from the request

```js
// CreateOrder.jsx
export async function createOrderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### useActionData

This hook provides the returned value from the previous navigation's action result, or undefined if there was no submission.

The most common use-case for this hook is form validation errors. If the form isn't right, you can return the errors and let the user try again:

```js
import { useActionData } from "react-router-dom";

export default function CreateOrder() {
  const formErrors = useActionData();

  return(
    // ...
    <div>
      <label>Phone number</label>
      <div>
        <input type="tel" name="phone" required />
      </div>
      {formErrors?.phone && <p>{formErrors.phone}</p>}
    </div>
    // ...
  )
}

export async function createOrderAction({
// ...
const errors = {};

if (!isValidPhone(order.phone)) {
  errors.phone =
    "Please give us your correct phone number. We might need it contact you.";
}

if (Object.keys(errors).length > 0) {
  return errors;
}
// ...
})
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### params

Route params are parsed from dynamic segments and passed to your action. This is useful for figuring out which resource to mutate:

```js
{
  path: "/order/:orderId",
  element: <Order />,
  loader: orderLoader,
  errorElement: <Error />,
}
```

```js
export async function orderLoader({ params }) {
  return await getOrder(params.orderId);
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>
