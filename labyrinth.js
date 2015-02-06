function LabyrinthSegment(bUp, bRight, bDown, bLeft) {
    this.up = bUp;
    this.right = bRight;
    this.down = bDown;
    this.left = bLeft;

    return this;
};

LabyrinthSegment.prototype.hasFourWalls = function() {
    if (this.up == false || this.right == false || this.down == false || this.left == false) {
        return false;
    }
    return true;
};

function Labyrinth(size) {
    //debugger;
    this.size = size;
    this.labyrinth = new Array(size);

    for (var i = 0; i < size; i++) {
        this.labyrinth[i] = new Array(size);
    }
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            this.labyrinth[i][j] = new LabyrinthSegment(true, true, true, true);
        }
    }

    this.generate(0, 0);
    return this;
};

Labyrinth.prototype.generate = function(indexRows, indexCols) {
    //debugger;
    var directions = ['up', 'right', 'down', 'left'];
    directions.sort(randomOrder);
    for (var i = 0; i < 4; i++) {
        switch (directions[i]) {
            case 'up':
                if (indexRows > 0 && this.labyrinth[indexRows - 1][indexCols].hasFourWalls()) {
                    this.breakWall(indexRows, indexCols, 'up');
                    this.generate(indexRows - 1, indexCols);
                    break;
                }
            case 'right':

                if (indexCols < this.size - 1 && this.labyrinth[indexRows][indexCols + 1].hasFourWalls()) {
                    this.breakWall(indexRows, indexCols, 'right');
                    this.generate(indexRows, indexCols + 1);
                    break;
                }
            case 'down':
                if (indexRows < this.size - 1 && this.labyrinth[indexRows + 1][indexCols].hasFourWalls()) {
                    this.breakWall(indexRows, indexCols, 'down');
                    this.generate(indexRows + 1, indexCols);
                    break;
                }
            case 'left':
                if (indexCols > 0 && this.labyrinth[indexRows][indexCols - 1].hasFourWalls()) {
                    this.breakWall(indexRows, indexCols, 'left');
                    this.generate(indexRows, indexCols - 1);
                    break;
                }
        }
    }
    return;
};

var randomOrder = function() {
    return Math.random() - 0.5;
}

Labyrinth.prototype.breakWall = function(indexRows, indexCols, direction) {
    switch (direction) {
        case 'up':
            this.labyrinth[indexRows][indexCols].up = false;
            this.labyrinth[indexRows - 1][indexCols].down = false;
            break;
        case 'right':
            this.labyrinth[indexRows][indexCols].right = false;
            this.labyrinth[indexRows][indexCols + 1].left = false;
            break;
        case 'down':
            this.labyrinth[indexRows][indexCols].down = false;
            this.labyrinth[indexRows + 1][indexCols].up = false;
            break;
        case 'left':
            this.labyrinth[indexRows][indexCols].left = false;
            this.labyrinth[indexRows][indexCols - 1].right = false;
            break;
    }
}

Labyrinth.prototype.draw = function() {
    var number = document.getElementById('input').value;
    document.getElementById('labyrinth').style.width = (number * 50) + 'px';
    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            var div = document.createElement('div');
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.border = '1px solid black';
            div.style.float = 'left';
            div.style.boxSizing = 'border-box';
            this.labyrinth[i][j].up ? null : div.style.borderTop = 'none';
            this.labyrinth[i][j].down ? null : div.style.borderBottom = 'none';
            this.labyrinth[i][j].left ? null : div.style.borderLeft = 'none';
            this.labyrinth[i][j].right ? null : div.style.borderRight = 'none';
            document.getElementById('labyrinth').appendChild(div);

        }
        var separator = document.createElement('div');
        separator.style.lineHeight = 0;
        separator.style.height = 0;
        separator.style.fontSize = 0;
        separator.style.clear = 'both';
        document.getElementById('labyrinth').appendChild(separator);
    }
};
