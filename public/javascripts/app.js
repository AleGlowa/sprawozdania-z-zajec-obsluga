import { apiAdd, apiGet } from "./api.js"
import { renderHTML, renderSingle, renderList } from "./render.js"

apiGet().then(x => {
    renderList(x)
}).catch(error => {
    alert("wystapił błąd")
})



const form = document.querySelector('#form')
form.addEventListener("submit", async e => {
    const student = form.querySelector("#student").value
    const grade = form.querySelector("#grade").value
    const review = form.querySelector("#review").value
    const date = form.querySelector("#date").value
    const request = await apiAdd({ student, date, grade, review })
    renderSingle(request)
})