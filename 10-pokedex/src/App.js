import { useState } from "react";

import PokemonDetails from "./components/PokemonDetails";
import PokemonList from "./components/PokemonList";

export default function App() {
  const [currentPokemon, setCurrentPokemon] = useState("");

  return (
    <>
      <header>
        <h1>My Pokedex</h1>
      </header>

      <main>
        {!currentPokemon ? (
          <PokemonList setCurrentPokemon={setCurrentPokemon} />
        ) : (
          <>
            <button onClick={() => setCurrentPokemon("")}>
              &#129044; back
            </button>
            <PokemonDetails pokemonName={currentPokemon} />
          </>
        )}
      </main>
    </>
  );
}
