const laptopController = require('../controllers/laptopController');

const laptopRouter = require('express').Router();

laptopRouter.get('/', laptopController.getAllLaptops);
laptopRouter.get('/details/:id', laptopController.getLaptop); 
laptopRouter.get('/available', laptopController.getAvailableLaptops);

laptopRouter.get('/create', laptopController.getCreatePage);
laptopRouter.post('/create', laptopController.createLaptop);

laptopRouter.put('/edit/:id', laptopController.editLaptop);
laptopRouter.delete('/delete/:id', laptopController.deleteLaptop);

module.exports = laptopRouter;