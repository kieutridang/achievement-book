let _helper = {
    GET: function(reqURL, headers){
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readyStateChange", function(){
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
            }
        })
        xhr.open("GET", reqURL);
        headers.forEach(function(header){
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send();
    },
    POST: function(reqURL, dataToBeSend, headers){
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;        
        xhr.addEventListener("readStateChange", function(){
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
            }
        })
        xhr.open("POST", reqURL);
        headers.forEach(function(header){
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send();
    },
    PUT: function (reqURL, dataToBeSend, headers) {
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readStateChange", function () {
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
            }
        })
        xhr.open("PUT", reqURL);
        headers.forEach(function (header) {
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send();
    },
    DELETE: function (reqURL, dataToBeSend, headers) {
        let response = {};
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;        
        xhr.addEventListener("readStateChange", function () {
            if (this.readyState === 4) {
                response.statusCode = xhr.status;
                response.data = this.responseText;
            }
        })
        xhr.open("DELETE", reqURL);
        headers.forEach(function (header) {
            xhr.setRequestHeader(header.key, header.value);
        })
        xhr.send();
    }
}

export {_helper}
