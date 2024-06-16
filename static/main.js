// Switching the dom elements for short break etc.
pomodoro = document.getElementById('pomodoro');
long_button = document.getElementById('long_button');
short_button = document.getElementById('short_button');

pomodoro.onclick = () => pomo();
long_button.onclick = () => long();
short_button.onclick = () => short();

function pomo(){
    document.getElementById('minute').innerHTML = "25";
    document.getElementById('second').innerHTML = "00";
    document.querySelector('.study').innerHTML = "Study";
    pomodoro.classList.add('active');
    long_button.classList.remove('active');
    short_button.classList.remove('active');
    const constMinute = document.getElementById('minute').innerHTML;
    const constSecond = document.getElementById('second').innerHTML;
    minute = document.getElementById('minute').innerHTML;
    second = document.getElementById('second').innerHTML;
    clearInterval(count);
}
function short(){
    document.getElementById('minute').innerHTML = "05";
    document.getElementById('second').innerHTML = "00";
    document.querySelector('.study').innerHTML = "Short Break";
    short_button.classList.add('active');
    long_button.classList.remove('active');
    pomodoro.classList.remove('active');
    const constMinute = document.getElementById('minute').innerHTML;
    const constSecond = document.getElementById('second').innerHTML;
    minute = document.getElementById('minute').innerHTML;
    second = document.getElementById('second').innerHTML;
    clearInterval(count);
}
function long(){
    document.getElementById('minute').innerHTML = "15";
    document.getElementById('second').innerHTML = "00";
    document.querySelector('.study').innerHTML = "Long Break";
    long_button.classList.add('active');
    pomodoro.classList.remove('active');
    short_button.classList.remove('active');
    const constMinute = document.getElementById('minute').innerHTML;
    const constSecond = document.getElementById('second').innerHTML;
    minute = document.getElementById('minute').innerHTML;
    second = document.getElementById('second').innerHTML;
    document.getElementById('toggle').innerHTML = "Start";
    clearInterval(count);
}
//Declaring the values for short break and long break.
if (document.querySelector('.study').innerHTML == "Study"){
    const constMinute = document.getElementById('minute').innerHTML;
    const constSecond = document.getElementById('second').innerHTML;
    minute = document.getElementById('minute').innerHTML;
    second = document.getElementById('second').innerHTML;
}

// Declaring the variables.
let count;
var tick_second = document.getElementById('tick_second');
var ringtone = document.getElementById('ringtone');
document.getElementById('toggle').onclick = () => toggle();
function countdown(){
    // Decrement in minutes.
    if (second == 00){
        minute--;
        second = 60;
    }
    // Decrement in seconds.
    second--;
    tick_second.play();

    // Styling changes
    if (minute > 9){
        document.getElementById('minute').innerHTML = minute;
    }
    else {
        document.getElementById('minute').innerHTML = "0"+minute;
    }

    if (second > 9) {
        document.getElementById('second').innerHTML = second;
    }
    else {
        document.getElementById('second').innerHTML = "0"+second;
    }
    if (minute == 00){
        document.getElementById('minute').innerHTML = "00";
    }
    // Stoping the timer.
    if (minute == 00 && second == 00) {
        document.getElementById('minute').innerHTML = constMinute;
        document.getElementById('second').innerHTML = constSecond;
        document.getElementById('toggle').innerHTML = 'Start';
        ringtone.loop = true;
        ringtone.play();
        setTimeout(() => { ringtone.pause(); }, 3000);
        minute = constMinute;
        second = constSecond;
        clearInterval(count);
    }
};
//Audio Playing on the click of the buttons.
var audio_start = document.getElementById('audio_start');
var audio_close = document.getElementById('audio_close');



// Starting the timer.
function toggle() {
    if (document.getElementById('toggle').innerHTML == 'Start') {
        clearInterval(count);
        count = setInterval(() => { countdown(); }, 1000);
        audio_start.play();
        document.getElementById('toggle').innerHTML = "Pause";
    }
    else {
        clearInterval(count);
        audio_close.play();
        document.getElementById('toggle').innerHTML = "Start";
    }
}

document.querySelector('.navigation').style.display = "block";

document.getElementById("task_show").onclick = () => show_task();
function show_task(){
    document.getElementById("task_form").style.display = 'block';
    document.getElementById("task_show").style.display = "none";
}

document.getElementById('cancel').onclick = () => show_button();
function show_button(){
    document.getElementById("task_show").style.display = "block";
    document.getElementById("task_form").style.display = "none";
}