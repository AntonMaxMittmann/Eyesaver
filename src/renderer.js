/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";
import workImage from './assets/work.png';
import breakImage from './assets/break.png';

const button = document.getElementsByClassName("button")[0];
const timer = document.getElementById("timer");
const buttonDiv = document.getElementById("button-div");
let imageContainer = document.getElementById("image-container");
let interval = null;
let newInterval = null;

button.addEventListener("click", startTimer);

function breakTime() {
if (interval) clearInterval(interval);
timer.innerHTML = "20";
    buttonDiv.innerHTML = '<button id="skip-break-button" class="skip-button">Skip the break</button>';
    const skipBreakButton = document.getElementById("skip-break-button");
    skipBreakButton.addEventListener('click', startTimer);
    let seconds = 20;
    imageContainer.innerHTML = `<img class="working-image" src="${breakImage}"/>`

    newInterval = setInterval(function () {
        seconds = seconds - 1;
        timer.innerHTML = seconds;
        if(seconds == 0) {
            clearInterval(newInterval);
            const NOTIFICATION_TITLE = "The break ended!";
            const NOTIFICATION_BODY = "It's time to work."

            new Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY});
            startTimer();
        }
    }, 1000);
}


function startTimer() {
            imageContainer.innerHTML = `<img class="working-image" src="${workImage}" />`

    timer.innerHTML = "20 : 00";


    if (newInterval) clearInterval(newInterval);

    let startTime = new Date().getTime();
    let twentyMinutes = 1000 * 60 * 1;
    let endTime = startTime + twentyMinutes;


    interval = setInterval(() => {
        let timeLeft = endTime - new Date().getTime();
        let minutes = timeLeft / (1000 * 60);
        minutes = Math.floor(minutes);
        let seconds = (timeLeft / 1000) % 60;
        seconds = Math.round(seconds);
        let text;
        if (minutes < 10 && seconds < 10) {
            text = "0" + minutes + " : " + "0" + seconds;
        } else if (minutes < 10) {
            text = "0" + minutes + " : " + seconds;
        } else if (seconds < 10) {
            text = minutes + " : 0" + seconds;
        } else {
            text = minutes + " : " + seconds;
        }

        timer.innerHTML = text;
        buttonDiv.innerHTML = '<button id="skip-button" class="skip-button">Skip to the next break</button>';
        const skipButton = document.getElementById("skip-button");
        skipButton.addEventListener("click", breakTime);
        if (timeLeft < 0) {
            timer.innerHTML = "00 : 00";
            const NOTIFICATION_TITLE = "It's time to take a break!";
            const NOTIFICATION_BODY = "Look out of the window and drink something.";

            new Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY});
            clearInterval(interval);
            breakTime();
        }
    }, 1000);
}
