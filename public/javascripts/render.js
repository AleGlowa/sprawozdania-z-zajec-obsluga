const ul = document.querySelector(".task-list")

export function getTaskHTML(data, editMode = false) {
    const { student, date, grade, review } = data
    if (editMode) {
        return `
            <div class="task-inside">
                <div class="task-header">
                   
                    <input type="date" class="date" value="${date}">
                    <input type="text" class="student" value="${student}" placeholder="Nr studenta">
                   
                    <div class="task-actions">
                        <button class="task-delete" title="Usuń zadanie"></button>
                    </div>

                </div>

                <textarea class="grade" placeholder="Punktacja">${grade}</textarea>
                <textarea class="review" placeholder="Podsumowanie pracy">${review}</textarea>

                <div class="task-footer">
                    <button class="button task-edit-save">Zapisz</button>
                    <button class="button task-edit-cancel">Anuluj</button>
                </div>
            </div>
        `
    } else {
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
}

export function renderSingle(data, editMode) {
    const task = document.createElement('article')
    task.classList.add('task')
    task.dataset.id = data.id
    task.innerHTML = renderHTML(data, editMode)
    ul.prepend(task)
}

export function renderList(data) {
    ul.innerHTML = ""
    data.forEach(element => {
        renderSingle(element, false)
    });
}