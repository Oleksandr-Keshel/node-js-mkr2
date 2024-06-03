const kadryModel = require('../models/kadry.model');

async function create(kadry) {
    return kadryModel.create(kadry);
}

async function find() {
    filter = {};
    return {
        items: await kadryModel.find(filter),
        count: await kadryModel.countDocuments(filter),
    };
}

async function findById(id) {
    return kadryModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
    return kadryModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
}

async function findByIdAndDelete(id) {
    return kadryModel.findByIdAndDelete(id);
};




module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
};