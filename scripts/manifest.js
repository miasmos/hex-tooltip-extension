const path = require("path");
const fs = require("fs");
const pkg = require("../package.json");
const manifest = require("../manifest.json");

manifest.name = pkg.fullName;
manifest.description = pkg.description;
manifest.version = pkg.version;

const dest = path.resolve(__dirname, "../dist");
fs.stat(dest, (error, stat) => {
    if (!stat) {
        fs.mkdirSync(dest);
    }
    fs.writeFileSync(path.resolve(dest, "./manifest.json"), JSON.stringify(manifest, undefined, 4));
});
