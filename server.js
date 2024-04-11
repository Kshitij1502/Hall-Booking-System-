// server.js

const express = require("express");
const app = express();
const db = require('./db');
const hallsRoutes = require('./routes/hallsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const messagesRoute = require('./routes/messagesRoute'); // Import the messages route

app.use(express.json());

app.use('/api/halls', hallsRoutes);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/messages', messagesRoute); // Use the messages route

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node JS Server Started on port ${port}`));
