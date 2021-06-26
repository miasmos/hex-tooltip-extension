const path = require("path");
const fs = require("fs");
const pkg = require("../package.json");
const manifest = require("../manifest.json");

manifest.name = pkg.fullName;
manifest.description = pkg.description;
manifest.version = pkg.version;

fs.writeFileSync(
    path.resolve(__dirname, "../dist/manifest.json"),
    JSON.stringify(manifest, undefined, 4)
);
