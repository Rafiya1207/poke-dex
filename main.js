import { Eta } from "eta";
import { createApp } from "./src/app.js";

const main = () => {
  const eta = new Eta({ views: "./public/templates" });
  const renderPokemons = (data) => eta.render("./pokemon.html", data);
  const data = Deno.readTextFileSync("./data/pokemons.json");
  const pokemons = JSON.parse(data);
  const app = createApp(pokemons, renderPokemons);

  Deno.serve({ port: 8002 }, app.fetch);
};
main();
