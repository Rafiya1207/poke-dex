import { capitalize } from "./utils.js";

const links = [
  "all",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

const filterPokemonsByType = (pokemons, type) =>
  pokemons.filter(({ types }) => types.includes(type));

const filterPokemonsByName = (pokemons, pokemon) =>
  pokemons.filter(({ name }) => name.startsWith(pokemon));

export const servePokemons = async (c) => {

  const { name } = await c.req.param();
  const searchPokemon = c.req.query("pokemon");

  const activePokemon = name === undefined ? "all" : name;

  if (!links.includes(activePokemon)) {
    return c.json({ error: "not found" }, 404);
  }

  const pokemons = c.get("pokemons");
  const renderPokemons = c.get("renderPokemons");

  const data = activePokemon === "all"
    ? pokemons
    : filterPokemonsByType(pokemons, activePokemon);

  const foundPokemons = searchPokemon !== undefined
    ? filterPokemonsByName(data, searchPokemon)
    : data;

  return c.json(foundPokemons, 200);
};
