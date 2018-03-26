const express = require('express');
const app = express();

require('./server/express')(app);
require('./server/router')(app);

var server = app.listen(process.env.PORT || 8080, () => {
    var port = server.address().port;
    console.log("App now running on port", port);
});