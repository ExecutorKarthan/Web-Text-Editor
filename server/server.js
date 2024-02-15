//Import express 
const express = require('express');

//Define an app as well as a port
const app = express();
const PORT = process.env.PORT || 3000;

//Define the client route
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Define the HTML route
require('./routes/htmlRoutes')(app);

//Listen to the port for connection
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));