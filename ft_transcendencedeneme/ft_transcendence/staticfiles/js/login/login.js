import { nav_label_change } from "../navbar.js";


export function login_init() {
    // console.log("loginned");

    nav_label_change();
}


export function isAuthenticated() {
    return (document.cookie && document.cookie.split(';').some((item) => item.trim().startsWith('access_token=')));
}


