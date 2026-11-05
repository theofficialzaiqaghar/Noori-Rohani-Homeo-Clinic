import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import { transform, bundleAsync } from "lightningcss";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const cssFiles = [
  "assets/css/base.css",
  "assets/css/components.css",
  "assets/css/home.css",
  "assets/css/footer.css",
];

async function build() {
  if (existsSync(dist)) {
    rmSync(dist, { recursive: true, force: true });
  }
  mkdirSync(dist, { recursive: true });

  cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true });
  cpSync(join(root, "robots.txt"), join(dist, "robots.txt"));
  cpSync(join(root, "sitemap.xml"), join(dist, "sitemap.xml"));
  cpSync(join(root, "404.html"), join(dist, "404.html"));
  cpSync(join(root, "site.webmanifest"), join(dist, "site.webmanifest"));
  if (existsSync(join(root, ".htaccess"))) {
    cpSync(join(root, ".htaccess"), join(dist, ".htaccess"));
  }

  const criticalMin = (
    await bundleAsync({
      filename: join(root, "assets/css/critical.css"),
      code: readFileSync(join(root, "assets/css/critical.css")),
      minify: true,
      targets: { browsers: "defaults" },
    })
  ).code.toString();

  const combinedCss = cssFiles
    .map((file) => readFileSync(join(root, file), "utf8"))
    .join("\n");

  const appCss = transform({
    filename: "app.css",
    code: Buffer.from(combinedCss),
    minify: true,
    targets: { browsers: "defaults" },
  }).code;

  mkdirSync(join(dist, "assets/css"), { recursive: true });
  writeFileSync(join(dist, "assets/css/app.min.css"), appCss);

  await esbuild.build({
    entryPoints: [join(root, "assets/js/main.js")],
    bundle: true,
    minify: true,
    format: "esm",
    outfile: join(dist, "assets/js/app.min.js"),
    target: ["es2020"],
  });

  let html = readFileSync(join(root, "index.html"), "utf8");

  html = html.replace(
    /<link rel="stylesheet" href="assets\/css\/critical.css"\s*\/>/,
    `<style>${criticalMin}</style>`
  );

  html = html.replace(
    /<!-- ASYNC_CSS -->[\s\S]*?<!-- \/ASYNC_CSS -->/,
    `<link rel="stylesheet" href="assets/css/app.min.css" />`
  );

  html = html.replace(
    /<script type="module" src="assets\/js\/main\.js" defer><\/script>/,
    `<script type="module" src="assets/js/app.min.js" defer></script>`
  );

  writeFileSync(join(dist, "index.html"), html);
  console.log("Build complete → dist/");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
