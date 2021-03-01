const config = require("./renderConfig.js");

//class the represents one 3*3 square in the maze
class SquareRender {
    constructor (override, up, right, down, left) {
        this.open = {
            up : override ? false : up,
            right : override ? false : right,
            down : override ? false : down,
            left : override ? false : left
        }

        this.bg = {
            up : 0,
            right : 0,
            down : 0,
            left : 0,
            center : 0
        }

        this.isGoal = false;
        this.wall = !(this.open.up || this.open.right || this.open.down || this.open.left);
        this.visited = false;
    }

    charProcess (name) {
        if (!this.open[name]) return config.char;

        switch (this.bg[name]) {
            case 0:
                return config.empty;
            case 1:
                return config.colored.at;
            case 2:
                return config.colored.passed;
        }
    }

    middleChar () {
        if (this.wall) return config.char;
        if (this.isGoal) return config.colored.goal;

        switch (this.bg.center) {
            case 0:
                return config.empty;
            case 1:
                return config.colored.atMiddle;
            case 2:
                return config.colored.passedMiddle;
        }
    }


    drawL1 () {
        return `${config.char}${this.charProcess("up")}${config.char}`;
    }

    drawL2 () {
        return `${this.charProcess("left")}${this.middleChar()}${this.charProcess("right")}`;
    }

    drawL3 () {
        let str = `${config.char}${this.charProcess("down")}${config.char}`
        this.seen();
        return str;
    }

    markGoal () {
        this.isGoal = true;
    }

    seen () {
        for (let key in this.bg) {
            if (this.bg[key] !== 1) continue;

            this.bg[key] += 1;
        }
    }

    visit (markArr) {
        this.bg.center = 1;
        this.visited = true;

        markArr.forEach(side => {
            switch (side) {
                case 0:
                    this.bg.up = 1;
                    break;
                case 1:
                    this.bg.right = 1;
                    break;
                case 2:
                    this.bg.down = 1;
                    break;
                case 3:
                    this.bg.left = 1;
                    break;
            }
        });

        return this;
    }

    unvisit () {
        this.visited = false;

        for (let key in this.bg) {
            this.bg[key] = 0;
        }

        return this;
    }
}

module.exports = SquareRender;