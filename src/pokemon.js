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

const applyFilters = (pokemons, { type, name }) =>
  pokemons.filter(pokemon =>
    pokemon.types.includes(type) && pokemon.name.startsWith(name.toLowerCase())
  )

export const servePokemons = async (c) => {
  const { type } = await c.req.param();
  const name = c.req.query("pokemon") || '';
  const activePokemon = type === undefined ? "all" : type;

  if (!links.includes(activePokemon)) {
    return c.json({ error: "not found" }, 404);
  }

  const pokemons = c.get("pokemons");

  const data = activePokemon === "all"
    ? pokemons
    : applyFilters(pokemons, { type, name });

  return c.json(data, 200);
};
