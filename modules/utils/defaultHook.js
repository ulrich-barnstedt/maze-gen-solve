const {cursor, sleep} = require("0x81-utils");
const maze = require("../mazeGen")

module.exports = async (map) => {
    cursor.move(0, 0);
    process.stdout.write(maze.stringify(map));

    //Remove comment for slow speed
    //await sleep.async(1);
}