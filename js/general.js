// Dark mode

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

function initPage() {
    if (canStore()) {
        darkmode = localStorage.getItem("darkmode") === "true";
        if (darkmode) {
            toggleDark(false);
        }
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