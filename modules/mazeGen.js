const directionTable = require("./gen/directionTable");
const convert = require("./gen/convert");
const stringConvert = require("./gen/toString");

module.exports = {
    newMaze : async (height, width, startAtMiddle, hookFn) => {
        return convert(await directionTable(height, width, hookFn, startAtMiddle));
    },
    stringify : (maze) => {
        return stringConvert(maze);
    }
}