document.getElementById('generate-button').onclick = function() {
    document.getElementById('labyrinth').innerHTML = null;
    var number = document.getElementById('input').value;

    var myLabyrinth = new Labyrinth(number);
    myLabyrinth.draw('labyrinth');
};
