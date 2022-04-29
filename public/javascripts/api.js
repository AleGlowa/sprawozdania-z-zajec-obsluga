const URL = " "

export async function apiGet() {
    const request = await fetch(URL)
    if (request.ok) {
        return request.json()
    } else {
        throw Error(request.status)
    }
}

export async function apiAdd({ student, grade, review, date }) {
    const request = await fetch(URL, { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ student, date, grade, review }) })
    if (request.ok) {
        return request.json()
    } else {
        throw Error(request.status)
    }
}

export async function apiDelete(id) {
    const request = await fetch(apiURL + "/" + id, {
        method: "delete"
    })
    if (request.ok) {
        return request.json()
    } else {
        throw Error(request.status)
    }
}