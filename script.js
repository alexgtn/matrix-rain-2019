var previousTime = Date.now();
var showBar = true;
var blinkCounter = 0;
var containerHeight = 0;
var showCLI = false;

var typeOffset = 0;
var logoText = "\n" +
    "#\n" +
    "#\n" +
    "#   ________  ___       _______      ___    ___      ________  ___  ___  _________  ________  ________\n" +
    "#  |\\   __  \\|\\  \\     |\\  ___ \\    |\\  \\  /  /|    |\\   ____\\|\\  \\|\\  \\|\\___   ___\\\\   __  \\|\\   ___  \\\n" +
    "#  \\ \\  \\|\\  \\ \\  \\    \\ \\   __/|   \\ \\  \\/  / /    \\ \\  \\___|\\ \\  \\\\\\  \\|___ \\  \\_\\ \\  \\|\\  \\ \\  \\\\ \\  \\\n" +
    "#   \\ \\   __  \\ \\  \\    \\ \\  \\_|/__  \\ \\    / /      \\ \\  \\  __\\ \\  \\\\\\  \\   \\ \\  \\ \\ \\   __  \\ \\  \\\\ \\  \\\n" +
    "#    \\ \\  \\ \\  \\ \\  \\____\\ \\  \\_|\\ \\  /     \\/        \\ \\  \\|\\  \\ \\  \\\\\\  \\   \\ \\  \\ \\ \\  \\ \\  \\ \\  \\\\ \\  \\\n" +
    "#     \\ \\__\\ \\__\\ \\_______\\ \\_______\\/  /\\   \\         \\ \\_______\\ \\_______\\   \\ \\__\\ \\ \\__\\ \\__\\ \\__\\\\ \\__\\\n" +
    "#      \\|__|\\|__|\\|_______|\\|_______/__/ /\\ __\\         \\|_______|\\|_______|    \\|__|  \\|__|\\|__|\\|__| \\|__|\n" +
    "#                                   |__|/ \\|__|\n" +
    "#\n" +
    "# ag v1.0\n" +
    "# Hi!\n" +
    "# Welcome to my personal page!\n" +
    "#\n" +
    "# USAGE:\n" +
    "#      ag [FLAGS]\n" +
    "#\n" +
    "# FLAGS:\n" +
    "#        --github\n" +
    "#        --stackoverflow\n" +
    "#        --linkedin\n" +
    "#        --email\n";

var githubResult = "\n" +
    "#                             \n" +
    "#   _____ _ _   _____     _   \n" +
    "#  |   __|_| |_|  |  |_ _| |_ \n" +
    "#  |  |  | |  _|     | | | . |\n" +
    "#  |_____|_|_| |__|__|___|___|\n" +
    "#                             \n";

var stackoverflowResult = "#\n" +
    "#   _____ _           _   _____             ___ _           \n" +
    "#  |   __| |_ ___ ___| |_|     |_ _ ___ ___|  _| |___ _ _ _ \n" +
    "#  |__   |  _| .'|  _| '_|  |  | | | -_|  _|  _| | . | | | |\n" +
    "#  |_____|_| |__,|___|_,_|_____|\\_/|___|_| |_| |_|___|_____|\n" +
    "#";
var linkedinResult = "#\n" +
    "#   __    _     _         _ _____     \n" +
    "#  |  |  |_|___| |_ ___ _| |     |___ \n" +
    "#  |  |__| |   | '_| -_| . |-   -|   |\n" +
    "#  |_____|_|_|_|_,_|___|___|_____|_|_|\n" +
    "#                                     ";
var emailResult = "#                       \n" +
    "#   _____           _ _ \n" +
    "#  |   __|_____ ___|_| |\n" +
    "#  |   __|     | .'| | |\n" +
    "#  |_____|_|_|_|__,|_|_|\n" +
    "#                       ";

var originalLogoLength = logoText.length;

var bar = document.getElementById("bar");
var container = document.getElementById("container");
var scrollArea = document.getElementById("scrollArea");
var commandArea = document.getElementById("commandArea");
var resultArea = document.getElementById("resultArea");
var command = document.getElementById("command");
var typeIndicator = document.getElementById("typeIndicator");

var rainTriggered = false;

