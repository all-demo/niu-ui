const fs = require("fs-extra");
const path = require("path");
const rimraf = require("rimraf");
const buildComponents = require("./components");
const { spawnSync } = require("child_process");

/**
 * 功能:删除以往的构建
 */
const delPreBuild = async () => {
  const esdir = path.resolve(__dirname, "../es");
  const liddir = path.resolve(__dirname, "../lib");
  (await fs.existsSync(esdir)) && (await rimraf.sync(esdir));
  (await fs.existsSync(liddir)) && (await rimraf.sync(liddir));
};

const runMain = async () => {
  await delPreBuild();
  await buildComponents();
  await spawnSync("cd", [".."]);
  await spawnSync("npx", [
    "babel",
    "src/index.js",
    "--out-file",
    "es/index.js",
  ]);
  await spawnSync("npx", [
    "babel",
    "--plugins",
    "@babel/plugin-transform-modules-commonjs",
    "src/index.js",
    "--out-file",
    "lib/index.js",
  ]);
};

runMain();
