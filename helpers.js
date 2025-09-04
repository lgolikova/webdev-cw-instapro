export function saveUserToLocalStorage(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
    try {
        return JSON.parse(window.localStorage.getItem("user"));
    } catch (error) {
        return null;
    }
}

export function removeUserFromLocalStorage(user) {
    window.localStorage.removeItem("user");
}

export function validateText(text) {
    return String(text).replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
