const {cursor} = require("0x81-utils");
const defaultHook = require("./modules/utils").defaultHook;
const maze = require("./modules/mazeGen");
const solve = require("./modules/mazeSolve");

cursor.clear();

(async () => {
    let generatedMaze = await maze.newMaze(12, 25, false, defaultHook);
    let postSolve = await solve.qAlg(generatedMaze, defaultHook);
})();