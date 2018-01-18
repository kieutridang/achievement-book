let _helper = {
    GET: function(reqURL, headers, callback){
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function(){
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
                callback(response);
            }
        })
        xhr.open("GET", reqURL);
        headers.forEach(function(header){
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send();
    },
    POST: function(reqURL, dataToBeSend, headers, callback){
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;        
        xhr.addEventListener("readystatechange", function(){
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
                callback(response);
            }
        })
        xhr.open("POST", reqURL);
        headers.forEach(function(header){
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send(dataToBeSend);
    },
    PUT: function (reqURL, dataToBeSend, headers, callback) {
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
                callback(response);
            }
        })
        xhr.open("PUT", reqURL);
        headers.forEach(function (header) {
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send(dataToBeSend);
    },
    DELETE: function (reqURL, dataToBeSend, headers, callback) {
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;        
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
                callback(response);
            }
        })
        xhr.open("DELETE", reqURL);
        headers.forEach(function (header) {
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send(dataToBeSend);
    }
}

export {_helper}
