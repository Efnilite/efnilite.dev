// Dark mode

let language = "en";
let langKeys;
let allowCookies = false;
let darkmode = false;
window.onload = initPage;

/**
 * Toggles dark mode
 */
function toggleDark(invert) {
    document.body.classList.toggle("darkmode");
    if (canStore() && invert) {
        darkmode = !darkmode;
        if (allowCookies) {
            localStorage.setItem("darkmode", `${darkmode}`);
        }
    }
    document.getElementById("dark-toggle").innerHTML = logo();
}

function logo() {
    switch (darkmode) {
        case true:
            return "toggle_on";
        case false:
            return "toggle_off";
    }
}

function translate() {
    let strings = document.getElementsByClassName("translatable");
    for (let string of strings) {
        let key = string.textContent;
        string.textContent = langKeys.get(key); // todo fix
    }
}

function initPage() {
    if (canStore()) {
        language = localStorage.getItem("language");
        if (language == null) {
            language = "en";
        }
        darkmode = localStorage.getItem("darkmode") === "true";
        if (darkmode) {
            toggleDark(false);
        }
    }
    $.ajax({url: "./lang/" + language + ".json", dataType: 'json', async: false, success: function (gathered) {
            langKeys = gathered;
            console.log(gathered.length)
            translate();
        }});
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

function toggleMenu() {
    const list = document.getElementById("dropdown").classList;
    list.toggle("dropdown-show");
    if (list.contains("dropdown-show")) {
        document.getElementById("settings").style.transform = 'rotate(90deg)';
        let value = "toggle_on";
        if (darkmode === false) {
            value = "toggle_off";
        }
        document.getElementById("dark-toggle").innerHTML = value;
        document.getElementById("lang-toggle").innerHTML = "<p style='font-size: 1vw'> " + langKeys.localname;
    } else {
        document.getElementById("settings").style.transform = 'rotate(0deg)';
    }
}