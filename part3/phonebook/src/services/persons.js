
import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = (objectID) => {
    const request = axios.delete(baseUrl + '/' + objectID)
    return request.then(response => response.data)
}

const updatePerson = (objectID, number, name) => {
    const request = axios.put(baseUrl + '/' + objectID + '/' + number + '/' + name)
    return request.then(response => response.data)
}

const phonebookService = {
    getPersons,
    createPerson,
    deletePerson,
    updatePerson
}

export default phonebookService;