// const rollup = require('rollup');
// const json = require('@rollup/plugin-json');

let language = "en";
let langKeys;
let allowCookies = false;
let darkmode = false;
let pendingAfterAccept;

$(document).ready(function () {
    // const test = require("../lang/en.json");
    // console.log(test);

    // $.getJSON("lang/en.json", function(json) {
    //     langKeys = json;
    //     console.log(json.values.length);
    //     translate();
    // });

    if (canStore()) {
        if (localStorage.getItem("darkmode") != null) {
            allowCookies = true;
        }
        darkmode = localStorage.getItem("darkmode") === "true";
        if (darkmode) {
            toggleDark(false);
        }
        language = localStorage.getItem("language");
        if (language == null) {
            language = "en";
        }
    }
});

$("#dropdown").click(function () {
    if ($("#dropdown").hasClass("dropdown-show")) {
        toggleMenu();
    }
});

function askCookies() {
    if (!allowCookies) {
        toggleMenu();
        $("#cookie-display").removeClass("invisible");
    } else {
        pendingAfterAccept = null;
    }
    return allowCookies;
}

function setCookies(cookies) {
    allowCookies = cookies;
    $("#cookie-display").addClass("invisible");
    switch (pendingAfterAccept) {
        case "darkmode":
            toggleDark(true);
            break;
        case "language":
            toggleLanguage();
            break;
    }
}

function toggleDark(invert) {
    pendingAfterAccept = "darkmode";
    if (askCookies()) {
        $("body").toggleClass("darkmode");
        if (canStore() && invert) {
            darkmode = !darkmode;
            localStorage.setItem("darkmode", `${darkmode}`);
        }
        let value = "toggle_on";
        if (darkmode === false) {
            value = "toggle_off";
        }
        document.getElementById("dark-toggle").innerHTML = value;
    }
}

function toggleLanguage() {
    pendingAfterAccept = "language";
    if (askCookies()) {
        $("#language-display").toggleClass("invisible");
    }
}

function setLanguage(close) {
    if (close) {
        toggleLanguage();
    }
    translate();
}

function translate() {
    let strings = $(".translatable");
    for (let string of strings) {
        string.innerHTML = langKeys.values[parseInt(string.textContent)];
    }
}

function toggleMenu() {
    const dropdown = $("#dropdown");
    dropdown.toggleClass("dropdown-show");
    const settings = $("#settings");
    if (dropdown.hasClass("dropdown-show")) {
        settings.css("transform", "rotate(90deg)");
        let value = "toggle_on";
        if (!darkmode) {
            value = "toggle_off";
        }
        $("#dark-toggle").html(value);
        $("#lang-toggle").html("<p style='font-size: 1vw'> Test");
    } else {
        settings.css("transform", "rotate(0)");
    }
}

/**
 * Detects if browser is capable of storing persistent data (dark mode)
 * Source: http://diveintohtml5.info/storage.html
 */
function canStore() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
