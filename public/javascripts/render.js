const ul = document.querySelector(".task-list")

export function renderHTML(data) {
    const { date, student, grade, review } = data
    return `
        <div class="task-inside">
        <div class="task-header">
            <h3 class="date">${date}</h3>
            <div class="student">${student}</div>

            <div class="task-actions">
                <button class="task-edit" title="Edytuj zadanie"></button>
                <button class="task-delete" title="Usuń zadanie"></button>
            </div>
        </div>

        <div class="task-body">
            <div class="grade">${grade}</div>
            <hr>
            <div class="review">${review}</div>
        </div>
        </div>`
}

export function renderSingle(data) {
    const task = document.createElement('article')
    task.classList.add('task')
    task.dataset.id = data.id
    task.innerHTML = renderHTML(data)
    ul.prepend(task)
}

export function renderList(data) {
    ul.innerHTML = ""
    data.forEach(element => {
        renderList(element)
    });
}