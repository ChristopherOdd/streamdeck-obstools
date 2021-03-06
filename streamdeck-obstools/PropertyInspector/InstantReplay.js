﻿document.addEventListener('websocketCreate', function () {
    console.log("Websocket created!");
    checkSettings(actionInfo.payload.settings);

    websocket.addEventListener('message', function (event) {
        console.log("Got message event!");

        // Received message from Stream Deck
        var jsonObj = JSON.parse(event.data);

        if (jsonObj.event === 'sendToPropertyInspector') {
            var payload = jsonObj.payload;
            checkSettings(payload);
        }
        else if (jsonObj.event === 'didReceiveSettings') {
            var payload = jsonObj.payload;
            checkSettings(payload.settings);
        }
    });
});


function checkSettings(payload) {
    console.log("Checking Settings");
    setAutoReplayWrapper("none");
    setTwitchSettings("none");
    setTwitchReplaySettings("none");

    if (payload['autoReplay']) {
        setAutoReplayWrapper("");
    }

    if (payload['twitchIntegration']) {
        setTwitchSettings("");
    }

    if (payload['chatReplay']) {
        setTwitchReplaySettings("");
    }
}

function setAutoReplayWrapper(displayValue) {
    var dvAutoReplaySettings = document.getElementById('dvAutoReplaySettings');
    dvAutoReplaySettings.style.display = displayValue;
}

function setTwitchSettings(displayValue) {
    var dvTwitchSettings = document.getElementById('dvTwitchSettings');
    dvTwitchSettings.style.display = displayValue;
}

function setTwitchReplaySettings(displayValue) {
    var dvTwitchReplaySettings = document.getElementById('dvTwitchReplaySettings');
    dvTwitchReplaySettings.style.display = displayValue;
}