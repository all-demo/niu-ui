const pkg = require("../package.json");
const path = require("path");
const fs = require("fs-extra");
const rollup = require("rollup");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const postcss = require("rollup-plugin-postcss");

const build = async (name) => {
  const inputOptions = {
    input: path.resolve(__dirname, `../src/${name}`),
    plugins: [
      nodeResolve({
        extensions: [".js", ".jsx"],
      }),
      commonjs(),
      babel({ exclude: "node_modules/**", include: "src/**" }),
      postcss(),
    ],
    external: Object.keys(pkg.dependencies).filter((name) => name !== "lodash"),
  };
  const bundle = await rollup.rollup(inputOptions);
  const outOptions =
  {
    formate: "es",
    dir: path.resolve(__dirname, `../es/${name}`),
  };
  
    await bundle.write(outOptions);

};

/**
 * 构建组件包
 */
const runBuild = async () => {
  const srcDirNames = await fs
    .readdirSync(path.resolve(__dirname, "../src"))
    .filter((name) => name !== "index.js");

  for (const name of srcDirNames) await build(name);
};

module.exports = runBuild;
