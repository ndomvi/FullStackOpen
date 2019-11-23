import axios from 'axios'

const url = '/api/persons'

const getPhonebook = () => axios.get(url).then(response => response.data)
const addPerson = person => axios.post(url, person).then(response => response.data)
const removePerson = id => axios.delete(`${url}/${id}`)
const updatePerson = person => axios.put(`${url}/${person.id}`, person).then(response => response.data)

// Exports are the same, either can be used
export default { getPhonebook: getPhonebook, addPerson, removePerson, updatePerson }
