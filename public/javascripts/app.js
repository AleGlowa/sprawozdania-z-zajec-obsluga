import { apiAdd, apiGet, apiDelete, apiSearch } from "./api.js"
import { renderSingle, renderList } from "./render.js"

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

document.addEventListener("click", async e => {
    if (e.target.classList.contains("task-delete")) {
        const task = e.target.closest(".task")
        const id = task.dataset.id
        await apiDelete(id)
    }
})

const search = document.querySelector("#search")
search.addEventListener("input", async e => {
    const request = await apiSearch(search.value)
    renderList(request)
})