function handleKeyPressed(e) {
    if (e.keyCode === 13){
        console.log("enter");
        // exec

        switch (command.innerHTML) {
            case 'ag --github':
                resultArea.insertAdjacentHTML('beforeend', '<div class="result">' +
                    '<span class="command" >' + command.innerHTML + '</span>' +
                    '<br>' +
                    githubResult +
                    '<br>' +
                    '<span>#</span> ' + '<a href="https://github.com/AGutan" target="_blank">https://github.com/AGutan</a>' +
                    '<br></div>');
                break;
            case 'ag --stackoverflow':
                resultArea.insertAdjacentHTML('beforeend', '<div class="result">' +
                    '<span class="command" >' + command.innerHTML + '</span>' +
                    '<br>' +
                    stackoverflowResult +
                    '<br>' +
                    '<span>#</span> ' + '<a href="https://stackoverflow.com/users/5314214/" target="_blank">https://stackoverflow.com/users/5314214/</a>' +
                    '<br></div>');
                break;
            case 'ag --linkedin':
                resultArea.insertAdjacentHTML('beforeend', '<div class="result">' +
                    '<span class="command" >' + command.innerHTML + '</span>' +
                    '<br>' +
                    linkedinResult +
                    '<br>' +
                    '<span>#</span> ' + '<a href="https://www.linkedin.com/in/alex-gutan/" target="_blank">https://www.linkedin.com/in/alex-gutan/</a>' +
                    '<br></div>');
                break;
            case 'ag --email':
                resultArea.insertAdjacentHTML('beforeend', '<div class="result">' +
                    '<span class="command" >' + command.innerHTML + '</span>' +
                    '<br>' +
                    emailResult +
                    '<br>' +
                    '<span>#</span> ' + '<a href="mailto:alex.gutan.m@gmail.com" target="_blank">alex.gutan.m@gmail.com</a>' +
                    '<br></div>');
                break;
            default:
                break;
        }
        command.innerHTML = '';
        resultArea.scrollTop = resultArea.scrollHeight;
        typeOffset = 0;
        let tmpLeft = 24 + (9 * typeOffset);
        typeIndicator.style = "left:" + tmpLeft + "px";

    } else if (e.keyCode === 46 || e.keyCode === 8) {
        //delete
        console.log("delete");
        if (typeOffset > 0) {
            command.innerHTML = command.innerHTML.substr(0, command.innerHTML.length - 1);
            typeOffset--;
            let tmpLeft = 24 + (9 * typeOffset);
            typeIndicator.style = "left:" + tmpLeft + "px";
        }
    } else if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 189 || e.keyCode === 32){
        if (e.keyCode === 32){
            console.log("space");
            command.innerHTML+=' ';
        } else if (e.keyCode === 189) {
            console.log("-");
            command.innerHTML += '-';
        } else {
            // Do something
            command.innerHTML += e.key.toLowerCase();
        }

        typeOffset++;
        let tmpLeft = 24 + (9 * typeOffset);
        typeIndicator.style = "left:" + tmpLeft + "px";

    }

}

window.onkeydown = handleKeyPressed;

function repeatOften() {
    var dateNow = Date.now();
    if (dateNow - previousTime > 250 && showBar === true && blinkCounter <= 3){
        showBar = false;
        previousTime = dateNow;
        bar.style="visibility:hidden";
    } else if(dateNow - previousTime > 250 && showBar === false && blinkCounter <= 3) {
        // document.body.dispatchEvent(new Event('rain'));
        showBar = true;
        blinkCounter++;
        previousTime = dateNow;
        bar.style="visibility:visible";
    } else if (blinkCounter > 3 && containerHeight < 600){
        containerHeight+=10;
        container.style = "display:block;height:" + containerHeight;
    } else if (blinkCounter === 3) {
        if (rainTriggered === false){
            rainTriggered = true;
            import('./pkg/canvas').then(() => console.log('rain'))
        }

    } else if(containerHeight === 600 && container.innerText.length < originalLogoLength) {

        scrollArea.innerText+= logoText.substr(0, 10);
        logoText = logoText.substr(10);

    } else if (container.innerText.length >= originalLogoLength){
        commandArea.style = "display:block";
        showCLI = true;
    }

    if (showCLI === false) {
        requestAnimationFrame(repeatOften);
    } else {
        console.log("fin");
    }

    // requestAnimationFrame(repeatOften);

}
requestAnimationFrame(repeatOften);