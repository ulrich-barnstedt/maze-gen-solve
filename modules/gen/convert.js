const SquareRender = require("./SqaureRender");

module.exports = (maze) => {
    let converted = [];

    //loop through all rows
    for (let row = 0; row < maze.length; row++) {
        let thisRow = maze[row];
        converted[row] = [];

        //loop through row elements
        for (let element = 0; element < thisRow.length; element++) {
            let thisElement = thisRow[element];

            //if this square isn't generated yet, show blank
            if (thisElement === -1) {
                converted[row][element] = new SquareRender(true);
                continue;
            }

            //show correct openings
            converted[row][element] = new SquareRender(
                false,
                maze[row - 1] !== undefined && Math.abs(thisElement - maze[row - 1][element]) <= 1,
                maze[row][element + 1] !== undefined && Math.abs(thisElement - maze[row][element + 1]) <= 1,
                maze[row + 1] !== undefined && Math.abs(thisElement - maze[row + 1][element]) <= 1,
                maze[row][element - 1] !== undefined && Math.abs(thisElement - maze[row][element - 1]) <= 1,
            );
        }
    }

    return converted;
};