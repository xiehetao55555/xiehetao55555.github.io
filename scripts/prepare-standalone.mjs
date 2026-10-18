import { access, cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, ".next", "standalone");
await access(path.join(target, "server.js"));
await mkdir(path.join(target, ".next"), { recursive: true });
await cp(path.join(root, "public"), path.join(target, "public"), {
  recursive: true,
});
await cp(
  path.join(root, ".next", "static"),
  path.join(target, ".next", "static"),
  { recursive: true },
);
console.log(
  "Standalone assets prepared. Start with node .next/standalone/server.js",
);
