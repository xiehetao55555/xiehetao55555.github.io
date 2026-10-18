import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Optional static hosting target; the normal build keeps standalone / Docker.
const next = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const build = spawnSync(process.execPath, [next, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    PORTFOLIO_STATIC_EXPORT: "1",
    NEXT_TELEMETRY_DISABLED: "1",
  },
});
if (build.error) throw build.error;
process.exitCode = build.status ?? 1;
