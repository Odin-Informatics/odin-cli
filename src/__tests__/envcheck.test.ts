import { test } from "node:test";
import * as assert from "node:assert/strict";
import { compareEnv, parseEnvKeys } from "../commands/envcheck";
import { majorVersion } from "../utils/system";

test("parseEnvKeys: comments, export, quotes and empty values", () => {
  const keys = parseEnvKeys(['# not', "export A=1", "B=", 'C=""', "D='x'", "E=  # yalnız yorum", "bozuk satır", "F = 2"].join("\n"));
  assert.deepEqual([...keys.entries()], [
    ["A", true],
    ["B", false],
    ["C", false],
    ["D", true],
    ["E", false],
    ["F", true],
  ]);
});

test("compareEnv: missing, empty and extra keys", () => {
  const r = compareEnv("A=1\nB=\nZ=9\n", "A=\nB=\nC=\n");
  assert.deepEqual(r, { missing: ["C"], empty: ["B"], extra: ["Z"] });
});

test("compareEnv never exposes values", () => {
  const r = compareEnv("SECRET=supersecret\n", "SECRET=\nOTHER=\n");
  assert.equal(JSON.stringify(r).includes("supersecret"), false);
});

test("majorVersion", () => {
  assert.equal(majorVersion("v20.11.1"), 20);
  assert.equal(majorVersion("22.3.0"), 22);
  assert.equal(majorVersion("abc"), 0);
});
