import axios from 'axios'

const baseURL = 'http://localhost:8080/api';
const defaultHeaders = [{ 'Content-Type': 'javascript/json' }]

let _helper = {
    fetchGET: (reqURL, headers) => {
        return axios({
            method: 'GET',
            url: baseURL + reqURL,
            headers: headers || defaultHeaders
        })
        .then((response) => {
            return response.data;
        })
        .then((json) => {
            return json
        })
        .catch((error) => {
            return error
        })
    },
    fetchPOST: (reqURL, dataToBeSent, headers, type) => {
        return axios({
            method: type || "POST",
            url: baseURL + reqURL,
            headers: headers || defaultHeaders,
            data: dataToBeSent,
        })
        .then((response) => {
            return response.data;
        })
        .then((json) => {
            return json
        })
        .catch((error) => {
            return error
        })
    }
}

export {_helper}
