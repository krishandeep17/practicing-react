import { useGetPokemonsQuery } from "../services/pokemonApiSlice";

export default function PokemonList({ setCurrentPokemon }) {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonsQuery();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <article>
      <h2>Overview</h2>

      <ol>
        {data.results.map((pokemon) => (
          <li key={pokemon.name}>
            <button onClick={() => setCurrentPokemon(pokemon.name)}>
              {pokemon.name}
            </button>
          </li>
        ))}
      </ol>
    </article>
  );
}
