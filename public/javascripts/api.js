const URL = ""

export function getTask() {
    const request = fetch(URL)
    if (request.ok) {
        return request.json()
    } else {
        throw Error(request.error)
    }
}