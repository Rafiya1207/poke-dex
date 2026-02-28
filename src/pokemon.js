import { capitalize } from "./utils.js";

export const servePokemons = (c) => {
  const pokemons = c.get("pokemons");
  const renderPokemons = c.get("renderPokemons");

  return c.html(renderPokemons({ pokemons: pokemons, capitalize }));
};
