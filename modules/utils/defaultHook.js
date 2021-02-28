const {cursor, sleep} = require("0x81-utils");
const maze = require("../mazeGen")

module.exports = async (map) => {
    cursor.move(0, 0);
    process.stdout.write(maze.stringify(map));

    await sleep.async(1);
}