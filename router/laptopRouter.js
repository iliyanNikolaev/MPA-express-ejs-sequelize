const laptopController = require('../controllers/laptopController');

const laptopRouter = require('express').Router();

laptopRouter.get('/', laptopController.renderHomePage);

laptopRouter.get('/details/:id', laptopController.renderDetailsPage);

laptopRouter.get('/create', laptopController.renderCreatePage);
laptopRouter.post('/create', laptopController.createLaptop);

laptopRouter.get('/edit/:id', laptopController.renderEditPage);
laptopRouter.post('/edit/:id', laptopController.editLaptop);

laptopRouter.get('/delete/:id', laptopController.renderDeletePage);
laptopRouter.post('/delete/:id', laptopController.deleteLaptop);

laptopRouter.all('*', laptopController.renderNotFound);

module.exports = laptopRouter;