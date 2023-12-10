const db = require('../models');

// create main model
const Laptop = db.laptops

// main work

// 1. create laptop
const createLaptop = async (req, res) => {
    const data = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        available: req.body.available
    }

    const laptop = await Laptop.create(data);
    res.status(200).send(laptop);
}

// 2. get all laptops
const getAllLaptops = async (req, res) => {
    const laptops = await Laptop.findAll({
        attributes: [
            'title',
            'price'
        ]
    });
    res.status(200).send(laptops);
}

// 3. get single laptop
const getLaptop = async (req, res) => {
    const reqId = req.params.id;
    const laptop = await Laptop.findOne({ where: { id: reqId } });
    res.status(200).send(laptop);
}

// 4. edit laptop
const editLaptop = async (req, res) => {
    const reqId = req.params.id;
    const edited = await Product.update(req.body, { where: { id: reqId } });
    res.status(200).send(edited);
}

// 5. delete laptop
const deleteLaptop = async (req, res) => {
    const reqId = req.params.id;
    await Laptop.destroy({ where: { id: reqId } });
    res.status(200).send('laptop is deleted')
}

module.exports = {
    getAllLaptops,
    getLaptop,
    createLaptop,
    editLaptop,
    deleteLaptop
}