const express = require('express');
const router = express.Router();

router.use('/cursos', require('./cursos'));

module.exports = router;