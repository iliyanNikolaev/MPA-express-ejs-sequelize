const laptopController = require('../controllers/laptopController');

const laptopRouter = require('express').Router();

laptopRouter.get('/', laptopController.renderHomePage);
laptopRouter.get('/details/:id', laptopController.renderDetailsPage); 
laptopRouter.get('/create', laptopController.renderCreatePage);
laptopRouter.get('/edit/:id', laptopController.renderEditPage);

module.exports = laptopRouter;