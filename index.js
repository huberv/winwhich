#!/usr/bin/env node
// https://docs.npmjs.com/files/package.json
// Please make sure that your file(s) referenced in bin starts with #!/usr/bin/env node, otherwise the scripts are started without the node executable!

const pathEntrySeparator = ";";
const programSuffixes = [".exe", ".bat", ".cmd"];

const fs = require("fs");
const debug = require("debug")("winwhich");
const error = console.error;
const log = console.log;

debug("Starting winwhich");

if (process.argv.length <= 2) {
  error("Missing argument: program name");
  process.exit(1);
}

if (process.argv.length > 3) {
  error("Too many arguments: just one program name expected");
  process.exit(1);
}

debug("Looking for program", process.argv[2]);

const path = process.env.PATH;
debug("The current path is %s", path);
const pathEntries = path.split(pathEntrySeparator);

const executables = programSuffixes.map(suffix =>
  (process.argv[2] + suffix).toUpperCase()
);

let result = [];

pathEntries.map(path => {
  try {
    const files = fs.readdirSync(path).map(s => s.toUpperCase());
    debug("The path %s contains the following files:", path);
    debug(files);
    const isInPathEntry = executables
      .map(exe => files.includes(exe))
      .reduce((prev, current) => prev || current);
    if (isInPathEntry) {
      result.push(path);
    }
  } catch (e) {
    debug(e);
  }
});

let printed = [];
result.forEach(path => {
  if (!printed.includes(path)) {
    log(path);
    printed.push(path);
  } else {
    debug("Duplicate path entry: %s", path);
  }
});
