# React Query (TanStack Query) CheatSheet

## Table of Contents

- [Why React Query](#why-react-query)
- [Installation](#installation)
- [Setup](#setup)
- [useQuery](#usequery)
- [useMutation](#usemutation)
  - [Mutation Side Effects](#mutation-side-effects)
  - [Query Invalidation](#query-invalidation)

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Why React Query ?

- Powerful library for managing **remote(server) state**
- Many features that allow us to write a **lot less code**, while also **making the UX a lot better:**
  - Data is stored in **cache**
  - Automatic **loading** and **error** states
  - Automatic **re-fetching** to keep state synced
  - Pre-fetching
  - Easy remote state mutation(updating)
  - Offline Support
- Needed because remote state is **fundamentally** different from regular(UI) state

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Installation

```
npm i @tanstack/react-query
```

```
npm i @tanstack/react-query-devtools
```

```
npm i -D @tanstack/eslint-plugin-query
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## Setup

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## useQuery

A query can be used with any Promise based method (including GET and POST methods) to fetch data from a server. To subscribe to a query in your components or custom hooks, call the `useQuery` hook with at least:

- A **unique key for the query**
- A **function that returns a promise** that:
  - Resolves the data, or
  - Throws an error

```js
const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
```

The `result` object contains a few very important states you'll need to be aware of to be productive. A query can only be in one of the following states at any given moment:

- `isPending` or `status === 'loading'` - The query has no data yet
- `isError` or `status === 'error'` - The query encountered an error
- `isSuccess` or `status === 'success'` - The query was successful and data is available

Beyond those primary states, more information is available depending on the state of the query:

- `error` - If the query is in an `isError` state, the error is available via the `error` property.
- `data` - If the query is in an `isSuccess` state, the data is available via the `data` property.
- `isFetching` - In any state, if the query is fetching at any time (including background refetching) `isFetching` will be `true`.

For most queries, it's usually sufficient to check for the `isPending` state, then the `isError` state, then finally, assume that the `data` is available and render the successful state:

```js
import { useQuery } from "@tanstack/react-query";

export default function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"], // unique key for the query
    queryFn: fetchTodoList, // function that returns a promise
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

## useMutation

Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a `useMutation` hook.

```js
const mutation = useMutation({
  mutationFn: (newTodo) => axios.post("/todos", newTodo),
});
```

A mutation can only be in one of the following states at any given moment:

- `isIdle` or `status === 'idle'` - The mutation is currently idle or in a fresh/reset state
- `isPending` or `status === 'loading'` - The mutation is currently running
- `isError` or `status === 'error'` - The mutation encountered an error
- `isSuccess` or `status === 'success'` - The mutation was successful and mutation data is available

Beyond those primary states, more information is available depending on the state of the mutation:

- `error` - If the mutation is in an `error` state, the error is available via the `error` property.
- `data` - If the mutation is in a `success` state, the data is available via the `data` property.
- `mutate` - You can pass variables to your mutations function by calling the `mutate` function with a **single variable or object**.

```js
import { useMutation } from "@tanstack/react-query";

export default function AddTodo() {
  const mutation = useMutation({
    mutationFn: (newTodo) => axios.post("/todos", newTodo);
  });

  return (
    <div>
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Mutation Side Effects

useMutation comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle. These come in handy for both [invalidating and refetching queries after mutations](#query-invalidation) and even optimistic updates

```js
useMutation({
  mutationFn: addTodo,
  onMutate: (variables) => {
    // A mutation is about to happen!

    // Optionally return a context containing data to use when for example rolling back
    return { id: 1 };
  },
  onError: (error, variables, context) => {
    // An error happened!
    console.log(`rolling back optimistic update with id ${context.id}`);
  },
  onSuccess: (data, variables, context) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, context) => {
    // Error or success... doesn't matter!
  },
});
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>

### Query Invalidation

When a query is invalidated with `invalidateQueries`, two things happen:

- It is marked as stale. This stale state overrides any `staleTime` configurations being used in `useQuery` or related hooks
- If the query is currently being rendered via `useQuery` or related hooks, it will also be re-fetched in the background

```js
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    alert("Todo successfully updated");

    // Invalidate every query in the cache with a key that starts with `todos`
    queryClient.invalidateQueries({
      queryKey: ["todos"],
    });
  },
  onError: (err) => alert(err.message),
});
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back To Top</a></b>
</div>
