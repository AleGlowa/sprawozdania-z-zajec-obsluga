import { apiAdd, apiGet, apiDelete, apiSearch, apiEdit } from "./api.js"
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

document.addEventListener("click", async e => {
    if (e.target.classList.contains("task-delete")) {
        const task = e.target.closest(".task")
        const id = task.dataset.id
        await apiDelete(id)
    }
    //edytowanie zadania
    if (e.target.classList.contains("task-edit")) {
        const task = e.target.closest(".task")
        const id = task.dataset.id
        const student = task.querySelector(".student").innerHTML
        const grade = task.querySelector(".grade").innerHTML
        const date = task.querySelector(".date").innerHTML
        const review = task.querySelector(".review").innerHTML
        const data = {
            id,
            date,
            student,
            review,
            grade
        }
        task.innerHTML = renderHTML(data, true)
    }

    //zapisanie edytowanego zadania
    if (e.target.classList.contains("task-edit-save")) {
        const task = e.target.closest(".task");
        const id = task.dataset.id;
        const date = task.querySelector(".date").value
        const grade = task.querySelector(".grade").value
        const student = task.querySelector(".student").value
        const review = task.querySelector(".review").value
        const data = {
            id,
            student,
            grade,
            review,
            date
        }
        const request = await apiEdit(data);
        task.classList.remove("task-edit-mode");
        task.innerHTML = renderHTML(data, false);
    }

    //wyjscie z edytora
    if (e.target.classList.contains("task-edit-cancel")) {
        const task = e.target.closest(".task");
        const id = task.dataset.id;
        const date = task.querySelector(".date").value
        const grade = task.querySelector(".grade").value
        const student = task.querySelector(".student").value
        const review = task.querySelector(".review").value
        const data = {
            id,
            student,
            grade,
            review,
            date
        }
        task.classList.remove("task-edit-mode");
        task.innerHTML = renderHTML(data, false);
    }
})

const search = document.querySelector("#search")
search.addEventListener("input", async e => {
    const request = await apiSearch(search.value)
    renderList(request)
})