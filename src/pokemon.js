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

export const servePokemons = async (c) => {
  const { name } = await c.req.param();
  const activePokemon = name === "index" ? "all" : name;

  if (!links.includes(activePokemon)) {
    return c.json({ error: "not found" }, 404);
  }

  const pokemons = c.get("pokemons");
  const renderPokemons = c.get("renderPokemons");

  const data = activePokemon === "all"
    ? pokemons
    : filterPokemonsByType(pokemons, activePokemon);

  return c.html(
    renderPokemons({ pokemons: data, capitalize, links, activePokemon }),
  );
};
