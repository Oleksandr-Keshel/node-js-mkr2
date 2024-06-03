var express = require('express');
var router = express.Router();

const kadryController = require('../controllers/kardy.controller')
const kadryMiddleware = require('../middlewares/kardy.middleware')


router.route('/')
    .get(kadryController.getKadrys)
    .post(kadryController.createKadry)

router.route('/file')
    .post(kadryMiddleware.kadryUploadJSON, kadryController.createKadryFromJSONFile)

router.route('/:id')
    .get(kadryController.getKadry)
    .put(kadryController.updateKadry)
    .delete(kadryController.deleteKadry)

module.exports = router;