const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user.js');
const taskRouter = require('./routers/task.js');

const app = express();

// Automatically parses incoming JSON
app.use(express.json());

// Set up routers
app.use(userRouter);
app.use(taskRouter);

module.exports = app;