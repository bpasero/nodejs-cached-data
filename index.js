const vm = require("vm");
const fs = require("fs");

const CACHE_FILE = 'cache.code';

let options;
if (fs.existsSync(CACHE_FILE)) {
    options = { cachedData: fs.readFileSync(CACHE_FILE) };
} else {
    options = { produceCachedData: true, displayErrors: true };
}

const now = Date.now();
const script = new vm.Script(fs.readFileSync('typescript.js').toString('utf8'), options);
console.log("Loading script took: " + (Date.now() - now) + "ms");

if (script.cachedDataProduced) {
    fs.writeFileSync(CACHE_FILE, script.cachedData);
    console.log("Did produce cached data");
} else {
    if (script.cachedDataRejected) {
        console.log("Did not produce cached data. IT WAS REJECTED!");
    } else {
        console.log("Did not produce cached data. Loaded from cache!");
    }
}

