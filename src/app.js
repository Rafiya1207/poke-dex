import { Hono } from "hono";
import { logger } from "hono/logger";
import { servePokemons } from "./pokemon.js";
import { serveStatic } from "hono/deno";

export const createApp = (pokemons, renderPokemons) => {
  const app = new Hono();

  app.use(logger());
  app.use(async (c, next) => {
    c.set("pokemons", pokemons);
    c.set("renderPokemons", renderPokemons);
    c.set("activePage", "all");
    await next();
  });

  app.get("/index.html", servePokemons);
  app.get("*", serveStatic({ root: "./public" }));
  return app;
};
