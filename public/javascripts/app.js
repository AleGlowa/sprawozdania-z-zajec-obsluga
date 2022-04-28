import { getTask } from "./api.js"

getTask().then(x => {
        renderList(x)
    })
    .catch(error => {
        alert("wystapił błąd")
    })