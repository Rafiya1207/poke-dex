import { Hono } from "hono";
import { logger } from "hono/logger";
import { servePokemons } from "./pokemon.js";
import { serveStatic } from "hono/deno";

export const createApp = (pokemons) => {
  const app = new Hono();

  app.use(logger());
  app.use(async (c, next) => {
    c.set("pokemons", pokemons);
    await next();
  });

  app.on('GET', ["/pokemons", "/pokemons/:type"], servePokemons);
  app.get("*", serveStatic({ root: "./public" }));
  return app;
};
