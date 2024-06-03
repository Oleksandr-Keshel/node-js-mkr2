const kadryService = require('../services/kadry.service');
const createError = require('http-errors');

async function createKadry(req, res, next){
    try{
        const newKadry = await kadryService.create(req.body);

        res.status(200).json({
            status: 200,
            data: newKadry,
        });
    } catch(err){
        next(createError.InternalServerError(err.message));
    }
};

async function getKadrys(req, res, next) {
    try {
        res.status(200).json({
            status: 200,
            data: await kadryService.find({}),
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function getKadry(req, res, next) {
    try {
        const { kadryId } = req.params;
        const kadry = await kadryService.findById(kadryId);

        if (!kadry) {
            return res.status(400).json({
                status: 400,
                message: 'kadry was not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: kadry,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};


async function updateKadry(req, res, next) {
    try {
        const { kadryId } = req.params;
        const kadryData = req.body;
        const updatedkadry = await kadryService.findByIdAndUpdate(kadryId, kadryData);

        if (!updatedkadry) {
            return res.status(400).json({
                status: 400,
                message: 'kadry was not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: updatedkadry
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};


async function deleteKadry(req, res, next) {
    try {
        const { kadryId } = req.params;
        await kadryService.findByIdAndDelete(kadryId);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function createKadryFromJSONFile(req, res) {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const filePath = path.join(__dirname, '..', file.path);
        const data = await fs.readFile(filePath, 'utf8');
        const kadryItems = JSON.parse(data);

        kadryItems.forEach((item)=>{
            kadryService.create(item);
        })

        res.status(201).json({
            status: 201,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
}

module.exports = {
    createKadry,
    getKadrys,
    getKadry,
    updateKadry,
    deleteKadry,
    createKadryFromJSONFile
};