// This module takes care of all HTTP Requests

import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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

const updatePerson = (newObject) => {
    const request = axios.put(baseUrl, newObject)
    return request.then(response => response.data)
}

const phonebookService = {
    getPersons,
    createPerson,
    deletePerson,
    updatePerson
}

export default phonebookService;