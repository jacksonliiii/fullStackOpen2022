
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

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

const updatePerson = async (objectID, number) => {
    const request = axios.put(baseUrl + '/' + objectID + '/' + number)
    const response = await request
    return response.data
}

const phonebookService = {
    getPersons,
    createPerson,
    deletePerson,
    updatePerson
}

export default phonebookService;