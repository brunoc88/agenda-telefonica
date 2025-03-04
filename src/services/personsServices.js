import axios from 'axios';
const urlBase = "http://localhost:3001/contacts";

const getAll = () => axios.get(urlBase).then(response=>response.data);

const create = (newPerson) => axios.post(urlBase,newPerson).then(response=>response.data);

const update = (id,updatePerson) => axios.put(`${urlBase}/${id}`,updatePerson).then(response=>response.data);

const deletePerson = (id) => axios.delete(`${urlBase}/${id}`).then(response=>response.data);

export {getAll, create, update, deletePerson};