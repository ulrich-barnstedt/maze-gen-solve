const convert = require("./convert");

//generate a random number
const random = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

//check if a coordinate is inside bounds and available
const available = (y, x, h, w, map) => {
    return y >= 0 && y < h && x >= 0 && w > x && map[y][x] === -1;
}

//find out if any direction is open
const openSpots = (y, x, h, w, map) => {
    let open = [];

    if (available(y + 1, x, h, w, map)) open.push([y + 1, x]);
    if (available(y, x + 1, h, w, map)) open.push([y, x + 1]);
    if (available(y - 1, x, h, w, map)) open.push([y - 1, x]);
    if (available(y, x - 1, h, w, map)) open.push([y, x - 1]);

    return open;
}

module.exports = async (height, width, loopFn, startMiddle) => {
    //init
    let stack = [];
    let map = [];

    //fill map (array.fill clones references, therefore manual fill)
    for (let i = 0; i < height; i++) {
        map[i] = [];
        for (let j = 0; j < width; j++) map[i][j] = -1;
    }

    //set starting point
    if (startMiddle) {
        stack.push([Math.floor(height / 2), Math.floor(width / 2)]);
    } else {
        stack.push([0, 0]);
    }

    //run generation loop
    while (stack.length > 0) {
        //calculate available directions
        let available = openSpots(stack[stack.length - 1][0], stack[stack.length - 1][1], height, width, map);

        //go back if none available
        if (available.length === 0) {
            stack.pop();
            continue;
        }

        //pick a side to go to
        let side = random(available.length);
        stack.push(available[side]);

        //set value in map
        map[available[side][0]][available[side][1]] = stack.length;

        //run hook if present
        if (typeof loopFn === "function") {
            await loopFn(convert(map));
        }
    }

    return map;
}

