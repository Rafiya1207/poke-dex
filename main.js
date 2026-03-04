import { createApp } from "./src/app.js";

const main = () => {
  const data = Deno.readTextFileSync("./data/pokemons.json");
  const pokemons = JSON.parse(data);
  const app = createApp(pokemons);

  Deno.serve({ port: 8002 }, app.fetch);
};
main();
