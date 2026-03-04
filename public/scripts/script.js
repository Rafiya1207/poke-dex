import { createPokedex } from "./utils.js";

const fetchPokemons = () =>
  [{
    "id": 1,
    "name": "bulbasaur",
    "types": ["grass", "poison"],
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    stats: {
      "weight": 69,
      "baseXP": 64,
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "speed": 45
    }
  }]


window.onload = async () => {
  const pokemons = await fetchPokemons();
  createPokedex(pokemons)
}