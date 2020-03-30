const express = require('express');

const OngsController = require('./controllers/OngController');
const IncidentesControllers = require('./controllers/IncidenteController');
const SenssionConstroller = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/session', SenssionConstroller.session);


routes.post('/ongs', OngsController.create);
routes.delete('/ongs', OngsController.delete);
routes.get('/ongs', OngsController.index);


routes.post('/incidents', IncidentesControllers.create);
routes.delete('/incidents/:id', IncidentesControllers.delete);
routes.get('/incidents', IncidentesControllers.index);


module.exports = routes;
