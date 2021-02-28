module.exports = async (maze, hookFn) => {
    let explorationStack = [[0, 0]];

    while (explorationStack.length > 0) {
        //TODO: implement

        if (typeof hookFn === "function") {
            await hookFn(maze);
        }
    }

    return maze;
}