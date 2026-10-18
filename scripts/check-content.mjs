import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const errors = [];
const pending = [];
async function readConfig(name) {
  const source = await readFile(
    path.join(root, "content", `${name}.ts`),
    "utf8",
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}
const [
  { profile },
  { projects },
  { experience },
  { socials },
  { technologies },
] = await Promise.all(
  ["profile", "projects", "experience", "socials", "technologies"].map(
    readConfig,
  ),
);
function link(value, label) {
  if (!value) return;
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      throw new Error();
    if (strict && url.protocol !== "https:")
      pending.push(`${label}: use HTTPS for publication`);
  } catch {
    errors.push(`${label}: invalid public URL`);
  }
}
async function asset(src, label) {
  if (!src || !src.startsWith("/") || src.startsWith("//")) {
    errors.push(`${label}: use a local /public asset`);
    return;
  }
  const location = path.resolve(root, "public", src.slice(1));
  if (!location.startsWith(path.join(root, "public") + path.sep)) {
    errors.push(`${label}: asset outside public`);
    return;
  }
  try {
    await access(location);
  } catch {
    errors.push(`${label}: file not found (${src})`);
  }
}
function unique(items, label) {
  const ids = new Set();
  for (const item of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id))
      errors.push(`${label}: invalid ID ${item.id}`);
    if (ids.has(item.id)) errors.push(`${label}: duplicate ID ${item.id}`);
    ids.add(item.id);
  }
}
link(profile.siteUrl, "profile.siteUrl");
unique(projects, "projects");
unique(experience, "experience");
unique(technologies, "technologies");
const technologyIds = new Set(technologies.map((technology) => technology.id));
for (const technology of technologies) {
  if (!technology.label.trim())
    errors.push(`${technology.id}: keyword needs a label`);
  if (
    !projects.some((project) => project.technologyIds?.includes(technology.id))
  )
    errors.push(`${technology.id}: bubble has no associated project`);
}
if (!profile.siteUrl)
  pending.push("profile.siteUrl: add the real public origin");
if (profile.isPlaceholder)
  pending.push(
    "profile: add a public name/nickname and set isPlaceholder=false",
  );
if (!profile.name.trim() && !profile.isPlaceholder)
  errors.push(
    "profile.name: a verified public name is required before clearing draft mode",
  );
if (!profile.seo.allowIndexing)
  pending.push(
    "profile.seo.allowIndexing: enable only after replacing draft content",
  );
if (projects.length < 3 || projects.length > 6)
  pending.push("projects: the intended layout uses 3–6 selected projects");
for (const project of projects) {
  if (!project.technologyIds?.length)
    errors.push(`${project.id}: add at least one keyword association`);
  for (const id of project.technologyIds || [])
    if (!technologyIds.has(id))
      errors.push(`${project.id}: unknown keyword ${id}`);
  if (new Set(project.technologyIds).size !== project.technologyIds?.length)
    errors.push(`${project.id}: duplicate keyword association`);
  if (project.isPlaceholder)
    pending.push(`${project.id}: replace placeholder project`);
  if (!project.cover.alt?.trim())
    errors.push(`${project.id}: cover needs descriptive alt text`);
  await asset(project.cover.src, `${project.id}.cover`);
  for (const image of project.screenshots || []) {
    await asset(image.src, `${project.id}.screenshot`);
    if (!image.alt?.trim())
      errors.push(`${project.id}: screenshot needs alt text`);
  }
  link(project.github, `${project.id}.github`);
  link(project.demo, `${project.id}.demo`);
  if (!project.stack.length)
    pending.push(`${project.id}: add verified technologies`);
  if (project.highlights.length < 2 || project.highlights.length > 3)
    pending.push(`${project.id}: add 2–3 verified highlights`);
}
for (const item of experience) {
  if (item.isPlaceholder)
    pending.push(`${item.id}: replace or remove placeholder experience`);
  for (const related of item.links || []) link(related.href, `${item.id}.link`);
}
for (const social of socials.links)
  link(social.href, `socials.${social.label}`);
if (
  socials.email &&
  (!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(socials.email) ||
    /[\r\n?&#]/.test(socials.email))
)
  errors.push("socials.email: invalid public email");
if (socials.resume?.startsWith("/"))
  await asset(socials.resume, "socials.resume");
else link(socials.resume, "socials.resume");
if (!socials.email && !socials.links.length)
  pending.push("socials: configure at least one real contact method");
if (profile.skillGroups.some((group) => !group.items.length))
  pending.push("profile.skillGroups: add actual skills or remove empty groups");
if (/TODO/.test(JSON.stringify({ profile, projects, experience })))
  pending.push("content: TODO strings remain");
if (errors.length)
  console.error(errors.map((message) => `ERROR: ${message}`).join("\n"));
if (strict && pending.length)
  console.error(pending.map((message) => `TODO: ${message}`).join("\n"));
else if (pending.length)
  console.log(
    `Content structure, keyword associations and assets checked. ${pending.length} publication items remain (draft mode). Run npm run check:publish for details.`,
  );
else console.log("Content and publication checks passed.");
process.exitCode = errors.length || (strict && pending.length) ? 1 : 0;
