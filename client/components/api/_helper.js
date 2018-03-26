import axios from 'axios'

// const baseURL = 'http://localhost:8080/api';
const baseURL = 'https://still-anchorage-48670.herokuapp.com/api'
const defaultHeaders = [{ 'Content-Type': 'javascript/json' }]

let _helper = {
    fetchGET: function (reqURL, headers){
        return axios({
            method: 'GET',
            url: baseURL + reqURL,
            headers: headers || defaultHeaders,
            withCredentials: true
        })
        .then((response) => {
            return {
                data: response.data,
                status: response.status
            }
        })
        .catch((error) => {
            if (error.response) {
            return {
                    data: error.response.data,
                    status: error.response.status
                }
            }
            else {
                console.log(error);
                return null;
            }
        })
    },
    fetchAPI: function (reqURL, dataToBeSent, headers, type){
        return axios({
            method: type || "POST",
            url: baseURL + reqURL,
            headers: headers || defaultHeaders,
            data: dataToBeSent,
            withCredentials: true
        })
        .then((response) => {
            return {
                data: response.data,
                status: response.status
            }
        })
        .catch((error) => {
            if (error.response) {
            return {
                data: error.response.data,
                status: error.response.status
            }}
            else {
                console.log(error);
                return null;
            }
        })
    }
}

export {_helper}
