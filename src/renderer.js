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

const button = document.getElementsByClassName("button")[0];
const timer = document.getElementById("timer");

button.addEventListener("click", function () {
    let startTime = new Date().getTime();
    let twentyMinutes = 1000 * 60 * 1;
    let endTime = startTime + twentyMinutes;

    setInterval(function () {
        let timeLeft = endTime - new Date().getTime();
        let minutes = timeLeft / (1000 * 60);
        minutes = Math.floor(minutes);
        let seconds = (timeLeft / 1000) % 60;
        seconds = Math.round(seconds);
        let text;
        if (minutes < 10) {
            text = "0" + minutes + " : " + seconds;
        } else {
            text = minutes + " : " + seconds;
        }

        timer.innerHTML = text;
        button.innerHTML = "Jump to the next break";

        if (timeLeft < 0) {
            timer.innerHTML = "00 : 00";
            const NOTIFICATION_TITLE = "Title";
            const NOTIFICATION_BODY = "Notification from the Renderer process. Click to log to console.";

            new Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY});
             
        }
    }, 1000);
});
