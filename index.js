const fs = require("fs");
const { sum } = require("./common");
fs.writeFileSync("./log.txt", "this data is from node script");

console.log();