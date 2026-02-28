import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { createApp } from "../src/app.js";

describe("POKEDEX", () => {
  it("should serve GET /index.html", async() => {
    const app = createApp([], () => {});
    const res = await app.request("/index.html");

    assertEquals(res.status, 200);
  });
});
