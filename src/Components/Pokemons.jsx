import React, { useEffect, useState } from 'react';
import '../App.css'
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al cargar los datos de ${url}`);
  }
  return response.json();
}

function PokemonInfo({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h2 className="pokemon-card__name">Nombre: {pokemon.name}</h2>
      <p className="pokemon-card__level">Nivel: {pokemon.nivel}</p>
      <p className="pokemon-card__abilities">Habilidades: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    </div>
  );
}

function ObtenerPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const numeroDePokemons = 9; // Cantidad de pokemons que se desean cargar

  useEffect(() => {
    async function fetchPokemonData(numeroDePokemons) {
      try {
        const pokemonUrls = Array.from({ length: numeroDePokemons }, (_, index) =>
          `https://pokeapi.co/api/v2/pokemon/${index + 1}`
        );

        const pokemonData = await Promise.all(
          pokemonUrls.map(async (url, index) => {
            const response = await fetchData(url);
            response.nivel = index + 1;
            return response;
          })
        );

        setPokemons(pokemonData);
      } catch (error) {
        console.error('Error al obtener los datos de Pokémon:', error);
      }
    }

    fetchPokemonData(numeroDePokemons);
  }, [numeroDePokemons]);

  return (
    <div className="app" style={{ height: '100vh' }}>
        <div className="lista-pokemon">
          {pokemons.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <PokemonInfo pokemon={pokemon} />
            </div>
          ))}
        </div>
      </div>
  );
}

export default ObtenerPokemons;
