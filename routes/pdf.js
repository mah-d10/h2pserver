const path = require('path');

const express = require('express');

const pdfController = require('../controllers/pdf');
const isAuth = require('../middlewares/is_auth');

const router = express.Router();


router.get('/', pdfController.getPDF);

router.post('/', isAuth, pdfController.postPDF);


module.exports = router;