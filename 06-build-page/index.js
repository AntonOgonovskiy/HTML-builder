const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;

async function build() {
  const templatePath = path.join(__dirname, "template.html");
  const componentsPath = path.join(__dirname, "components");
  const assets = path.join(__dirname, "assets");
  const destAssets = path.join(__dirname, "project-dist", "assets");
  const bundle = path.join(__dirname, "project-dist", "style.css");
  const styles = path.join(__dirname, "styles");
  let html = await fsPromises.readFile(templatePath);
  html = html.toString();
  const components = await fsPromises.readdir(componentsPath);
  for (let compFile of components) {
    const stats = await fsPromises.stat(
      path.join(__dirname, "components", compFile)
    );
    if (stats.isFile() && path.extname(compFile) === ".html") {
      const component = path.basename(compFile, path.extname(compFile));
      const content = await fsPromises.readFile(
        path.join(componentsPath, compFile)
      );
      html = html.replace(new RegExp(`{{${component}}}`), content.toString());
    }
  }

  await fsPromises.mkdir(path.join(__dirname, "project-dist"), {
    recursive: true,
  });
  await fsPromises.writeFile(
    path.join(__dirname, "project-dist", "index.html"),
    html
  );
  copyDir(assets, destAssets);
  css(styles, bundle);
}

async function copyDir(assets, destAssets) {
  await fsPromises.mkdir(destAssets, { recursive: true });
  let files = await fsPromises.readdir(destAssets);
  for (let file of files) {
    await fsPromises.rm(path.join(destAssets, file), { recursive: true });
  }
  const inner = await fsPromises.readdir(assets);
  for (let file of inner) {
    const stats = await fsPromises.stat(path.join(assets, file));
    if (stats.isFile()) {
      await fsPromises.copyFile(
        path.join(assets, file),
        path.join(destAssets, file)
      );
    } else {
      await copyDir(path.join(assets, file), path.join(destAssets, file));
    }
  }
}

async function css(styles, bundle) {
  const list = (await fsPromises.readdir(styles)).reverse();
  let bundleCss = "";
  for (let style of list) {
    let stats = path.extname(style);
    if (stats === ".css") {
      const inner = await fsPromises.readFile(path.join(styles, style));
      bundleCss += inner.toString();
    }
  }
  await fsPromises.writeFile(bundle, bundleCss);
}

build();
