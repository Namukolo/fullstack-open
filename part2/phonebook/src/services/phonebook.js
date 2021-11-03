import axios from "axios";

const baseURL = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = axios.get(baseURL);
    const response = await request;
    return response.data;
}


const create = async (personObject) => {
    const request = axios.post(baseURL, personObject);
    const response = await request;
    return response.data;
}


const remove = async (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    const response = await request;
    return response.data;
}

const phonebookService =  {
    getAll: getAll,
    create: create,
    remove: remove
}

export default phonebookService;
