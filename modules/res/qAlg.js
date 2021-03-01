// Oliver Kovacs 2021

class Vector extends Array {
    constructor(...args) {
        super(...args);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    add(v) {
        return this.map((e, i) => e + v[i]);
    }

    equals(v) {
        return this.reduce((p, c, i) => p && c === v[i], true);
    }
}

class Path {
    constructor(n, prev = null) {
        this.n = n;
        this.prev = prev;
    }
}

class Direction {
    static NAME = [ "up", "right", "down", "left" ];
    static REVERSE = Array.from({ length: 4 }, (_, i) => (i + 2) % 4);
    static VECTOR = Array.from({ length: 4 }, (_, i) => 
        new Vector((i % 2) * -(2 * Math.floor(i / 2) - 1), !(i % 2) * (2 * Math.floor(i / 2) - 1)));
}

const solve = async (maze, out, stop, current, hook) => {

    for (let i = 1; true; i++) {

        let squares = current;
        current = [];
        for (let j = 0; j < squares.length; j++) {
            const square = squares[j];
            if (square.equals(stop)) return out;

            await Promise.all(Direction.NAME.map(async (direction_name, direction) => {

                if (!maze[square.y][square.x].open[direction_name]) return;

                let next = square.add(Direction.VECTOR[direction]);

                if (out[next.x][next.y] !== null) return;

                out[next.x][next.y] = new Path(i, Direction.REVERSE[direction]);
                maze[square.y][square.x].visit([]);
                await hook(maze);
                current.push(next);
            }));
        }
    }
};

const render = async (path, maze, square, hook, last = 0) => {
    while (true) {
        direction = path[square.x][square.y].prev;
        maze[square.y][square.x].visit([ direction, Direction.REVERSE[last] ]);
        last = direction;
        await hook(maze);

        if (!Direction.NAME[direction]) return;

        square = square.add(Direction.VECTOR[direction]);
    }
};

const clear = async (maze, hook) => {
    maze = maze.map(row => row.map(square => square.unvisit()));
    await hook(maze);
};

module.exports = async (maze, hook, start = [ 0, 0 ], goal = [ maze[0].length - 1, maze.length - 1 ]) => {

    start = new Vector(...start);
    goal = new Vector(...goal);
    let out = maze[0].map(_ => maze.map(_ => null));
    out[goal.x][goal.y] = new Path(0);

    let path = await solve(maze, out, start, [ goal ], hook);
    await clear(maze, hook);
    maze[goal.y][goal.x].markGoal();
    await render(path, maze, start, hook);
};