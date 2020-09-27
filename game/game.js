var tableEl = document.getElementById('game_table');
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('start');
var restartEl = document.getElementById('restart');
var paused = false;
var now = 65;
var timer;
var rows = 5;
var columns = 5;
var time = 30;
var restTime = time;
startEl.addEventListener('click', gameStart);
restartEl.addEventListener('click', gameRestart);
tableEl.addEventListener('click', init);

function gameStart() {
    startEl.style.display = 'none';
    restartEl.style.display = 'block';
    create();
    timerEl.innerHTML = 'Времени осталось: ' + restTime;
    timer = setInterval(timeStep, 1000);
    paused = false;
}

function gameRestart() {
    restTime = time;
    now = 65;
    clearInterval(timer);
    gameStart();
}

function timeStep() {
    restTime--;
    if (restTime > 0) {
        timerEl.innerHTML = 'Времени осталось: ' + restTime + ' сек';
    } else {
        clearInterval(timer);
        timerEl.innerHTML = 'Вы проиграли';
        paused = true;
    }
}

function init(event) {
    var targ = event.target //элемент, на котором произошло событие
    var check = targ.classList.contains('td') &&
        !targ.classList.contains('select') && !paused;
    if (check) {
        var val = targ.innerHTML;
        if (val.charCodeAt(0) === now) {
            now += 1;
            targ.classList.add('select');
            if (val.charCodeAt(0) === 89) {
                timerEl.innerHTML = 'Вы выиграли';
                clearInterval(timer);
            }
        }
    }
}

function create() {
    startEl.style.display = 'none';
    var numbers = getNumbers();
    var html = '';
    for (var i = 0; i < rows; i++) {
        html += '<tr>';
        for (var j = 0; j < columns; j++) {
            html += '<td class="td" style="'
                + getRandomStyle() + '">'
                + getRandomNumber();
            +'</td>'
        }
        html += '</tr>';
    }
    tableEl.innerHTML = html;

    function getRandomNumber() {
        var n = randomInterval(0, numbers.length - 1);
        var res = String.fromCharCode(numbers[n]);
        numbers.splice(n, 1);
        return res;
    }
}

function getRandomStyle() {
    return 'font-size:' + randomInterval(14, 40) + 'px;'
        + 'color:' + getRandomColor();
}

function getNumbers() {
    var numbers = [];
    for (var i = 0; i < rows * columns; i++) {
        numbers[i] = 65 + i;
    }
    return numbers;
}

function randomInterval(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return 'rgb(' + randomInterval(0, 255) + ',' +
        randomInterval(0, 255) + ',' + randomInterval(0, 255) + ')';
}
