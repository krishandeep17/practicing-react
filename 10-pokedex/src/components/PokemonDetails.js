import { useGetPokemonByNameQuery } from "../services/pokemonApiSlice";

export default function PokemonDetails({ pokemonName }) {
  // Using a query hook automatically fetches data and returns query values
  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonByNameQuery(pokemonName);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <article key={pokemon.id}>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <ul>
        <li>id&#58; {pokemon.id}</li>
        <li>height&#58; {pokemon.height / 10}m</li>
        <li>weight&#58; {pokemon.weight / 10}kg</li>
        <li>
          types&#58; {pokemon?.types?.map((el) => el?.type?.name).join(", ")}
        </li>
      </ul>
    </article>
  );
}
