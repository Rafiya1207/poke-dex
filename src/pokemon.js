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

export const servePokemons = (c) => {
  const pokemons = c.get("pokemons");
  const renderPokemons = c.get("renderPokemons");
  const activePage = c.get("activePage");

  return c.html(
    renderPokemons({ pokemons: pokemons, capitalize, links, activePage }),
  );
};
