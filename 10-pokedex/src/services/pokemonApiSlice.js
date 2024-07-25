// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const pokemonApiSlice = createApi({
  reducerPath: "pokemonApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: () => ({
        // these are specific to `fetchBaseQuery`
        url: "pokemon",
        params: { limit: 9 }, // pokemon?limit=9
        // all the different arguments that you could also pass into the `fetch` "init" option
        // see https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
        method: "GET", // GET is the default, this could be skipped
      }),
    }),
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`, // or return the url directly (shorthand)
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonsQuery, useGetPokemonByNameQuery } =
  pokemonApiSlice;

export default pokemonApiSlice;
