QUnit.module('API', {
    setup: function() {
        this.myLabyrinth = new Labyrinth(8);
    },
    teardown: function() {
        document.getElementById('qunit-fixture').innerHTML = null;
        delete this.myLabyrinth;
    }
});

QUnit.test("Creating of labyrinth", function(assert) {

    assert.ok(this.myLabyrinth, "myLabyrinth is not an empty object");
    assert.strictEqual(typeof(this.myLabyrinth.labyrinth.forEach), "function", "Checking if the internal property labyrinth is an Array");
    assert.strictEqual(this.myLabyrinth.labyrinth.length, 8, "Checking if the internal array's length is 8");
    assert.ok(this.myLabyrinth.labyrinth[0][0] instanceof LabyrinthSegment, "Checking if the labyrinth is made by LabyrinthSegment objects");
});

QUnit.test("Size property getter and setter", function(assert) {


    assert.strictEqual(this.myLabyrinth.size, 8, 'The size should be 8');
    this.myLabyrinth.size = 10;
    assert.strictEqual(this.myLabyrinth.size, 10, 'The size should be 10');
    assert.throws(function() {
            this.myLabyrinth.size = 0.3
        },
        'Please enter a valid interger value bigger than 1 for the size of the labyrinth',
        'Setting wrong value to the size of the labyrinth raises exception'
    );
    assert.throws(function() {
            this.myLabyrinth.size = -1
        },
        'Please enter a valid interger value bigger than 1 for the size of the labyrinth',
        'Setting negative value to the size of the labyrinth raises exception'
    );
});

QUnit.module('Rendering', {
    setup: function() {
        this.myLabyrinth = new Labyrinth(10);
    },
    teardown: function() {
        delete this.myLabyrinth;
    }
});

QUnit.test("Rendering the labyrinth", function(assert) {
    this.myLabyrinth.draw('qunit-fixture');

    ok(document.getElementsByClassName('segments'), 'There are segments divs rendered');
    strictEqual(document.getElementsByClassName('segments').length, 100, '4 divs with classname segments should be rendered');

})

QUnit.test("Testing with big labyrinth", function(assert) {
    var bigLabyrinth = new Labyrinth(100);
    bigLabyrinth.draw('qunit-fixture');

    strictEqual(document.getElementsByClassName('segments').length, 10000, '10000 divs with classname segments should be rendered');

})
