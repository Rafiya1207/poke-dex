import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { createApp } from "../src/app.js";

describe("POKEDEX", () => {
  it("should serve GET /index", async() => {
    const app = createApp([], () => {});
    const res = await app.request("/index");

    assertEquals(res.status, 200);
  });
  it("should serve valid type", async() => {
    const app = createApp([], () => {});
    const res = await app.request("/electric");

    assertEquals(res.status, 200);
  });
  it("should not serve invalid type", async() => {
    const app = createApp([], () => {});
    const res = await app.request("/default");

    assertEquals(res.status, 404);
  });
  it("should serve searched pokemon", async() => {
    const app = createApp([], () => {});
    const res = await app.request("/electric?pokemon=pikachu");

    assertEquals(res.status, 200);
  });
});
