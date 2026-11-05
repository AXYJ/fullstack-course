import axios from 'axios';

const baseUrl = "http://localhost:3001/persons"

export function create(newObject) {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

export function deletePerson(id) {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export function updatePerson(newObject) {
    return axios.put(`${baseUrl}/${newObject.id}`, newObject).then(response => response.data)
}