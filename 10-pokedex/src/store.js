import { configureStore } from "@reduxjs/toolkit";

import pokemonApiSlice from "./services/pokemonApiSlice";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApiSlice.middleware),
});

export default store;
