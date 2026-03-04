const getDetails = (data) => {
  const name = data.name;
  const id = data.id;
  const types = data.types.map(({ type }) => type.name);
  const weight = data.weight;
  const baseXP = data.base_experience;
  const image =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const stats = data.stats.reduce((res, { base_stat, stat }) => {
    if (["hp", "attack", "defense", "speed"].includes(stat.name)) {
      res[stat.name] = base_stat;
    }
    return res;
  }, {});

  return { id, name, types, image, stats: { weight, baseXP, ...stats } };
};

const encode = (data) => new TextEncoder().encode(data);

const getPokemons = async () => {
  const pokemons = [];

  const fs = await Deno.open("./data/pokemons.json", { append: true });

  let i = 0;
  while ((i++ <= 1025)) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${i}`,
    );
    if (response.ok) {
      const data = await response.json();
      const pokemon = getDetails(data);

      pokemons.push(pokemon);
    }
  }

  await fs.writable.getWriter().write(encode(JSON.stringify(pokemons)));
};