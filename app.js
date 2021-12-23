const express = require('express');
const path = require('path');
const logger = require('morgan');

const apiRouter = require('./routes/api.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'frontend/build')));
app.use('/api', apiRouter);

app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});

module.exports = app;
