const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

require('./server/express')(app);
require('./server/router')(app);

app.listen(PORT, () => { console.log('Server running on port 8080')});