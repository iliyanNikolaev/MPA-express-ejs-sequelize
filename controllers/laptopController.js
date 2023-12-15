const db = require('../models');

// create main model
const Laptop = db.laptops

// main work

// 0. Not Found
const renderNotFound = async (req, res) => {
    res.render('error');
}

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
    
    await Laptop.update(data, { where: { id: reqId } });
    console.log(req.body);
    res.render('details', { laptop: {...data, id: reqId} });
}

const renderEditPage = async (req, res) => {
    const reqId = req.params.id;
    const laptop = await Laptop.findOne({ where: { id: reqId } });
    res.render('edit', { laptop: laptop });
}

// 5. delete laptop
const renderDeletePage = async function (req, res) {
    const reqId = req.params.id;
    const laptop = await Laptop.findOne({ where: { id: reqId } });
    res.render('delete', { laptop: laptop });
}

const deleteLaptop = async (req, res) => {
    const reqId = req.params.id;
    const deleted = await Laptop.destroy({ where: { id: reqId } });
    if(deleted) {
        renderHomePage(req, res);
    } else {
        renderNotFound();
    }
}

// 6. stocks
const renderStocksPage = async (req, res) => {

    res.render('stocks')
}

const getStocksData = async (req, res) => {
    const available = await getAvailableLaptops();
    const unavailable = await getUnavailableLaptops();

    res.status(200).json({ available, unavailable });
}

const getAvailableLaptops = async (req, res) => {
    const laptops = await Laptop.findAll({ where: { available: true } });
    return laptops;
}

const getUnavailableLaptops = async (req, res) => {
    const laptops = await Laptop.findAll({ where: { available: false } });
    return laptops;
}

const toggleLaptop = async (req, res) => {
    const reqId = req.params.id;
    const laptop = await Laptop.findOne({ where: { id: reqId } });
    if(laptop) {
        await Laptop.update({ ...laptop, available: !laptop.available}, { where: { id: reqId } });
        res.json({ ok: true });
    } else {
        res.json({ ok: false });
    }
}

module.exports = {
    renderNotFound,
    renderHomePage,
    renderDetailsPage,
    renderCreatePage,
    renderEditPage,
    renderDeletePage,
    renderStocksPage,
    createLaptop,
    editLaptop,
    deleteLaptop,
    getAvailableLaptops,
    getUnavailableLaptops,
    getStocksData,
    toggleLaptop
}