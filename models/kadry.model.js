const mongoose = require('mongoose');

const kadrySchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    workshop: {
        type: String,
        required: true,
        trim: true
    },
    sex: {
        type: String,
        required: true,
        trim: true
    },
    experince: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
},  {
    timestamps: true
});

module.exports = mongoose.model('kadry', kadrySchema);
