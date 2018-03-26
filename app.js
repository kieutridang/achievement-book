const express = require('express');
const app = express();

require('./server/express')(app);
require('./server/router')(app);

app.listen(process.env.PORT || 8080, () => { console.log('Server running on port 8080')});