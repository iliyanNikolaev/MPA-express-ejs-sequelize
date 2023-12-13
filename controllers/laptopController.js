const db = require('../models');

// create main model
const Laptop = db.laptops

// main work

// 1. create 
const renderCreatePage = async (req, res) => {
    res.render('create', {});
}

const createLaptop = async (req, res) => {
    const { title, price, description, available } = req.body;

    // parse the data
    const data = {
        title,
        price: Number(price),
        description,
        available: available == "true" ? true : false
    }

    // validate the data
    const isInvalid =
        !title
        || title.length < 3
        || title.length > 30
        || isNaN(price)
        || !description
        || description.length < 3
        || description.length > 50;

    if (isInvalid) {
        return res.render('error');
    }

    const laptop = await Laptop.create(data);

    res.render('details', { laptop: laptop });
}

// 2. home
const renderHomePage = async (req, res) => {
    const laptops = await Laptop.findAll({
        attributes: [
            'title',
            'price',
            "id"
        ]
    });

    res.render('index', { laptops: laptops });
}

// 3. details
const renderDetailsPage = async (req, res) => {
    const reqId = req.params.id;
    const laptop = await Laptop.findOne({ where: { id: reqId } });
    res.render('details', { laptop: laptop });
}

// 4. edit laptop
const editLaptop = async (req, res) => {
    const reqId = req.params.id;
    await Laptop.update(req.body, { where: { id: reqId } });
    return { ok: true };
}

const renderEditPage = async (req, res) => {
    const reqId = req.params.id;
    const laptop = await Laptop.findOne({ where: { id: reqId } });
    res.render('edit', { laptop: laptop });
}

// 5. delete laptop
const deleteLaptop = async (req, res) => {
    const reqId = req.params.id;
    await Laptop.destroy({ where: { id: reqId } });
    return { ok: true }
}

// 6. get available laptops
const getAvailableLaptops = async (req, res) => {
    const laptops = await Laptop.findAll({ where: { available: true } });
    return laptops;
}

module.exports = {
    renderHomePage,
    renderDetailsPage,
    renderCreatePage,
    renderEditPage,
    createLaptop
}