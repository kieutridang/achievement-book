import axios from 'axios'

let _helper = {
    fetchGET: function (reqURL, headers, callback){
        axios({
            method: 'POST',
            url: reqURL,
            headers: headers
        })
        .then((response) => {
            return response.data;
        })
        .then((json) => {
            callback(true, json);
        })
        .catch((error) => {
            callback(false, error);
        })
    },
    fetchPOST: function (reqURL, dataToBeSent, headers, callback, type){
        axios({
            method: type || "POST",
            url: reqURL,
            headers: headers,
            data: dataToBeSent,
        })
        .then((response) => {
            return response.data;
        })
        .then((json) => {
            callback(false, json);
        })
        .catch((error) => {
            callback(true, error);
        })
    }
}

export {_helper}
