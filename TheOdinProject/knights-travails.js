export function knightsTravails(start, end) {
    return backtrack(end, constructPath(start, end));
}

function constructPath(start, end) {
    const moves = [
        [-1, 2],
        [1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
        [2, 1]
    ];
    
    const [x, y] = start;
    const [tX, tY] = end;

    if (x < 0 || x >= 8 || y >= 8 || y < 0 || tX < 0 || tY >= 8 || tX >= 8 || tY < 0) throw new Error("Invalid cells. A valid cell index ranges from 0-7 inclusive");

    const queue = [
        [x, y]
    ];
    
    const visited = {};
    const parents = {};
    visited[[x,y]] = true;
    parents[[x,y]] = null;

    if (x === tX && y === tY) return parents;

    while (queue.length !== 0) {
        const [x, y] = queue.shift();

        for (const move of moves) {
            const [x2, y2] = [x + move[0], y + move[1]];
            if (x2 < 0 || x2 >= 8 || y2 >= 8 || y2 < 0 || visited[[x2, y2]]) continue;
            parents[[x2, y2]] = [x, y];
            if (x2 === tX && y2 === tY) return parents;
            visited[[x2, y2]] = true;
            parents[[x2, y2]] = [x, y];
            queue.push([x2, y2]);
        }
    }
    return null;
}

function backtrack(target, map) {
    if (!map) return [];
    const path = [target];
    while (map[target]) {
        path.push(map[target]);
        target = map[target];
    }
    return path.reverse();
}

